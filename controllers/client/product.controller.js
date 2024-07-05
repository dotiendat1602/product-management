// [GET] /products/
module.exports.index = (req, res) => {
    res.render("client/pages/products/index", {
        pageTitle: "Trang danh sách sản phẩm"
    });
}

// [POST] /products/create
// module.exports.create = (req, res) => {
//     res.render("client/pages/products/index");
// }

// [PATCH] /products/edit
// module.exports.edit = (req, res) => {
//     res.render("client/pages/products/index");
// }

// [GET] /products/detail
// module.exports.detail = (req, res) => {
//     res.render("client/pages/products/index");
// }