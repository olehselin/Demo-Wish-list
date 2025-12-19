import { apiClient } from '../utils/apiClient';

export interface Wish {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  createdAt?: string;
}

export const getWishes = async (): Promise<Wish[]> => {
  return apiClient.get<Wish[]>('/wishes');
};

export const getWishById = async (id: string): Promise<Wish> => {
  return apiClient.get<Wish>(`/wishes/${id}`);
};

export const createWish = async (wish: Omit<Wish, 'id'>): Promise<Wish> => {
  return apiClient.post<Wish>('/wishes', wish);
};

export const updateWish = async (id: string, wish: Wish): Promise<Wish> => {
  return apiClient.put<Wish>(`/wishes/${id}`, wish);
};

export const patchWish = async (id: string, partialWish: Partial<Wish>): Promise<Wish> => {
  return apiClient.patch<Wish>(`/wishes/${id}`, partialWish);
};

export const deleteWish = async (id: string): Promise<void> => {
  await apiClient.delete<void>(`/wishes/${id}`);
};
