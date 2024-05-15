const express = require("express")
const {downloadvideo} = require("../controllers/videodownloadcontroller")
// const router = require("./videodetailsRoutes")

const router = express.Router()

router.post("/video",downloadvideo)


module.exports = router