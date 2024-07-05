const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/product.controller");

router.get("/", controller.index);

// Ví dụ về việc sau này có thêm nhiều trang con khác nữa
// router.post("/create", controller.create);

// router.patch("/edit", controller.edit);

// router.get("/detail", controller.detail);

module.exports = router;