const productCategory = require("../../model/products-category.model");
const systemConfig = require("../../config/system.js");

const createTreeHelper = require("../../helper/createTree.helper.js");

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
    const records = await productCategory.find({
        deleted: false
    });
    

    res.render("admin/pages/products-category/index", {
        pageTitle: "Danh mục sản phẩm",
        records: records
    })
}

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
    const categories = await productCategory.find({
        deleted: false
    });

    const newCategories = createTreeHelper(categories);

    res.render("admin/pages/products-category/create", {
      pageTitle: "Thêm mới danh mục sản phẩm",
      categories: newCategories
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

// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;

    const category = await productCategory.findOne({
        _id: id,
        deleted: false
    });

    const categories = await productCategory.find({
        deleted: false
    });

    const newCategories = createTreeHelper(categories);

    res.render("admin/pages/products-category/edit", {
      pageTitle: "Chỉnh sửa danh mục sản phẩm",
      categories: newCategories,
      category: category
    });
}


// [PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    if(req.body.position) {
        req.body.position = parseInt(req.body.position);
    } else {
        const countCategory = await productCategory.countDocuments({});
        req.body.position = countCategory + 1;
    }

    await productCategory.updateOne({
        _id: id,
        deleted: false
    }, req.body);

    req.flash('success', "Cập nhật danh mục sản phẩm thành công")

    res.redirect(`/admin/products-category`);
}