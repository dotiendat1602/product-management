const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("client/pages/products/index");
})

// Ví dụ về việc sau này có thêm nhiều trang con khác nữa
// router.post("/create", (req, res) => {
//     res.render("client/pages/products/index");
// })

// router.patch("/edit", (req, res) => {
//     res.render("client/pages/products/index");
// })

// router.get("/detail", (req, res) => {
//     res.render("client/pages/products/index");
// })

module.exports = router;