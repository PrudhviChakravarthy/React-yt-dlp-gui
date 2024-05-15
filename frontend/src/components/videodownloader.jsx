import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./videodownloader.css"
import Floatingmsg from './floatingmsg'

 


export default function VideoDownlaoder({url, videoid, audioid , sublang}) {
    const [connection , setconnection] = useState(0)
    const [videomsg , setvideomsg] = useState("")
    const [auidomsg , setaudiomsg] = useState("")
    const [videopercent, setvideopercent]  = useState(0)
    const [audiopercent, setaudiopercent]  = useState(0)
    const [downloadsure, setdownloadsure] = useState(1)

    const [dwnspeed, setdwnspeed] = useState(0)
    const socket =new WebSocket('ws://localhost:4001')

    useEffect(() => {
        return () =>{
            console.log("Component unmounted")
            socket.close()
        }
    },[])
     async function downloadvideo(){
        setvideomsg(< Floatingmsg message ="Downloding started please wait 10 - 20 seconds" msgtype ="success"/>)

        try{

            const response =await axios.post("http://localhost:4003/api/download/video",{"url":url,"videoid":videoid,"audioid":audioid,"sublang":sublang})
            if (response.status === 200 && connection == 0){
                // console.log(response.data)
                
                socket.onopen = () =>{
                    setconnection(1)
                    console.log("connection established")
                    socket.send("hi")

                    setaudiomsg("")
                    setvideomsg("")
                }
                socket.onmessage = (event) =>{ 
                    console.log(event.data)
                    const match = event.data.replace(" ","").split("->");
                    if (event.data.indexOf("ERROR: Postprocessing:") !== -1){
                        setvideomsg(<Floatingmsg message= "post processing failed" msgtype ="error"/>)
                    }
                    if(event.data.indexOf(videoid) !== -1 && videoid !== 0){
                        setvideomsg((pre) => pre +`videoId: ${videoid}, downlodspeed: ${match[1]}, downloadpercentage: ${match[2]} , downlaoded :${match[3]}, filesize: ${match[4]}`)
                        setdwnspeed(match[1])
                        setvideopercent((p) => parseFloat(match[2] !== "NaN" ? match[2]: p))
                    }
                    if(event.data.indexOf(audioid) !== -1 && audioid !== 0){
                        setaudiopercent((p) => parseFloat(match[2] !== "NaN" ? match[2]: p))
                        setdwnspeed(match[1])
                        setaudiomsg((pre) => pre +`audioId: ${audioid}, downlodspeed: ${match[1]}, downloadpercentage: ${match[2]} , downlaoded :${match[3]}, filesize: ${match[4] !== "NaN" ? match[4] : "nosize"}`)                    }
                    if(event.data === "wsclosed"){
                        socket.close();
                        console.error("connection closed")
                        setconnection(0)
                        setvideomsg(< Floatingmsg message ="web socket closed" msgtype ="success"/>)
                    }
                    
                }
                socket.onclose= () =>{
                    setconnection(0)
                }
                return () => {
                    socket.close();
                    setconnection(0)
                };
            }else{
                console.error("somting error please try again later")
            }
            console.log(connection)
            
        }catch(error){
            console.log(error)
        }
    }
    function Download(){
        setdownloadsure(0)
        downloadvideo()
    }

  return (
    <div className='finaldwn'>
        <p>Selected Formats : Video - {videoid} ,  Audio - {audioid} , Subtitle - {sublang}</p>
        {downloadsure ? <button className='dowbtn sure' onClick={()=> {Download()}}>Are u want Downlaod</button>:null}
        <h2> downloadspeed : {dwnspeed}</h2>
        <h2>Video download progress</h2>
        {/* <pre className='outputmsg'> {videomsg}</pre> */}
        <p className='progress' style={{width :`${videopercent}%`}}> {videopercent}</p>
        <h2>Audio download progress</h2>
        <p className='progress' style={{width :`${audiopercent}%`}}> {audiopercent}</p>
        {/* <pre className='outputmsg'> {auidomsg}</pre> */}
    </div>
  )
}
