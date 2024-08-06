const homeRoute = require("./home.route");
const productRoute = require("./product.route");
const searchRoute = require("./search.route");
const cartRoute = require("./cart.route");
const checkoutRoute = require("./checkout.route");
const userRoute = require("./user.route");


const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");

// Cú pháp để có thể export được hàm có tên là index sang các file khác
module.exports.index = (app) => {
    app.use(categoryMiddleware.category);
    app.use(cartMiddleware.cartId);

    app.use('/', homeRoute);
    
    app.use('/products', productRoute);

    app.use('/search', searchRoute);

    app.use("/cart", cartRoute);

    app.use("/checkout", checkoutRoute);

    app.use("/user", userRoute);
}