import styles from "./buttons.module.scss";

interface SnackbarCloseButtonProps {
  onClick: () => void;
}

export const SnackbarCloseButton = ({ onClick }: SnackbarCloseButtonProps) => {
  return (
    <button className={styles.snackbarClose} onClick={onClick} aria-label="Close">
      ×
    </button>
  );
};



