const Roles = require("../../model/role.model");

// [GET] /admin/roles
module.exports.index = async (req, res) => {
    const records = await Roles.find({
        deleted: false
    });

    res.render("admin/pages/roles/index", {
        pageTitle: "Nhóm quyền",
        records: records
    });
}