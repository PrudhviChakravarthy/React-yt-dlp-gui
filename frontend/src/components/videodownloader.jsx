import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./videodownloader.css"
import Floatingmsg from './floatingmsg'

 


export default function VideoDownloader({url, videoid, audioid , sublang}) {
    const [connection , setconnection] = useState(0)
    const [videomsg , setvideomsg] = useState("")
    const [auidomsg , setaudiomsg] = useState("")
    const [videopercent, setvideopercent]  = useState(0)
    const [audiopercent, setaudiopercent]  = useState(0)

    const [videofilesize, setvideofilesize] = useState(0)
    const [videodwnsize, setvideodwnsize] = useState(0)
    const [audiodwnsize, setaudiodwnsize] = useState(0)
    const [audiofilesize, setaudiofilesize] = useState(0)
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
                        console.log("post processing failed")
                        setvideomsg(<Floatingmsg message= "post processing failed" msgtype ="error"/>)
                    }
                    if(event.data.indexOf(videoid) !== -1 && videoid !== 0){
                        setdwnspeed(match[1])
                        setvideofilesize(match[4])
                        setvideodwnsize(match[3])
                        setvideopercent((p) => parseFloat(match[2] !== "NaN" ? match[2]: p))
                    }
                    if(event.data.indexOf(audioid) !== -1 && audioid !== 0){
                        setaudiopercent((p) => parseFloat(match[2] !== "NaN" ? match[2]: p))
                        setdwnspeed(match[1])
                        setaudiofilesize(match[4])
                        setaudiodwnsize(match[3])
                    }
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
        <div className='downloadbox'>
            <p className='formatbox' >Selected Formats : Video - {videoid} ,  Audio - {audioid} , Subtitle - {sublang}</p>
            {downloadsure ? <button className='dowbtn sure' onClick={()=> {Download()}}>Are u want Downlaod</button>:<h2 className='dwnspeed'> downloadspeed : {dwnspeed}</h2>}
        </div>
        <div className='downloadbox'>
            <h2>Video download </h2>
            <p className='progress' style={{width :`${videopercent}%`}}> {videopercent}</p>
            <h2>{videodwnsize}/{videofilesize}</h2>
        </div>
        <div className='downloadbox'>
            <h2>Audio download progress</h2>
            <p className='progress' style={{width :`${audiopercent}%`}}> {audiopercent}</p>
            <h2>{audiodwnsize}/{audiofilesize}</h2>
        </div>

    </div>
  )
}
