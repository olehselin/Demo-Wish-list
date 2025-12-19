import styles from "./buttons.module.scss";

interface DeleteButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const DeleteButton = ({ onClick, children }: DeleteButtonProps) => {
  return (
    <button type="button" onClick={onClick} className={styles.btnDelete}>
      {children}
    </button>
  );
};



