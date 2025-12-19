import styles from './buttons.module.scss';

interface PaginationButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const PaginationButton = ({
  onClick,
  disabled,
  children,
}: PaginationButtonProps) => {
  return (
    <button
      className={styles.paginationButton}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
