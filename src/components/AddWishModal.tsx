import { useState, useEffect } from "react";
import { useWishContext } from "../context/WishContext";
import { WishForm, type WishFormData } from "./WishForm";
import { createWishFromFormData } from "../utils/wishFormUtils";
import { Modal } from "./Modal";

interface AddWishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_FORM_DATA: WishFormData = {
  image: "",
  title: "",
  description: "",
  price: "",
};



const AddWishModal = ({ isOpen, onClose }: AddWishModalProps) => {
  const { addWish } = useWishContext();
  const [formData, setFormData] = useState<WishFormData>(INITIAL_FORM_DATA);

  useEffect(() => {
    if (!isOpen) {
      setFormData(INITIAL_FORM_DATA);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newWish = createWishFromFormData(formData);
      await addWish(newWish);
      onClose();
    } catch (error) {
      console.error("Error adding wish:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Wish">
      <WishForm
        formData={formData}
        onChange={setFormData}
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitLabel="Add Wish"
      />
    </Modal>
  );
};

export { AddWishModal };