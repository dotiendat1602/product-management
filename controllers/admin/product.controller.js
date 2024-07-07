const Product = require("../../model/product.model");

// [GET] /admin/products/
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    };
    if(req.query.status){
        find.status = req.query.status;
    }
    const products = await Product.find(find);

    console.log(products);

    res.render("admin/pages/product/index", {
        pageTitle: "Quản lý sản phẩm",
        products: products
    });
}