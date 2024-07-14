const Product = require("../../model/product.model");

const paginationHelper = require("../../helper/pagination.helper.js");

// [GET] /admin/products/
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    };

    const filterStatus = [
        {
            label: "Tất cả",
            value: ""
        },
        {
            label: "Hoạt động",
            value: "active"
        },
        {
            label: "Dừng hoạt động",
            value: "inactive"
        },
    ];

    if(req.query.status){
        find.status = req.query.status;
    }

    // Tìm kiếm cơ bản
    let keyword = "";
    if(req.query.keyword){
        const regex = new RegExp(req.query.keyword, "i");
        find.title = regex;
        keyword = req.query.keyword;
    }
    // Hết tìm kiếm cơ bản

    // Phân trang

    const pagination = await paginationHelper.pagination(req, find);

    // Hết phân trang


    const products = await Product
        .find(find)
        .limit(pagination.limitItems)
        .skip(pagination.skip);

    //console.log(products);

    res.render("admin/pages/product/index", {
        pageTitle: "Quản lý sản phẩm",
        products: products,
        keyword: keyword,
        filterStatus: filterStatus,
        pagination: pagination
    });
}

// [PATCH] /admin/products/change-status/:statusChange/:id
module.exports.changeStatus = async (req, res) => {
    // console.log(req.params.id); // Để trả về id động
    const {id, statusChange} = req.params;

    await Product.updateOne({
        _id: id
    }, {
        status: statusChange
    });

    res.json({
        code: 200
    });

}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const {status, ids} = req.body;

    await Product.updateMany({
        _id: ids
    }, {
        status: status
    });
    
    res.json({
        code: 200
    });
}