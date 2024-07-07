const dashboardRoute = require("./dashboard.route");

// Cú pháp để có thể export được hàm có tên là index sang các file khác
module.exports.index = (app) => {
    app.use('/admin/dashboard', dashboardRoute);
}