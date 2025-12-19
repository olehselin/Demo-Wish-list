import { type DateFilter, type PriceFilter, DATE_FILTERS, PRICE_FILTERS } from '../constants';
import { AddWishButton } from '../buttons';
import styles from '../pages/Dashboard/Dashboard.module.scss';

interface FiltersProps {
  dateFilter: DateFilter;
  priceFilter: PriceFilter;
  onDateFilterChange: (filter: DateFilter) => void;
  onPriceFilterChange: (filter: PriceFilter) => void;
  onAddClick: () => void;
}

export const Filters = ({
  dateFilter,
  priceFilter,
  onDateFilterChange,
  onPriceFilterChange,
  onAddClick,
}: FiltersProps) => {
  return (
    <div className={styles.filtersSection}>
      <div className={styles.filterGroup}>
        <label htmlFor="date-filter">Filter by Date:</label>
        <select
          id="date-filter"
          value={dateFilter}
          onChange={(e) => onDateFilterChange(e.target.value as DateFilter)}
          className={styles.filterSelect}
        >
          <option value={DATE_FILTERS.NEWEST}>Newest</option>
          <option value={DATE_FILTERS.OLDEST}>Oldest</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="price-filter">Filter by Price:</label>
        <select
          id="price-filter"
          value={priceFilter}
          onChange={(e) => onPriceFilterChange(e.target.value as PriceFilter)}
          className={styles.filterSelect}
        >
          <option value={PRICE_FILTERS.HIGH_TO_LOW}>Price High to Low</option>
          <option value={PRICE_FILTERS.LOW_TO_HIGH}>Price Low to High</option>
        </select>
      </div>

      <AddWishButton onClick={onAddClick}>
        <span className={styles.addIcon}>+</span>
        Add New Wish
      </AddWishButton>
    </div>
  );
};

