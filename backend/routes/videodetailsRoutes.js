const express = require("express")
const { getvideodetails } = require("../controllers/videodetailscontroller")

const router = express.Router()


router.post("/details",getvideodetails)



module.exports = router