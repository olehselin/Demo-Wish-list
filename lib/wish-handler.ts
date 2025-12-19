import type { Wish } from '../src/services/api';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// File path for data (read-only in serverless)
const DATA_FILE = join(process.cwd(), 'db.json');

// In-memory storage (ephemeral - resets on each serverless function invocation)
// For production, upgrade to Vercel KV, Postgres, or another database
let inMemoryWishes: Wish[] | null = null;

// Default data structure
const DEFAULT_DATA = {
  wishes: [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      title: "Apple Watch Smartwatch",
      description: "Modern smartwatch with numerous features: health monitoring, notifications, fitness tracking and much more. Perfect companion for an active lifestyle.",
      price: 1299.99,
      createdAt: "2025-01-01T00:00:00.000Z"
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      title: "Sony WH-1000XM5 Wireless Headphones",
      description: "Premium headphones with active noise cancellation, excellent sound quality and long battery life. Perfect for travel and daily use.",
      price: 399.99,
      createdAt: "2025-01-02T00:00:00.000Z"
    }
  ]
};

// Load data from file or use default
const loadData = (): Wish[] => {
  // If we have in-memory data, use it (for the current function invocation)
  if (inMemoryWishes !== null) {
    return inMemoryWishes;
  }

  try {
    if (existsSync(DATA_FILE)) {
      const fileContent = readFileSync(DATA_FILE, 'utf-8');
      const data = JSON.parse(fileContent);
      inMemoryWishes = data.wishes || DEFAULT_DATA.wishes;
      return inMemoryWishes;
    }
  } catch (error) {
    console.error('Error loading data file:', error);
  }
  
  inMemoryWishes = DEFAULT_DATA.wishes;
  return inMemoryWishes;
};

// Save data to in-memory storage (ephemeral)
// NOTE: In Vercel serverless functions, file writes don't persist
// For production, replace this with database operations (Vercel KV, Postgres, etc.)
const saveData = (wishes: Wish[]): void => {
  inMemoryWishes = wishes;
  // File writes are not possible in Vercel serverless functions
  // This data will only persist for the current function invocation
  // For persistent storage, use a database service
};

// Generate a simple ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 6);
};

export const getWishes = async (): Promise<Wish[]> => {
  return loadData();
};

export const getWishById = async (id: string): Promise<Wish | null> => {
  const wishes = loadData();
  return wishes.find(w => w.id === id) || null;
};

export const createWish = async (wishData: Omit<Wish, 'id'>): Promise<Wish> => {
  const wishes = loadData();
  const newWish: Wish = {
    ...wishData,
    id: generateId(),
    createdAt: wishData.createdAt || new Date().toISOString()
  };
  wishes.push(newWish);
  saveData(wishes);
  return newWish;
};

export const updateWish = async (id: string, wishData: Wish): Promise<Wish> => {
  const wishes = loadData();
  const index = wishes.findIndex(w => w.id === id);
  if (index === -1) {
    throw new Error('Wish not found');
  }
  wishes[index] = { ...wishData, id };
  saveData(wishes);
  return wishes[index];
};

export const patchWish = async (id: string, partialWish: Partial<Wish>): Promise<Wish> => {
  const wishes = loadData();
  const index = wishes.findIndex(w => w.id === id);
  if (index === -1) {
    throw new Error('Wish not found');
  }
  wishes[index] = { ...wishes[index], ...partialWish, id };
  saveData(wishes);
  return wishes[index];
};

export const deleteWish = async (id: string): Promise<void> => {
  const wishes = loadData();
  const index = wishes.findIndex(w => w.id === id);
  if (index === -1) {
    throw new Error('Wish not found');
  }
  wishes.splice(index, 1);
  saveData(wishes);
};

