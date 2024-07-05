// Cú pháp để có thể export được hàm có tên là index sang các file khác
module.exports.index = (app) => {
    app.get('/', (req, res) => {
        res.render("client/pages/home/index");
    })
    
    app.get('/products', (req, res) => {
        res.render("client/pages/products/index");
    })
}