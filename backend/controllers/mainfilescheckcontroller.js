const path = require("path")
const fs = require("fs")

const folder = path.join(__dirname,"../essentialfiles")

const mainfilescheck = async(req,res) => {
    const foldercheck = fs.existsSync(folder)
    if(foldercheck){
        const ffmpegcheck = fs.existsSync(path.join(folder,"ffmpeg.exe"))
        const ytdlpcheck = fs.existsSync(path.join(folder,"yt-dlp.exe"))
        if(ffmpegcheck && ytdlpcheck){
            return res.status(200).send(JSON.stringify({"yt-dlp":1,"ffmpeg":1}))
        }
        if(ffmpegcheck){
            return res.status(200).send(JSON.stringify({"yt-dlp":0,"ffmpeg":1}))
        }
        if(ytdlpcheck){
            return res.status(200).send(JSON.stringify({"yt-dlp":1,"ffmpeg":0}))
        }
        return res.status(500).send(JSON.stringify({"yt-dlp":0,"ffmpeg":0}))
    }
    return res.status(500).send("No folder for mainfiles")
}

module.exports = {
    mainfilescheck
}