const Product = require("../../model/product.model");

// [GET] /admin/dashboard
module.exports.index = async (req, res) => {
    const statistic = {
        categoryProduct: {
            total: 0,
            active: 0,
            inactive: 0
        },
        product: {
            total: 0,
            active: 0,
            inactive: 0
        },
        account: {
            total: 0,
            active: 0,
            inactive: 0
        },
        user: {
            total: 0,
            active: 0,
            inactive: 0
        },
    };

    // categoryProduct

    // End categoryProduct

    // product
    statistic.product.total = await Product.countDocuments({
        deleted: false
    });

    statistic.product.active = await Product.countDocuments({
        deleted: false,
        status: "active"
    });

    statistic.product.inactive = await Product.countDocuments({
        deleted: false,
        status: "inactive"
    });

    // End product

    // account

    // End account

    // user

    // End user

    res.render("admin/pages/dashboard/index", {
        pageTitle: "Trang tổng quan",
        statistic: statistic
    });
}