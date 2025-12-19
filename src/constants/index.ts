// In production, use relative URLs to call Vercel API routes
// In development, use the json-server URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.PROD ? '' : 'http://localhost:3000');

export const PAGINATION = {
  ITEMS_PER_PAGE: 12,
  MAX_VISIBLE_PAGES: 5,
} as const;

export const DATE_FILTERS = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
} as const;

export const PRICE_FILTERS = {
  HIGH_TO_LOW: 'high-to-low',
  LOW_TO_HIGH: 'low-to-high',
} as const;

export type DateFilter = typeof DATE_FILTERS[keyof typeof DATE_FILTERS];
export type PriceFilter = typeof PRICE_FILTERS[keyof typeof PRICE_FILTERS];



