import { useState, useCallback } from 'react';
import {
  type DateFilter,
  type PriceFilter,
  DATE_FILTERS,
  PRICE_FILTERS,
} from '../constants';

type FilterPriority = 'date' | 'price';

interface UseFiltersReturn {
  dateFilter: DateFilter;
  priceFilter: PriceFilter;
  filterPriority: FilterPriority;
  setDateFilter: (filter: DateFilter) => void;
  setPriceFilter: (filter: PriceFilter) => void;
  resetFilters: () => void;
}

export const useFilters = (onFilterChange?: () => void): UseFiltersReturn => {
  const [dateFilter, setDateFilterState] = useState<DateFilter>(
    DATE_FILTERS.NEWEST
  );
  const [priceFilter, setPriceFilterState] = useState<PriceFilter>(
    PRICE_FILTERS.HIGH_TO_LOW
  );
  const [filterPriority, setFilterPriority] = useState<FilterPriority>('date');

  const setDateFilter = useCallback(
    (filter: DateFilter) => {
      setDateFilterState(filter);
      setFilterPriority('date');
      onFilterChange?.();
    },
    [onFilterChange]
  );

  const setPriceFilter = useCallback(
    (filter: PriceFilter) => {
      setPriceFilterState(filter);
      setFilterPriority('price');
      onFilterChange?.();
    },
    [onFilterChange]
  );

  const resetFilters = useCallback(() => {
    setDateFilterState(DATE_FILTERS.NEWEST);
    setPriceFilterState(PRICE_FILTERS.HIGH_TO_LOW);
    setFilterPriority('date');
    onFilterChange?.();
  }, [onFilterChange]);

  return {
    dateFilter,
    priceFilter,
    filterPriority,
    setDateFilter,
    setPriceFilter,
    resetFilters,
  };
};
