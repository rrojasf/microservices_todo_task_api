const express = require("express")
const apiController = require("../controllers/apiController")

const router = express.Router()

router.get("/tasks/", apiController.list)
router.get("/tasks/:id", apiController.detail)
router.post("/tasks/", apiController.create)
router.put("/tasks/:id", apiController.update)
router.patch("/tasks/:id", apiController.update)
router.delete("/tasks/:id", apiController.delete)

module.exports = router
