const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/product.controller");

router.get("/", controller.index);

router.patch("/change-status/:statusChange/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.patch("/delete/:id", controller.deleteItem);

router.get("/trash", controller.getPageTrash);

router.patch("/restore/:id", controller.restore);

router.delete("/delete-permanently/:id", controller.deletePermanently);

router.patch("/change-position/:id", controller.changePosition);

module.exports = router;