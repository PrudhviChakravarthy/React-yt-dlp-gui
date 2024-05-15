import React, { useEffect, useState } from 'react'
import "./videodetails.css"
import VideoDownlaoder from './videodownloader'
import Floatingmsg from './floatingmsg'



export default function Videodetails(props) {
    const [metadata, setmetadata]  = useState(0)
    const [audioid, setaudioid]  = useState(0)
    const [videoid, setvideoid]  = useState(0)
    const [subtitles, setsubtitles]  = useState(0)
    const [download, setdownload] = useState(0)
    const [floatmsg, setfloatmsg] = useState(0)
    const [videoresolution , setvideoresolution] =useState({})
    const [sure, setsure]  = useState({})
     useEffect(()=>{
        setmetadata(props.metadata)
        setvideoresolution(props.videoformats)
    },[])
    function audioidset(key) {
        if(audioid === key){
            setaudioid(0)
        }else{
            setaudioid(key)
        }
    }
    function subtitileset(key) {
        if(subtitles === key){
            setsubtitles(0)
        }else{
            setsubtitles(key)
        }
    }
    function videoidset(key) {
        if(videoid === key){
            setvideoid(0)
        }else{
            setvideoid(key)
        }
    }

    function formatcheck(){
        if(!videoid && !audioid){
            setfloatmsg(<Floatingmsg message="No formats set" msgtype = "warning"/>)
            setTimeout(() => {
                setfloatmsg(0)
            }, 3000);
        }else{
            setdownload(1)
            setsure(
                <>
                    <VideoDownlaoder  url={props.url} audioid={audioid} videoid = {videoid} sublang = {subtitles} />
                </>)
        }
    }

    function cancel(){
        setdownload(0)
        setvideoid(0)
        setsubtitles(0)
        setaudioid(0)
        setsure(0)
    }


  return (
    <>
    {/* <button className='boxesformat' onClick={filtervideoresolution}>Filter formats</button> */}
    {floatmsg ? floatmsg : null}
    {metadata ? (
        <>
            <div className='metadata'>
                <img className='thumbimg' src={"http://localhost:4003/api/image/stream?url="+metadata.thumb} alt="" />
                <div className='videodetails'>
                    <h1 className='titlename'>{metadata.title}</h1>
                    <p>Duration : {metadata.duration} </p>
                    <p>Views : {metadata.viewcount}</p>
                    <p>Likes : {metadata.likecount} </p>
                </div>
            </div>
        </>):null}

    {!download ?(
        <>
            <div className='formats'>
                {Object.keys(props.audioformats).length  ? 
                <div className='formatdetails'>
                    <h2>Audio Formats:</h2>
                        {Object.keys(props.audioformats).map((key, index) => (
                            <div onClick={() => (audioidset(key))} className={audioid !== key ? "boxesformat": " audiobox boxesformat active"} key={key}>
                                <p className='filesizep'>{props.audioformats[key].filesize?props.audioformats[key].filesize:<>No_file_size</>}</p>
                                <p className='extensionp'>.{props.audioformats[key].extension}</p>
                                <p className='language'>({props.audioformats[key].language})</p>
                            </div>
                        ))}
                </div>:null}
                {Object.keys(videoresolution).length  ?
                <div className='formatdetails'>
                    <h2>Video Formats:</h2>
                        {Object.keys(videoresolution).map((resolution, index) => (
                            <>
                            <h3>{resolution}p</h3>
                            {(videoresolution[resolution]).map((key, index) => (
                                <div onClick={()=> {videoidset(videoresolution[resolution][index].formatid)}} className={videoid !== videoresolution[resolution][index].formatid ? "boxesformat": "boxesformat active"} key={videoresolution[resolution].formatid}>
                                    <p className='formatp'>{videoresolution[resolution][index].resolution}p</p>
                                    <p className='filesizep'>{videoresolution[resolution][index].filesize? videoresolution[resolution][index].filesize:<>No_file_size</>}</p>
                                    <p className='audiosbl'>{videoresolution[resolution][index].audio_channels ?<>&#128266;</>: <>&#x1F507;</> }</p>
                                    <p className='dynamicp'>{videoresolution[resolution][index].dynamic_range}</p>
                                    <p className='extensionp'>.{videoresolution[resolution][index].extension}</p>
                                </div>
                    ))}
                        </>))}
                </div>:null}
                {Object.keys(props.subtitles).length ? 
                <div className='formatdetails'>
                    <h2>Subtitles Available:</h2>
                            {Object.keys(props.subtitles).map((key, index) => (
                            <div onClick={()=> {subtitileset(key)}} className={subtitles !== key ? "boxesformat": "boxesformat active"} key={key}>
                                <p className='sublang'>{props.subtitles[key]}</p>
                            </div>
                    ))}
                </div>:null}
            </div>
            <div className='selected'>Selected Formats {videoid} + {audioid} + {subtitles}</div>
            <button onClick={() => {formatcheck()}} style={{backgroundColor:"lightgreen"}} className='boxesformat'>Submit</button>
        </>
            ):(<>
            <button className='boxesformat' onClick={cancel}> Back </button>
            {sure}
            </>) }
    {/* <VideoDownlaoder /> */}

    </>)
}
