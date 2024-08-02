const homeRoute = require("./home.route");
const productRoute = require("./product.route");

const categoryMiddleware = require("../../middlewares/client/category.middleware");

// Cú pháp để có thể export được hàm có tên là index sang các file khác
module.exports.index = (app) => {
    app.use(categoryMiddleware.category);

    app.use('/', homeRoute);
    
    app.use('/products', productRoute);
}