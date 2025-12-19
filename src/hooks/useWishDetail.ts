import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { type Wish } from '../services/api';
import { useWishContext } from '../context/WishContext';
import { useModal } from './useModal';

interface UseWishDetailReturn {
  wish: Wish | null;
  loading: boolean;
  error: string | null;
  deleteModal: ReturnType<typeof useModal>;
  updateModal: ReturnType<typeof useModal>;
  handleDelete: () => Promise<void>;
  handleDeleteClick: () => void;
  handleUpdateClick: () => void;
  navigateBack: (path?: string) => void;
}

export const useWishDetail = (defaultBackPath = '/'): UseWishDetailReturn => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    getWish,
    removeWish,
    loading: contextLoading,
    wishes,
  } = useWishContext();
  const [loadedWish, setLoadedWish] = useState<Wish | null>(null);
  const [localLoading, setLocalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deleteModal = useModal();
  const updateModal = useModal();
  const isLoadingRef = useRef(false);

  const contextWish = useMemo(() => {
    if (!id) return null;
    return wishes.find(w => w.id === id) ?? null;
  }, [id, wishes]);

  const wish = contextWish ?? loadedWish;
  const loading = contextLoading || localLoading;

  useEffect(() => {
    if (!id || contextWish || isLoadingRef.current) {
      return;
    }

    const loadWish = async () => {
      isLoadingRef.current = true;
      setLocalLoading(true);
      setError(null);

      try {
        const data = await getWish(id);
        if (data) {
          setLoadedWish(data);
        } else {
          setError('Wish not found');
          navigate(defaultBackPath);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load wish';
        setError(errorMessage);
        console.error('Error loading wish:', err);
        navigate(defaultBackPath);
      } finally {
        setLocalLoading(false);
        isLoadingRef.current = false;
      }
    };

    loadWish();
  }, [id, contextWish, getWish, navigate, defaultBackPath]);

  const handleDelete = useCallback(async () => {
    if (!wish) return;

    try {
      await removeWish(wish.id);
      deleteModal.close();
      navigate(defaultBackPath);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to delete wish';
      setError(errorMessage);
      console.error('Error deleting wish:', err);
    }
  }, [wish, removeWish, deleteModal, navigate, defaultBackPath]);

  const handleDeleteClick = useCallback(() => {
    deleteModal.open();
  }, [deleteModal]);

  const handleUpdateClick = useCallback(() => {
    updateModal.open();
  }, [updateModal]);

  const navigateBack = useCallback(
    (path?: string) => {
      navigate(path ?? defaultBackPath);
    },
    [navigate, defaultBackPath]
  );

  return {
    wish,
    loading,
    error,
    deleteModal,
    updateModal,
    handleDelete,
    handleDeleteClick,
    handleUpdateClick,
    navigateBack,
  };
};
