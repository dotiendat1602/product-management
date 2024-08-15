const productCategory = require("../../model/products-category.model");
const systemConfig = require("../../config/system.js");

const createTreeHelper = require("../../helper/createTree.helper.js");

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
    if(res.locals.role.includes("products-category_view")) {
        const records = await productCategory.find({
            deleted: false
        });
        
        res.render("admin/pages/products-category/index", {
            pageTitle: "Danh mục sản phẩm",
            records: records
        })
    }
}

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
    if(res.locals.role.includes("products-category_create")) {
        const categories = await productCategory.find({
            deleted: false
        });
    
        const newCategories = createTreeHelper(categories);
    
        res.render("admin/pages/products-category/create", {
            pageTitle: "Thêm mới danh mục sản phẩm",
            categories: newCategories
        });
    } else {
        res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
    }
}
  
  // [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
    if(res.locals.role.includes("products-category_view")) {
        if(req.body.position) {
            req.body.position = parseInt(req.body.position);
        } else {
            const countCategory = await productCategory.countDocuments({});
            req.body.position = countCategory + 1;
        }
    
        const newCategory = new productCategory(req.body);
        await newCategory.save();
    
        res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
    } else {
        res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
    }
}

// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
    if(res.locals.role.includes("products-category_edit")) {
        try {
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

        } catch (error) {
            res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
        }
    } else {
        res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
    }
}

// [PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
    if(res.locals.role.includes("products-category_edit")) {
        try {
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
        } catch (error) {
            res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
        }
    } else {
        res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
    }
}

// [PATCH] /admin/products-category/:statusChange/:id
module.exports.changeStatus = async (req, res) => {
    if(res.locals.role.permissions.includes("products-category_edit")){
        try {
            const statusChange = req.params.statusChange;
            const id = req.params.id;

            await productCategory.updateOne({
                _id: id
            }, {
                status: statusChange
            });

            req.flash('success', 'Cập nhật trạng thái thành công!');

            res.json({
                code: 200
            });
        } catch(error){
            res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
        }
    } else {
        res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
    }
}

// [PATCH] /admin/products-category/change-multi
module.exports.changeMulti = async (req, res) => {
    if(res.locals.role.permissions.includes("products-category_edit")) {
        const {status, ids} = req.body;

        switch (status) {
            case "active":
            case "inactive":
                await productCategory.updateMany({
                    _id: ids
                }, {
                    status: status
                });
                break;
            case "deleted":
                await productCategory.updateMany({
                    _id: ids
                }, {
                    deleted: true
                });
                break;
            default:
                break;
        }


        res.json({
            code: 200
        });

    } else {
        res.send("403");
    }
}

// [GET] /admin/products-category/detail/:id
module.exports.detail = async (req, res) => {
    if(res.locals.role.permissions.includes("products-category_view")) {
        try {
            const id = req.params.id;

            const category = await productCategory.findOne({
                _id: id,
                deleted: false
            });

            if(category){
                res.render("admin/pages/products-category/detail", {
                    pageTitle: "Chi tiết danh mục sản phẩm",
                    category: category
                });
            } else{
                res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
            }
        } catch (error) {
            res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
        }
    }
}

// [PATCH] /admin/products-category/delete/:id
module.exports.deleteItem = async (req, res) => {
    if(res.locals.role.permissions.includes("products-category_edit")) {
        try {
            const id = req.params.id;
    
            await productCategory.updateOne({
                _id: id
            }, {
                deleted: true,
                deletedBy: res.locals.account.id
            });
    
            req.flash('success', 'Xóa sản phẩm thành công!');

            res.json({
                code: 200
            });

        } catch (error) {
            res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
        }
    } else {
        res.send("403");
    }
}

// [GET] /admin/products-category/trash
module.exports.trash = async (req, res) => {
    if(res.locals.role.permissions.includes("products-category_edit")) {
        const records = await productCategory.find({
            deleted: true
        });
    
        res.render("admin/pages/products-category/trash", {
            pageTitle: "Quản lý danh mục đã xóa",
            records: records
        });
    }
}

// [PATCH] /admin/products-category/restore/:id
module.exports.restore = async (req, res) => {
    if(res.locals.role.permissions.includes("products-category_edit")) {
        try {
            const id = req.params.id;
            
            await productCategory.updateOne({
                _id: id
            }, {
                deleted: false
            });

            req.flash("success", "Khôi phục danh mục sản phẩm thành công!");

            res.json({
                code: 200
            });
        } catch (error) {
            res.redirect(`${systemConfig.prefixAdmin}/products-category`);
        }
    } else {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    }
}

// [DELETE] /admin/products-category/delete-permanently/:id
module.exports.deletePermanently = async (req, res) => {
    if(res.locals.role.permissions.includes("products-category_delete")) {
        try {
            const id = req.params.id;

            await productCategory.deleteOne({
                _id: id
            });

            res.json({
                code: 200
            });

        } catch (error) {
            res.redirect(`${systemConfig.prefixAdmin}/products-category`);
        }

    } else {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    }
}