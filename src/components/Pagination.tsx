import { PaginationButton, PaginationNumberButton } from "../buttons";
import styles from "../pages/Dashboard/Dashboard.module.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  getPageNumbers: () => (number | string)[];
  startIndex: number;
  endIndex: number;
  totalItems: number;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
  getPageNumbers,
  startIndex,
  endIndex,
  totalItems,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <>
      <div className={styles.pagination}>
        <PaginationButton
          onClick={onPrevious}
          disabled={currentPage === 1}
        >
          Previous
        </PaginationButton>

        <div className={styles.paginationNumbers}>
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className={styles.paginationEllipsis}
              >
                ...
              </span>
            ) : (
              <PaginationNumberButton
                key={page}
                onClick={() => onPageChange(page as number)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationNumberButton>
            )
          )}
        </div>

        <PaginationButton
          onClick={onNext}
          disabled={currentPage === totalPages}
        >
          Next
        </PaginationButton>
      </div>

      <div className={styles.paginationInfo}>
        Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems}{' '}
        {totalItems === 1 ? 'wish' : 'wishes'}
      </div>
    </>
  );
};

