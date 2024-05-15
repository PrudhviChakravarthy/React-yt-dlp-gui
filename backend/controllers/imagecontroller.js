const axios = require("axios")

const getimage = async(req,res) =>{
    const imgurl = req.originalUrl.split("url=")[1] 
    // const query = req.body.url
    console.log(imgurl)
    if(imgurl){
        try{
            const response = await axios.get(imgurl, {responseType : "stream"})
            // const extension = path.extname
            res.setHeader("Content-Type", response.headers['content-type']);
            response.data.pipe(res);
        }catch(error){
            res.status(500).send("error while fetching image")
        }
    }
}


module.exports = {
    getimage
}