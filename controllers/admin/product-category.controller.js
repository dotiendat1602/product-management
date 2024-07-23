const productCategory = require("../../model/products-category.model");
const systemConfig = require("../../config/system.js");

// [GET] /admin/products-category
module.exports.index = (req, res) => {
    res.render("admin/pages/products-category/index", {
        pageTitle: "Danh mục sản phẩm"
    })
}

// [GET] /admin/products-category/create
module.exports.create = (req, res) => {
    res.render("admin/pages/products-category/create", {
      pageTitle: "Thêm mới danh mục sản phẩm"
    });
  }
  
  // [POST] /admin/products-category/create
  module.exports.createPost = async (req, res) => {
    if(req.body.position) {
      req.body.position = parseInt(req.body.position);
    } else {
      const countCategory = await productCategory.countDocuments({});
      req.body.position = countCategory + 1;
    }
  
    const newCategory = new productCategory(req.body);
    await newCategory.save();
  
    res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
}