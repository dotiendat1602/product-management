const Product = require("../../model/product.model");
const productCategory = require("../../model/products-category.model");

// [GET] /products/
module.exports.index = async (req, res) => {
    const products = await Product
        .find({
            status: "active",
            deleted: false
        })
        .sort({
            position: "desc"
        });
    for (const item of products) {
        item.priceNew = (item.price*(1-item.discountPercentage/100)).toFixed(2);
    }

    res.render("client/pages/products/index", {
        pageTitle: "Trang danh sách sản phẩm",
        products: products
    });
}


// [GET] /products/detail/:slug
module.exports.detail = async (req, res) => {
    const slug = req.params.slug;

    const product = await Product.findOne({
        slug: slug,
        deleted: false,
        status: "active"
    });

    if(product){
        res.render("client/pages/products/detail", {
            pageTitle: "Chi tiết sản phẩm",
            product: product
        });
    } else{
        res.redirect("/");
    }
}

// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
    const slugCategory = req.params.slugCategory;

    const category = await productCategory.findOne({
        slug: slugCategory,
        deleted: false,
        status: "active"
    });

    const allSubCategory = [];
    const getSubCategory = async (currentId) => {
        const subCategory = await productCategory.find({
            parent_id: currentId,
            status: "active",
            deleted: false
        });
        for (const sub of subCategory) {
            allSubCategory.push(sub.id);
            await getSubCategory(sub.id);
        }
    };

    await getSubCategory(category.id);

    const products = await Product
        .find({
            product_category_id: { $in: [category.id, ...allSubCategory]},
            status: "active",
            deleted: false
        })
        .sort({
            position: "desc"
        });
    for (const item of products) {
        item.priceNew = (item.price*(1-item.discountPercentage/100)).toFixed(2);
    }

    res.render("client/pages/products/index", {
        pageTitle: category.title,
        products: products
    });
}