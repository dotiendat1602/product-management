const dashboardRoute = require("./dashboard.route");
const productsRoute = require("./product.route");
const productsCategoryRoute = require("./product-category.route");
const roleRoute = require("./role.route");
const accountRoute = require("./account.route");
const authRoute = require("./auth.route");
const systemConfig = require("../../config/system");

// Cú pháp để có thể export được hàm có tên là index sang các file khác
module.exports.index = (app) => {
    const path = `/${systemConfig.prefixAdmin}`;
    app.use(`${path}/dashboard`, dashboardRoute);
    app.use(`${path}/products`, productsRoute);
    app.use(`${path}/products-category`, productsCategoryRoute);
    app.use(`${path}/roles`, roleRoute);
    app.use(`${path}/accounts`, accountRoute);
    app.use(`${path}/auth`, authRoute);
}