import { ActionButton, BackButton } from '../../buttons';
import { DeleteConfirmationModal } from '../../components/DeleteConfirmationModal';
import { UpdateWishModal } from '../../components/UpdateWishModal';
import { WishInfo } from '../../components/WishInfo';
import { useWishDetail } from '../../hooks/useWishDetail';
import styles from './WishPage.module.scss';

const WishPage = () => {
  const {
    wish,
    loading,
    deleteModal,
    updateModal,
    handleDelete,
    handleDeleteClick,
    handleUpdateClick,
    navigateBack,
  } = useWishDetail('/');

  if (loading) {
    return (
      <div className={styles.wishPage}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (!wish) {
    return (
      <div className={styles.wishPage}>
        <div className={styles.error}>Wish not found</div>
        <BackButton onClick={() => navigateBack()}>
          Go back to dashboard
        </BackButton>
      </div>
    );
  }

  return (
    <>
      <div className={styles.wishPage}>
        <div className={styles.wishPageHeader}>
          <BackButton onClick={() => navigateBack()}>
            ← Go back to dashboard
          </BackButton>
        </div>

        <WishInfo wish={wish} />

        <footer className={styles.wishPageFooter}>
          <ActionButton variant="update" onClick={handleUpdateClick}>
            Update
          </ActionButton>
          <ActionButton variant="delete" onClick={handleDeleteClick}>
            Delete
          </ActionButton>
        </footer>
      </div>

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={handleDelete}
        wishTitle={wish.title}
      />

      <UpdateWishModal
        key={wish.id}
        isOpen={updateModal.isOpen}
        onClose={updateModal.close}
        wish={wish}
      />
    </>
  );
};

export default WishPage;
