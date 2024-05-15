const express = require("express")
const { getimage } = require("../controllers/imagecontroller")

const router = express.Router()


router.get("/stream",getimage)



module.exports = router