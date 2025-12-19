import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import {
  getWishes,
  getWishById,
  createWish,
  updateWish,
  deleteWish,
  type Wish,
} from '../services/api';
import { ApiError } from '../utils/apiClient';
import { useSnackbar } from './SnackbarContext';

interface WishContextType {
  wishes: Wish[];
  loading: boolean;
  error: string | null;
  loadWishes: () => Promise<void>;
  getWish: (id: string) => Promise<Wish | null>;
  addWish: (wish: Omit<Wish, 'id'>) => Promise<Wish>;
  updateWishById: (id: string, wish: Wish) => Promise<Wish>;
  removeWish: (id: string) => Promise<void>;
  refreshWishes: () => Promise<void>;
  clearError: () => void;
}

const WishContext = createContext<WishContextType | undefined>(undefined);

export const useWishContext = () => {
  const context = useContext(WishContext);
  if (!context) {
    throw new Error('useWishContext must be used within a WishProvider');
  }
  return context;
};

interface WishProviderProps {
  children: ReactNode;
}

const getErrorMessage = (err: unknown, defaultMessage: string): string => {
  if (err instanceof ApiError) {
    return err.message;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return defaultMessage;
};

export const WishProvider = ({ children }: WishProviderProps) => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showSuccess, showError } = useSnackbar();

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const loadWishes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWishes();
      // Don't modify wishes - keep them as they are from the database
      // If they don't have createdAt, sorting will handle it
      setWishes(data);
      // Don't show success snackbar for automatic data loading
    } catch (err) {
      const errorMessage = getErrorMessage(err, 'Failed to load wishes');
      setError(errorMessage);
      showError(errorMessage);
      console.error('Error loading wishes:', err);
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const getWish = useCallback(
    async (id: string): Promise<Wish | null> => {
      try {
        setLoading(true);
        setError(null);
        const wish = await getWishById(id);
        // Don't show success snackbar for data fetching
        return wish;
      } catch (err) {
        const errorMessage = getErrorMessage(err, 'Failed to load wish');
        setError(errorMessage);
        showError(errorMessage);
        console.error('Error loading wish:', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [showError]
  );

  const addWish = useCallback(
    async (wish: Omit<Wish, 'id'>): Promise<Wish> => {
      try {
        setLoading(true);
        setError(null);
        const newWish = await createWish(wish);
        setWishes(prev => [...prev, newWish]);
        showSuccess('Wish added successfully');
        return newWish;
      } catch (err) {
        const errorMessage = getErrorMessage(err, 'Failed to create wish');
        setError(errorMessage);
        showError(errorMessage);
        console.error('Error creating wish:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const updateWishById = useCallback(
    async (id: string, wish: Wish): Promise<Wish> => {
      try {
        setLoading(true);
        setError(null);
        const updatedWish = await updateWish(id, wish);
        setWishes(prev => prev.map(w => (w.id === id ? updatedWish : w)));
        showSuccess('Wish updated successfully');
        return updatedWish;
      } catch (err) {
        const errorMessage = getErrorMessage(err, 'Failed to update wish');
        setError(errorMessage);
        showError(errorMessage);
        console.error('Error updating wish:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const removeWish = useCallback(
    async (id: string): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        await deleteWish(id);
        setWishes(prev => prev.filter(w => w.id !== id));
        showSuccess('Wish deleted successfully');
      } catch (err) {
        const errorMessage = getErrorMessage(err, 'Failed to delete wish');
        setError(errorMessage);
        showError(errorMessage);
        console.error('Error deleting wish:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const refreshWishes = useCallback(async () => {
    await loadWishes();
  }, [loadWishes]);

  const value: WishContextType = {
    wishes,
    loading,
    error,
    loadWishes,
    getWish,
    addWish,
    updateWishById,
    removeWish,
    refreshWishes,
    clearError,
  };

  return <WishContext.Provider value={value}>{children}</WishContext.Provider>;
};
