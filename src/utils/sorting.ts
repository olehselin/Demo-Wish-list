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
    return 0;
  }
  try {
    const timestamp = new Date(wish.createdAt).getTime();
    if (isNaN(timestamp)) {
      return 0;
    }
    return timestamp;
  } catch {
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

  sorted.sort((a, b) => {
    const dateA = getDateTimestamp(a);
    const dateB = getDateTimestamp(b);

    let dateComparison = 0;
    if (dateFilter === DATE_FILTERS.NEWEST) {
      dateComparison = dateB - dateA;
    } else {
      dateComparison = dateA - dateB;
    }

    // Apply price filter
    let priceComparison = 0;
    if (priceFilter === PRICE_FILTERS.HIGH_TO_LOW) {
      priceComparison = b.price - a.price;
    } else {
      priceComparison = a.price - b.price;
    }

    if (filterPriority === 'date') {
      if (dateComparison !== 0) {
        return dateComparison;
      }
      if (priceComparison !== 0) {
        return priceComparison;
      }
    } else {
      if (priceComparison !== 0) {
        return priceComparison;
      }
      if (dateComparison !== 0) {
        return dateComparison;
      }
    }

    // If both date and price are the same, maintain stable sort by ID
    return a.id.localeCompare(b.id);
  });

  return sorted;
};
