import { type Wish } from '../services/api';
import { type WishFormData } from '../components/WishForm';

export const createWishFromFormData = (
  formData: WishFormData,
  existingWish?: Wish
): Omit<Wish, 'id'> | Wish => {
  const baseWish = {
    image: formData.image,
    title: formData.title,
    description: formData.description,
    price: Number(formData.price),
  };

  if (existingWish) {
    return {
      ...baseWish,
      id: existingWish.id,
      createdAt: existingWish.createdAt ?? new Date().toISOString(),
    };
  }

  return {
    ...baseWish,
    createdAt: new Date().toISOString(),
  };
};
