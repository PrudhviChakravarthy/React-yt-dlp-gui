const express = require("express")
const bodyparser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")


const videodetails = require("./routes/videodetailsRoutes")
const videodownloader = require("./routes/videodownloderRoutes")
const imageget = require("./routes/imageRoute")
const mainfilecheck = require("./routes/mainfilesroute")

const PORT = 4003
const app = express()
app.use(morgan())
app.use(cors())
app.use(bodyparser.json())

app.use("/api/video",videodetails)
app.use("/api/download",videodownloader)
app.use("/api/image",imageget)
app.use('/api/checkfiles',mainfilecheck)


app.listen(PORT ,()=>{
    console.log(`app listening on port ${PORT}`)
})