import { useState, useEffect } from "react";
import { type Wish } from "../services/api";
import { useWishContext } from "../context/WishContext";
import { WishForm, type WishFormData } from "./WishForm";
import { createWishFromFormData } from "../utils/wishFormUtils";
import { Modal } from "./Modal";

interface UpdateWishModalProps {
  isOpen: boolean;
  onClose: () => void;
  wish: Wish | null;
}

const getInitialFormData = (wish: Wish | null): WishFormData => {
  if (!wish) {
    return { image: "", title: "", description: "", price: "" };
  }
  return {
    image: wish.image,
    title: wish.title,
    description: wish.description,
    price: wish.price.toString(),
  };
};

const UpdateWishModal = ({ isOpen, onClose, wish }: UpdateWishModalProps) => {
  const { updateWishById } = useWishContext();
  const [formData, setFormData] = useState<WishFormData>(() => getInitialFormData(wish));

  useEffect(() => {
    if (wish) {
      setFormData(getInitialFormData(wish));
    }
  }, [wish]);

  if (!wish) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedWish = createWishFromFormData(formData, wish) as Wish;
      await updateWishById(wish.id, updatedWish);
      onClose();
    } catch (error) {
      console.error("Error updating wish:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Wish">
      <WishForm
        formData={formData}
        onChange={setFormData}
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitLabel="Update Wish"
      />
    </Modal>
  );
};

export { UpdateWishModal };