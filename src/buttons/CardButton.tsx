import { Link } from 'react-router';
import styles from './buttons.module.scss';

interface CardButtonProps {
  variant: 'details' | 'update' | 'delete';
  onClick?: () => void;
  disabled?: boolean;
  to?: string;
  children: React.ReactNode;
}

export const CardButton = ({
  variant,
  onClick,
  disabled,
  to,
  children,
}: CardButtonProps) => {
  const variantClass =
    variant === 'details'
      ? styles.cardButtonDetails
      : variant === 'update'
        ? styles.cardButtonUpdate
        : styles.cardButtonDelete;
  const className = `${styles.cardButton} ${variantClass}`;

  if (variant === 'details' && to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  );
};
