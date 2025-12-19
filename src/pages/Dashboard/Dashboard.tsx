import { useEffect, useState, useMemo } from "react";
import styles from "./Dashboard.module.scss";
import type { Wish } from "../../services/api";
import { Card } from "../../components/Card";
import { AddWishModal } from "../../components/AddWishModal";
import { UpdateWishModal } from "../../components/UpdateWishModal";
import { DeleteConfirmationModal } from "../../components/DeleteConfirmationModal";
import { Filters } from "../../components/Filters";
import { Pagination } from "../../components/Pagination";
import { useWishContext } from "../../context/WishContext";
import { usePagination } from "../../hooks/usePagination";
import { useModal } from "../../hooks/useModal";
import { useFilters } from "../../hooks/useFilters";
import { sortWishes } from "../../utils/sorting";

const Dashboard = () => {
  const { wishes, loading, loadWishes, removeWish } = useWishContext();

  console.log(wishes);

  const [wishToDelete, setWishToDelete] = useState<Wish | null>(null);
  const [wishToUpdate, setWishToUpdate] = useState<Wish | null>(null);

  const { isOpen: isAddModalOpen, open: openAddModal, close: closeAddModal } = useModal();
  const { isOpen: isDeleteModalOpen, open: openDeleteModal, close: closeDeleteModal } = useModal();
  const { isOpen: isUpdateModalOpen, open: openUpdateModal, close: closeUpdateModal } = useModal();

  const { dateFilter, priceFilter, filterPriority, setDateFilter, setPriceFilter } = useFilters();

  const filteredWishes = useMemo(() => {
    return sortWishes(wishes, dateFilter, priceFilter, filterPriority);
  }, [wishes, dateFilter, priceFilter, filterPriority]);

  const {
    currentPage,
    totalPages,
    paginatedItems,
    startIndex,
    endIndex,
    setCurrentPage,
    goToNextPage,
    goToPreviousPage,
    getPageNumbers,
  } = usePagination({
    items: filteredWishes,
  });

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFilter, priceFilter]);

  useEffect(() => {
    loadWishes();
  }, [loadWishes]);

  const handleDeleteClick = (wish: Wish) => {
    setWishToDelete(wish);
    openDeleteModal();
  };

  const handleDelete = async () => {
    if (!wishToDelete) return;
    try {
      await removeWish(wishToDelete.id);
      closeDeleteModal();
      setWishToDelete(null);
    } catch (error) {
      console.error("Error deleting wish:", error);
    }
  };

  const handleUpdateClick = (wish: Wish) => {
    setWishToUpdate(wish);
    openUpdateModal();
  };

  const handleCloseDeleteModal = () => {
    closeDeleteModal();
    setWishToDelete(null);
  };

  const handleCloseUpdateModal = () => {
    closeUpdateModal();
    setWishToUpdate(null);
  };

  if (loading) {
    return (
      <div className={styles.dashboard}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.dashboard}>
        <div className={styles.dashboardHeader}>
          <h1>My Wishes</h1>
        </div>

        {/* Actions bar with filters */}
        <div className={styles.actionsBar}>
          <Filters
            dateFilter={dateFilter}
            priceFilter={priceFilter}
            onDateFilterChange={setDateFilter}
            onPriceFilterChange={setPriceFilter}
            onAddClick={openAddModal}
          />
        </div>

        {/* Grid of wishes */}
        <div className={styles.wishesContainer} key={`${dateFilter}-${priceFilter}`}>
          {paginatedItems.length === 0 ? (
            <p>No wishes</p>
          ) : (
            paginatedItems.map((wish) => {
              const { id, image, title, description, price } = wish;
              return (
                <Card
                  key={id}
                  id={id}
                  image={image}
                  title={title}
                  description={description}
                  price={price}
                  onDelete={() => handleDeleteClick(wish)}
                  onUpdate={() => handleUpdateClick(wish)}
                />
              );
            })
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onPrevious={goToPreviousPage}
          onNext={goToNextPage}
          getPageNumbers={getPageNumbers}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={filteredWishes.length}
        />
      </div>

      <AddWishModal isOpen={isAddModalOpen} onClose={closeAddModal} />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDelete}
        wishTitle={wishToDelete?.title || ""}
      />

      <UpdateWishModal
        key={wishToUpdate?.id}
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        wish={wishToUpdate}
      />
    </>
  );
};

export default Dashboard;
