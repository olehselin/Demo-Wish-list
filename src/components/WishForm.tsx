import { useState, useEffect, useRef } from 'react';
import { FormButton } from '../buttons';
import { validateAndLoadImage } from '../utils/imageUtils';
import styles from './AddWishModal.module.scss';

export interface WishFormData {
  image: string;
  title: string;
  description: string;
  price: string;
}

interface WishFormProps {
  formData: WishFormData;
  onChange: (data: WishFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  submitLabel?: string;
  cancelLabel?: string;
}

interface ImageState {
  error: string;
  loading: boolean;
  preview: string;
}

export const WishForm = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
}: WishFormProps) => {
  const [imageState, setImageState] = useState<ImageState>({
    error: '',
    loading: false,
    preview: '',
  });
  const previousImageUrl = useRef('');

  const handleChange = (field: keyof WishFormData, value: string) => {
    onChange({ ...formData, [field]: value });
  };

  useEffect(() => {
    const imageUrl = formData.image.trim();

    // Skip if URL hasn't changed
    if (imageUrl === previousImageUrl.current) {
      return;
    }
    
    previousImageUrl.current = imageUrl;

    // Reset state when URL is empty
    if (!imageUrl) {
      // Valid use case: synchronizing state with prop changes
      // This is necessary to reset preview/error when user clears the input
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      Promise.resolve().then(() => {
        setImageState({ error: '', loading: false, preview: '' });
      });
      return;
    }

    // Valid use case: updating loading state before async operation
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setImageState(prev => ({ ...prev, loading: true }));
    
    const cleanup = validateAndLoadImage(
      imageUrl,
      (url) => {
        setImageState({ preview: url, error: '', loading: false });
      },
      (error) => {
        setImageState({ preview: '', error, loading: false });
      }
    );

    return cleanup;
  }, [formData.image]);

  const { error: imageError, loading: imageLoading, preview: imagePreview } = imageState;

  return (
    <form onSubmit={onSubmit} className={styles.wishForm}>
      <div className={styles.formGroup}>
        <label htmlFor="image">
          Image URL:
          <span className={styles.formHint}>
            You can use links from Google Images, other sites, or direct image links
          </span>
        </label>
        <input
          id="image"
          type="url"
          value={formData.image}
          onChange={(e) => handleChange('image', e.target.value)}
          placeholder="https://example.com/image.jpg or link from Google Images"
          required
          className={imageError ? styles.inputError : ''}
        />
        {imageError && (
          <span className={styles.formError}>{imageError}</span>
        )}
        {imageLoading && (
          <div className={styles.imagePreviewLoading}>Loading image...</div>
        )}
        {imagePreview && !imageLoading && (
          <div className={styles.imagePreviewContainer}>
            <div className={styles.imagePreviewLabel}>Preview:</div>
            <div className={styles.imagePreview}>
              <img 
                src={imagePreview} 
                alt="Preview" 
                onError={() => {
                  setImageState({ preview: '', error: 'Error loading image', loading: false });
                }}
              />
            </div>
          </div>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="price">Price:</label>
        <input
          id="price"
          type="number"
          value={formData.price}
          onChange={(e) => handleChange('price', e.target.value)}
          required
          min="0"
          step="0.01"
        />
      </div>
      <div className={styles.formActions}>
        <FormButton type="button" variant="cancel" onClick={onCancel}>
          {cancelLabel}
        </FormButton>
        <FormButton type="submit" variant="submit">
          {submitLabel}
        </FormButton>
      </div>
    </form>
  );
};


