const Sweet = require('../models/Sweet');

// @desc    Get all sweets
// @route   GET /api/sweets
// @access  Public
const getSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.status(200).json(sweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search sweets
// @route   GET /api/sweets/search
// @access  Public
const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    let query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(query);
    res.status(200).json(sweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new sweet
// @route   POST /api/sweets
// @access  Private/Admin
const addSweet = async (req, res) => {
  try {
    const { name, description, price, category, image, quantity } = req.body;

    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({ message: 'Please add all required fields' });
    }

    const sweet = await Sweet.create({
      name,
      description,
      price,
      category,
      image,
      quantity: quantity || 0,
    });

    res.status(201).json(sweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a sweet
// @route   PUT /api/sweets/:id
// @access  Private/Admin
const updateSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    const updatedSweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedSweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a sweet
// @route   DELETE /api/sweets/:id
// @access  Private/Admin
const deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    await sweet.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Purchase a sweet (decrease quantity)
// @route   POST /api/sweets/:id/purchase
// @access  Private
const purchaseSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    if (sweet.quantity <= 0) {
      return res.status(400).json({ message: 'Sweet is out of stock' });
    }

    sweet.quantity -= 1;
    await sweet.save();

    res.status(200).json(sweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Restock a sweet (increase quantity)
// @route   POST /api/sweets/:id/restock
// @access  Private/Admin
const restockSweet = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Please provide a valid quantity to restock' });
    }

    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    sweet.quantity += Number(quantity);
    await sweet.save();

    res.status(200).json(sweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getSweets,
  searchSweets,
  addSweet,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
};
