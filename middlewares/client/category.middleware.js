const productCategory = require("../../model/products-category.model");
const createTreeHelper = require("../../helper/createTree.helper");

module.exports.category = async (req, res, next) => {
    const categoryProducts = await productCategory.find({
        deleted: false,
        status: "active"
    });

    const newCategoryProducts = createTreeHelper(categoryProducts);
    res.locals.layoutCategoryProducts = newCategoryProducts;

    next();
}