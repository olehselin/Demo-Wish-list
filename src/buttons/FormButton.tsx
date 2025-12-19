import styles from "./buttons.module.scss";

interface FormButtonProps {
  type: "button" | "submit";
  variant: "cancel" | "submit";
  onClick?: () => void;
  children: React.ReactNode;
}

export const FormButton = ({ type, variant, onClick, children }: FormButtonProps) => {
  const className = variant === 'cancel' ? styles.btnCancel : styles.btnSubmit;
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
};



