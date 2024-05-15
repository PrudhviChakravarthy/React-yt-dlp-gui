const express = require("express")
const { mainfilescheck } = require("../controllers/mainfilescheckcontroller")

const router = express.Router()

router.get("",mainfilescheck)

module.exports = router