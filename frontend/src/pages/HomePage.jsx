import React, { useState, useMemo } from 'react';
import { Search, Filter, ShoppingBag } from 'lucide-react';
import { useSweets } from '../context/SweetContext';
import Card from '../components/Card';
import Button from '../components/Button';

const HomePage = () => {
  const { sweets, purchaseSweet, loading, error } = useSweets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(sweets.map(s => s.category))];
    return cats;
  }, [sweets]);

  // Filter sweets based on search and category
  const filteredSweets = useMemo(() => {
    return sweets.filter(sweet => {
      const matchesSearch = sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sweet.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || sweet.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [sweets, searchQuery, selectedCategory]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Discover the <span className="text-orange-600">Sweetest</span> Delights
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          From traditional classics to modern favorites, find the perfect sweet treat for every occasion.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search sweets..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          <Filter className="h-5 w-5 text-gray-500 mr-2 shrink-0" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                ${selectedCategory === category 
                  ? 'bg-orange-100 text-orange-800 border border-orange-200' 
                  : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Sweets Grid */}
      {filteredSweets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSweets.map((sweet) => (
            <Card key={sweet._id} className="flex flex-col h-full group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={sweet.image} 
                  alt={sweet.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600 shadow-sm">
                  {sweet.category}
                </div>
                {sweet.quantity === 0 && (
                   <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                     <span className="bg-red-600 text-white px-4 py-2 rounded-full font-bold transform -rotate-12 border-2 border-white shadow-lg">
                       SOLD OUT
                     </span>
                   </div>
                )}
              </div>
              <div className="p-6 flex flex-col grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{sweet.name}</h3>
                  <span className="text-lg font-bold text-orange-600">₹{sweet.price}</span>
                </div>
                <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                    <span className={`inline-block w-2 h-2 rounded-full ${sweet.quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {sweet.quantity > 0 ? `${sweet.quantity} left` : 'Out of stock'}
                </div>
                <p className="text-gray-600 text-sm mb-6 grow">{sweet.description}</p>
                <Button 
                  variant="primary" 
                  className="w-full mt-auto flex items-center justify-center gap-2"
                  onClick={() => purchaseSweet(sweet._id)}
                  disabled={sweet.quantity === 0}
                >
                  <ShoppingBag className="w-4 h-4" />
                  {sweet.quantity > 0 ? 'Purchase' : 'Out of Stock'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🍪</div>
          <h3 className="text-xl font-medium text-gray-900">No sweets found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filter to find what you're looking for.</p>
          <Button 
            variant="outline" 
            className="mt-6"
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
