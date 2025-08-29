import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ClosetItem {
  id: string;
  url: string;
  name: string;
  category: string;
  color: string;
  style: string;
  createdAt: Date;
}

interface ClosetContextType {
  items: ClosetItem[];
  addItem: (file: File) => void;
  removeItem: (id: string) => void;
  getItemCount: () => number;
}

const ClosetContext = createContext<ClosetContextType | undefined>(undefined);

export const useCloset = () => {
  const context = useContext(ClosetContext);
  if (context === undefined) {
    throw new Error('useCloset must be used within a ClosetProvider');
  }
  return context;
};

interface ClosetProviderProps {
  children: ReactNode;
}

export const ClosetProvider: React.FC<ClosetProviderProps> = ({ children }) => {
  const [items, setItems] = useState<ClosetItem[]>([]);

  const addItem = (file: File) => {
    const url = URL.createObjectURL(file);
    const newItem: ClosetItem = {
      id: Date.now().toString(),
      url,
      name: `아이템 ${items.length + 1}`,
      category: '의류',
      color: '기본',
      style: '캐주얼',
      createdAt: new Date(),
    };

    setItems(prev => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(prev => {
      const itemToRemove = prev.find(item => item.id === id);
      if (itemToRemove) {
        URL.revokeObjectURL(itemToRemove.url);
      }
      return prev.filter(item => item.id !== id);
    });
  };

  const getItemCount = () => {
    return items.length;
  };

  const value: ClosetContextType = {
    items,
    addItem,
    removeItem,
    getItemCount,
  };

  return (
    <ClosetContext.Provider value={value}>
      {children}
    </ClosetContext.Provider>
  );
};

