import styles from './buttons.module.scss';

interface ActionButtonProps {
  variant: 'update' | 'delete' | 'details';
  onClick: () => void;
  children: React.ReactNode;
}

export const ActionButton = ({
  variant,
  onClick,
  children,
}: ActionButtonProps) => {
  const variantClass =
    variant === 'update'
      ? styles.updateButton
      : variant === 'delete'
        ? styles.deleteButton
        : styles.detailsButton;
  return (
    <button
      onClick={onClick}
      className={`${styles.actionButton} ${variantClass}`}
    >
      {children}
    </button>
  );
};
