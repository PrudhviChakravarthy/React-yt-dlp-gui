const {execSync,spawn} = require("child_process")
const path = require("path")
const fs = require("fs")
const http = require("http")
const Websocket = require("ws")
const ytdlp = path.join(__dirname,"../essentialfiles","yt-dlp.exe")
const ffmpeg = path.join(__dirname,"../essentialfiles","ffmpeg.exe")
const downladlocation = path.join(__dirname,"..","temp")

const ytdlpcheck = fs.existsSync(ytdlp)
const ffmpegpcheck = fs.existsSync(ffmpeg)

const server = http.createServer()
const wsclient = new Websocket.Server({noServer:true});


let processrunning = 0
let socketrunning = 0

const downloadvideo = async(req, res) => {
    const url = req.body.url
    const audioid = req.body.audioid
    const videoid = req.body.videoid
    const sublang = req.body.sublang || "en"
    const ffmpegloc = ffmpegpcheck ? ` --ffmpeg-location ${ffmpeg}`: ""
    let downlaodstring  = ""
    if ( !fs.existsSync(downladlocation)){
        fs.mkdirSync(downladlocation)
    }
    
    console.log(audioid,videoid)
    if(audioid && videoid){
        downlaodstring = `${videoid}+${audioid}`
    }else{
        downlaodstring = audioid ? audioid : videoid ? videoid : null
    }
    const command = `yt-dlp -f ${downlaodstring} "${url}" ${ffmpegloc} --write-sub --sub-lang "${sublang}.*" --embed-thumbnail --compat-options no-keep-subs --progress -P "temp:temp"  --no-warnings --progress-template "download:%(info.format_id)s ->%(progress._speed_str)s->%(progress._percent_str)s->%(progress._downloaded_bytes_str)s->%(progress._total_bytes_str)s" -q`
    console.log(command)


    if(!socketrunning){
        socketrunning = 1
        server.on('upgrade', function (request, socket, head) {
            wsclient.handleUpgrade(request, socket, head, function (ws) {
                wsclient.emit('connection', ws, request);
            })
          })

        server.listen(4001,()=>{
            console.log("server running on port 4001")
            res.status(200).send("websocket created successfully connect with it")


        wsclient.on("connection", (ws) =>{

            ws.on("open",() =>{
                console.log("websocket opened")
            })

            ws.on('message',(message) => {
                
                if(!processrunning){
                    processrunning = 1
                    const output = spawn(command, {shell:true,cwd:downladlocation})
  
                    output.stdout.on('data',(data) =>{
                        console.log(data.toString())
                        ws.send(data.toString())
                    })
                    output.stderr.on('data',(data) =>{
                        console.log(data.toString())
                        // ws.send(data.toString())
                    })

                    output.on('close',() =>{
                        ws.send("wsclosed")
                        ws.close()
                        server.close()
                        processrunning = 0
                    })}
                else{
                    ws.send("process already running please wait.")
                }

            })

            ws.on('close', () => {
                socketrunning = 0
                server.close(()=> {
                    console.log("server closed")
                })
                console.log("web socket closed")
            })
        })
    })
    }else{
        res.status(500).send(
            "socket is running please try again later"
        )
    }
  


    // let command
    // if (ytdlpcheck){
    //     command = `${ytdlp} -f ${audioid}+${videoid} ${url}`
    //     if(ffmpegpcheck){
    //         command = command +` --ffmpeg-location ${ffmpeg}`
    //     }
    //     try{
    //         const output = 
    //     }
    // }else{
    //     res.status(404).send("ytdlp not found need to install ")
    // }
}

module.exports = {
    downloadvideo
}