import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [savedLaws, setSavedLaws] = useState(() => {
    try {
      const saved = localStorage.getItem('lawbd_saved_laws');
      return saved ? JSON.parse(saved) : ['law-land-disputes', 'law-cheque-dishonour'];
    } catch {
      return ['law-land-disputes', 'law-cheque-dishonour'];
    }
  });

  const [savedLawyers, setSavedLawyers] = useState(() => {
    try {
      const saved = localStorage.getItem('lawbd_saved_lawyers');
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });

  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('lawbd_saved_laws', JSON.stringify(savedLaws));
  }, [savedLaws]);

  useEffect(() => {
    localStorage.setItem('lawbd_saved_lawyers', JSON.stringify(savedLawyers));
  }, [savedLawyers]);

  const toggleLawBookmark = async (lawId) => {
    setSavedLaws(prev => {
      const exists = prev.includes(lawId);
      return exists ? prev.filter(id => id !== lawId) : [...prev, lawId];
    });

    if (isAuthenticated) {
      try {
        await api.toggleLawBookmark(lawId);
      } catch (err) {
        console.warn('Backend bookmark sync error:', err.message);
      }
    }
  };

  const toggleLawyerBookmark = async (lawyerId) => {
    const id = Number(lawyerId);
    setSavedLawyers(prev => {
      const exists = prev.includes(id);
      return exists ? prev.filter(x => x !== id) : [...prev, id];
    });

    if (isAuthenticated) {
      try {
        await api.toggleLawyerBookmark(id);
      } catch (err) {
        console.warn('Backend lawyer bookmark sync error:', err.message);
      }
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        savedLaws,
        savedLawyers,
        isSavedDrawerOpen,
        setIsSavedDrawerOpen,
        toggleLawBookmark,
        toggleLawyerBookmark
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export const useBookmarks = () => useContext(BookmarkContext);
