const mongoose = require('mongoose');

const productShema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      requrie: true,
    },
    discountPrice: {
      type: Number,
      requrie: true,
    },
    countInStock: {
      type: Number,
      requrie: true,
      default: 0,
    },
    sku: {
      type: String,
      unique: true,
      requrie: true,
    },
    category: {
      type: String,
      requrie: true,
    },
    brand: {
      type: String,
    },
    sizes: {
      type: [String],
      require: true,
    },
    colors: {
      type: [String],
      requrie: true,
    },
    collections: {
      type: String,
      requrie: true,
    },
    meterial: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['Men', 'Women', 'Unisex'],
    },
    images: [
      {
        url: {
          type: String,
          requrie: true,
        },
        altText: {
          type: String,
        },
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    tags: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      requried: true,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeyWords: {
      type: String,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    weight: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Products', productShema);

// .models('Products', productShema);
