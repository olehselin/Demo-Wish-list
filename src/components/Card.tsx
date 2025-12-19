import { useNavigate } from "react-router";
import styles from "./Card.module.scss";
import { CardButton } from "../buttons";
import { PLACEHOLDER_IMAGE, handleImageError } from "../utils/imageUtils";

interface CardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  onDelete?: () => void;
  onUpdate?: () => void;
}

const Card = ({
  id,
  image,
  title,
  description,
  price,
  onDelete,
  onUpdate,
}: CardProps) => {
  const navigate = useNavigate();

  const onImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    handleImageError(e, PLACEHOLDER_IMAGE.CARD_ERROR);
  };

  const handleImageClick = () => {
    navigate(`/wish/${id}`);
  };

  const hasImage = Boolean(image?.trim());

  return (
    <div className={styles.card}>
      <div 
        className={styles.cardImage} 
        onClick={handleImageClick}
        style={{ cursor: hasImage ? 'pointer' : 'default' }}
      >
        <img 
          src={image || PLACEHOLDER_IMAGE.CARD} 
          alt={title}
          onError={onImageError}
        />
        {hasImage && (
          <div className={styles.cardImageOverlay}>
            <span className={styles.cardImageHint}>Click to view</span>
          </div>
        )}
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
        <p className={styles.cardPrice}>${price.toFixed(2)}</p>
      </div>

      <footer className={styles.cardFooter}>
        <CardButton variant="details" to={`/wish/${id}`}>
          Details
        </CardButton>

        <CardButton
          variant="update"
          onClick={onUpdate}
          disabled={!onUpdate}
        >
          Update
        </CardButton>

        <CardButton
          variant="delete"
          onClick={onDelete}
          disabled={!onDelete}
        >
          Delete
        </CardButton>
      </footer>
    </div>
  );
};

export { Card };
