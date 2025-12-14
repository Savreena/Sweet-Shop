import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import api from '../utils/api';

const SweetContext = createContext();

export const useSweets = () => {
  const context = useContext(SweetContext);
  if (!context) {
    throw new Error('useSweets must be used within a SweetProvider');
  }
  return context;
};

export const SweetProvider = ({ children }) => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/sweets');
      setSweets(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch sweets');
      toast.error('Failed to fetch sweets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  // Purchase a sweet (decrease quantity)
  const purchaseSweet = async (id) => {
    try {
      const { data } = await api.post(`/sweets/${id}/purchase`);
      setSweets((prevSweets) =>
        prevSweets.map((sweet) => (sweet._id === id ? data : sweet))
      );
      toast.success('Sweet purchased successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to purchase sweet');
    }
  };

  // Add a new sweet
  const addSweet = async (newSweet) => {
    try {
      const { data } = await api.post('/sweets', newSweet);
      setSweets((prevSweets) => [...prevSweets, data]);
      toast.success('Sweet added successfully');
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to add sweet');
    }
  };

  // Update an existing sweet
  const updateSweet = async (id, updatedSweet) => {
    try {
      const { data } = await api.put(`/sweets/${id}`, updatedSweet);
      setSweets((prevSweets) =>
        prevSweets.map((sweet) => (sweet._id === id ? data : sweet))
      );
      toast.success('Sweet updated successfully');
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to update sweet');
    }
  };

  // Delete a sweet
  const deleteSweet = async (id) => {
    try {
      await api.delete(`/sweets/${id}`);
      setSweets((prevSweets) => prevSweets.filter((sweet) => sweet._id !== id));
      toast.success('Sweet deleted successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete sweet');
    }
  };

  const value = {
    sweets,
    loading,
    error,
    purchaseSweet,
    addSweet,
    updateSweet,
    deleteSweet,
    fetchSweets,
  };

  return <SweetContext.Provider value={value}>{children}</SweetContext.Provider>;
};
