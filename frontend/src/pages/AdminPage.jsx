import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSweets } from '../context/SweetContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const AdminPage = () => {
  const { sweets, addSweet, updateSweet, deleteSweet, loading } = useSweets();
  const [isEditing, setIsEditing] = useState(false);
  const [currentSweet, setCurrentSweet] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    quantity: '',
    image: '',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      quantity: '',
      image: '',
    });
    setIsEditing(false);
    setCurrentSweet(null);
  };

  const handleEdit = (sweet) => {
    setIsEditing(true);
    setCurrentSweet(sweet);
    setFormData({
      name: sweet.name,
      description: sweet.description,
      price: sweet.price,
      category: sweet.category,
      quantity: sweet.quantity,
      image: sweet.image,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this sweet?')) {
      await deleteSweet(id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sweetData = {
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    };

    try {
      if (isEditing && currentSweet) {
        await updateSweet(currentSweet._id, sweetData);
      } else {
        await addSweet(sweetData);
      }
      resetForm();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6 flex items-center justify-between">
              {isEditing ? 'Edit Sweet' : 'Add New Sweet'}
              {isEditing && (
                <button 
                  onClick={resetForm} 
                  className="text-gray-500 hover:text-gray-700"
                  title="Cancel Edit"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="name"
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                id="description"
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="price"
                  type="number"
                  label="Price (₹)"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
                <Input
                  id="quantity"
                  type="number"
                  label="Quantity"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  required
                />
              </div>
              <Input
                id="category"
                label="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
              <Input
                id="image"
                label="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
              />
              <Button type="submit" variant="primary" className="w-full">
                {isEditing ? 'Update Sweet' : 'Add Sweet'}
              </Button>
            </form>
          </Card>
        </div>

        {/* List Section */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold mb-4">Manage Inventory</h2>
          {sweets.map((sweet) => (
            <Card key={sweet._id} className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <img 
                src={sweet.image} 
                alt={sweet.name} 
                className="w-24 h-24 object-cover rounded-lg shrink-0"
              />
              <div className="grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{sweet.name}</h3>
                    <p className="text-gray-600 text-sm">{sweet.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-600">₹{sweet.price}</p>
                    <p className={`text-sm ${sweet.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {sweet.quantity} in stock
                    </p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">{sweet.description}</p>
                <div className="flex gap-2 mt-4 justify-end">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 text-sm py-1 px-3"
                    onClick={() => handleEdit(sweet)}
                  >
                    <Edit2 className="h-3 w-3" /> Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 text-sm py-1 px-3 text-red-600 border-red-600 hover:bg-red-50 focus:ring-red-500"
                    onClick={() => handleDelete(sweet._id)}
                  >
                    <Trash2 className="h-3 w-3" /> Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
