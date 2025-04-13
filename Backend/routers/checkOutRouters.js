const express = require('express');
const Checkout = require('../models/Checkout');
const Cart = require('../models/Cart');
const Product = require('../models/Products');
const Order = require('../models/Order');

const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// ✅ Create Checkout (POST /api/checkout)
router.post('/', protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: 'No Items in checkout' });
  }
  try {
    const newCheckOut = await Checkout.create({
      user: req.user._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: 'Pending',
      isPaid: false,
    });

    console.log(`Checkout created for user ${req.user._id}`);
    res.status(201).json(newCheckOut);
  } catch (error) {
    console.error('Error Creating checkout session:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✅ Update Payment Status (PUT /api/checkout/:id/pay)
router.put('/:id/pay', protect, async (req, res) => {
  const { paymentStatus } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: 'Checkout not found' });
    }

    if (paymentStatus === 'paid') {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paidAt = Date.now();
      await checkout.save();
      res.status(200).json({ checkout });
    } else {
      res.status(400).json({ message: 'Invalid Payment Status' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✅ Finalize Checkout (POST /api/checkout/:id/finalize)
router.post('/:id/finalize', protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: 'Checkout not found' });
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: 'paid',
      });

      // ✅ Checkout finalization
      checkout.isFinalized = true;
      checkout.finalizedAt = new Date();
      await checkout.save();

      // ✅ Delete the user's cart after checkout
      await Cart.findOneAndDelete({ user: checkout.user });

      res.status(201).json(finalOrder);
    } else if (checkout.isFinalized) {
      res.status(400).json({ message: 'Checkout already finalized' });
    } else {
      res.status(400).json({ message: 'Checkout is not paid' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
