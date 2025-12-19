import styles from './buttons.module.scss';

interface ModalCloseButtonProps {
  onClick: () => void;
}

export const ModalCloseButton = ({ onClick }: ModalCloseButtonProps) => {
  return (
    <button className={styles.modalClose} onClick={onClick}>
      ×
    </button>
  );
};
