import styles from "./buttons.module.scss";

interface PaginationNumberButtonProps {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
}

export const PaginationNumberButton = ({ onClick, isActive, children }: PaginationNumberButtonProps) => {
  return (
    <button
      className={`${styles.paginationNumber} ${isActive ? styles.paginationNumberActive : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};



