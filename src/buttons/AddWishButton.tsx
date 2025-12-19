import styles from './buttons.module.scss';

interface AddWishButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const AddWishButton = ({ onClick, children }: AddWishButtonProps) => {
  return (
    <button onClick={onClick} className={styles.addWishButton}>
      {children}
    </button>
  );
};
