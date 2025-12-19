import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  getWishById,
  updateWish,
  patchWish,
  deleteWish,
} from '../../lib/wish-handler.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers - must be set before any response
  const origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With'
  );
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Extract ID from query params or URL path
  // Vercel may not always pass id through req.query for dynamic routes
  let id: string | undefined = req.query.id as string | undefined;

  // If ID is not in query, try to extract from URL
  if (!id && req.url) {
    const match = req.url.match(/\/wishes\/([^/?]+)/);
    if (match && match[1]) {
      id = match[1];
    }
  }

  // Also try to get from query params with different keys
  if (!id) {
    const queryId = req.query.id || req.query['[id]'] || (req.query as any).id;
    if (queryId && typeof queryId === 'string') {
      id = queryId;
    }
  }

  if (!id || typeof id !== 'string') {
    console.error('Invalid wish ID:', {
      id,
      query: req.query,
      url: req.url,
      queryKeys: Object.keys(req.query),
    });
    res.status(400).json({ error: 'Invalid wish ID' });
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        const wish = await getWishById(id);
        if (!wish) {
          res.status(404).json({ error: 'Wish not found' });
          return;
        }
        res.status(200).json(wish);
        break;

      case 'PUT':
        const updatedWish = await updateWish(id, req.body);
        res.status(200).json(updatedWish);
        break;

      case 'PATCH':
        const patchedWish = await patchWish(id, req.body);
        res.status(200).json(patchedWish);
        break;

      case 'DELETE':
        await deleteWish(id);
        res.status(204).end();
        break;

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'PATCH', 'DELETE']);
        res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    const statusCode =
      error instanceof Error && error.message.includes('not found') ? 404 : 500;
    res.status(statusCode).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
