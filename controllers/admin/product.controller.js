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
        .skip(pagination.skip)
        .sort({
            position: "desc"
        });

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

    req.flash('success', 'Cập nhật trạng thái thành công!');

    res.json({
        code: 200
    });

}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const {status, ids} = req.body;

    switch (status) {
        case "active":
        case "inactive":
            await Product.updateMany({
                _id: ids
            }, {
                status: status
            });
            break;
        case "deleted":
            await Product.updateMany({
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
}

// [PATCH] /admin/products/delete
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    await Product.updateOne({
        _id: id
    }, {
        deleted: true
    });

    req.flash('success', 'Xóa sản phẩm thành công!');

    res.json({
        code: 200
    });
}

// [GET] /admin/products/trash
module.exports.getPageTrash = async (req, res) => {
    const find = {
        deleted: true
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

    res.render("admin/pages/product/trash", {
        pageTitle: "Quản lý sản phẩm đã xóa",
        products: products,
        keyword: keyword,
        filterStatus: filterStatus,
        pagination: pagination
    });
}

// [PATCH] /admin/products/restore
module.exports.restore = async (req, res) => {
    const id = req.params.id;

    await Product.updateOne({
        _id: id
    }, {
        deleted: false
    });

    res.json({
        code: 200
    });
}

// [DELETE] /admin/products/delete-permanently
module.exports.deletePermanently = async (req, res) => {
    const id = req.params.id;

    await Product.deleteOne({
        _id: id
    });

    res.json({
        code: 200
    });
}

// [PATCH] /admin/products/change-position
module.exports.changePosition = async (req, res) => {
    const id = req.params.id;
    const position = req.body.position;

    await Product.updateOne({
        _id: id
    }, {
        position: position
    });

    res.json({
        code: 200
    });
}