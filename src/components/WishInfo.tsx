import { type Wish } from "../services/api";
import styles from "./WishInfo.module.scss";
import { PLACEHOLDER_IMAGE, handleImageError } from "../utils/imageUtils";

interface WishInfoProps {
  wish: Wish;
}

export const WishInfo = ({ wish }: WishInfoProps) => {
  const onImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    handleImageError(e, PLACEHOLDER_IMAGE.DETAIL_ERROR);
  };

  const handleImageClick = () => {
    if (wish.image?.trim()) {
      window.open(wish.image, '_blank', 'noopener,noreferrer');
    }
  };

  const hasImage = Boolean(wish.image?.trim());

  return (
    <div className={styles.wishInfoBlock}>
      <div 
        className={styles.wishImageContainer} 
        onClick={handleImageClick}
        style={{ cursor: hasImage ? 'pointer' : 'default' }}
      >
        <img 
          src={wish.image || PLACEHOLDER_IMAGE.DETAIL} 
          alt={wish.title} 
          className={styles.wishImage}
          onError={onImageError}
        />
        {hasImage && (
          <div className={styles.wishImageOverlay}>
            <span className={styles.wishImageHint}>Click to view in full size</span>
          </div>
        )}
      </div>
      <div className={styles.wishContent}>
        <h1 className={styles.wishTitle}>{wish.title}</h1>
        <p className={styles.wishDescription}>{wish.description}</p>
        <div className={styles.wishPrice}>${wish.price.toFixed(2)}</div>
      </div>
    </div>
  );
};

