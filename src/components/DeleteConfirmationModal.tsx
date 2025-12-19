import styles from './DeleteConfirmationModal.module.scss';
import { Modal } from './Modal';
import { FormButton, DeleteButton } from '../buttons';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  wishTitle: string;
}

export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  wishTitle,
}: DeleteConfirmationModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Delete"
      className={styles.deleteModal}
    >
      <div className={styles.deleteModalBody}>
        <p>
          Are you sure you want to delete <strong>"{wishTitle}"</strong>?
        </p>
        <p className={styles.deleteWarning}>This action cannot be undone.</p>
      </div>
      <div className={styles.formActions}>
        <FormButton type="button" variant="cancel" onClick={onClose}>
          No
        </FormButton>
        <DeleteButton onClick={handleConfirm}>Yes, Delete</DeleteButton>
      </div>
    </Modal>
  );
};
