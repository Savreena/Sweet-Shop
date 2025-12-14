const express = require('express');
const router = express.Router();
const {
  getSweets,
  searchSweets,
  addSweet,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} = require('../controllers/sweetController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getSweets);
router.get('/search', searchSweets);

// Protected routes
router.post('/', protect, admin, addSweet);
router.put('/:id', protect, admin, updateSweet);
router.delete('/:id', protect, admin, deleteSweet);
router.post('/:id/purchase', protect, purchaseSweet);
router.post('/:id/restock', protect, admin, restockSweet);

module.exports = router;
