import styles from './buttons.module.scss';

interface BackButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const BackButton = ({ onClick, children }: BackButtonProps) => {
  return (
    <button onClick={onClick} className={styles.backButton}>
      {children}
    </button>
  );
};
