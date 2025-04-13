const express = require('express');
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

//get all orders

router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email');
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// router put /api/admin/orders/:id

router.put('/:id', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      order.isDelivered =
        req.body.status === 'Delivered' ? true : order.isDelivered;

      order.deliveredAt =
        req.body.status === 'Delivered' ? Date.now() : order.isDelivered;

      const updateOrder = await order.save();
      res.json(updateOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

//router delete /api/admin/order/:id

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.json({ message: 'Order removed' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
module.exports = router;
