const { default: mongoose } = require("mongoose");

const Product = mongoose.model(
    'Product', 
    {
        title: String,
        description: String,
        price: Number,
        discountPercentage: Number,
        stock: Number,
        thumbnail: String,
        status: String,
        position: Number,
        deleted: Boolean
    },
    "products"
);

module.exports = Product;