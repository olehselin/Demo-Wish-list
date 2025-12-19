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

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
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
