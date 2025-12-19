import styles from './Snackbar.module.scss';
import { SnackbarCloseButton } from '../buttons';

export type SnackbarType = 'success' | 'error' | 'info';

export interface SnackbarMessage {
  id: string;
  message: string;
  type: SnackbarType;
}

interface SnackbarProps {
  message: SnackbarMessage;
  onClose: () => void;
}

export const Snackbar = ({ message, onClose }: SnackbarProps) => {
  const typeClass =
    message.type === 'success'
      ? styles.snackbarSuccess
      : message.type === 'error'
        ? styles.snackbarError
        : styles.snackbarInfo;

  return (
    <div className={`${styles.snackbar} ${typeClass}`} role="alert">
      <span className={styles.snackbarMessage}>{message.message}</span>
      <SnackbarCloseButton onClick={onClose} />
    </div>
  );
};
