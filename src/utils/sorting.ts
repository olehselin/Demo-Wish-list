import { type Wish } from '../services/api';
import {
  type DateFilter,
  type PriceFilter,
  DATE_FILTERS,
  PRICE_FILTERS,
} from '../constants';

export interface WishWithDate extends Wish {
  createdAt?: string;
}

const getDateTimestamp = (wish: WishWithDate): number => {
  if (!wish.createdAt) {
    // If createdAt is missing, treat as very old date (epoch 0 = 1970-01-01)
    // This will make them appear at the end when sorting newest first
    return 0;
  }
  try {
    const timestamp = new Date(wish.createdAt).getTime();
    // Check if date is valid (not NaN)
    if (isNaN(timestamp)) {
      return 0;
    }
    return timestamp;
  } catch {
    // If date is invalid, treat as very old date
    return 0;
  }
};

export const sortWishes = (
  wishes: Wish[],
  dateFilter: DateFilter,
  priceFilter: PriceFilter,
  filterPriority: 'date' | 'price' = 'date'
): WishWithDate[] => {
  if (wishes.length === 0) {
    return [];
  }

  const wishesWithDate = wishes as WishWithDate[];
  const sorted = [...wishesWithDate];

  // Apply both filters independently - priority determines which is primary
  sorted.sort((a, b) => {
    // Apply date filter
    const dateA = getDateTimestamp(a);
    const dateB = getDateTimestamp(b);

    let dateComparison = 0;
    if (dateFilter === DATE_FILTERS.NEWEST) {
      // Newest first: sort by date descending
      dateComparison = dateB - dateA;
    } else {
      // Oldest first: sort by date ascending
      dateComparison = dateA - dateB;
    }

    // Apply price filter
    let priceComparison = 0;
    if (priceFilter === PRICE_FILTERS.HIGH_TO_LOW) {
      priceComparison = b.price - a.price;
    } else {
      // LOW_TO_HIGH
      priceComparison = a.price - b.price;
    }

    // Use the filter that was changed last as primary sort
    if (filterPriority === 'date') {
      // Date is primary - if dates are different, use date sort
      if (dateComparison !== 0) {
        return dateComparison;
      }
      // If dates are equal, use price filter (secondary sort)
      if (priceComparison !== 0) {
        return priceComparison;
      }
    } else {
      // Price is primary - if prices are different, use price sort
      if (priceComparison !== 0) {
        return priceComparison;
      }
      // If prices are equal, use date filter (secondary sort)
      if (dateComparison !== 0) {
        return dateComparison;
      }
    }

    // If both date and price are the same, maintain stable sort by ID
    return a.id.localeCompare(b.id);
  });

  return sorted;
};
