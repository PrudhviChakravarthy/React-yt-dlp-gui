import {React ,useState} from 'react'
import axios from 'axios'
import "./searchbutton.css"
import Loading from './loading'
import Videodetails from './videodetails'
import Floatingmsg from './floatingmsg'




export default function SearchButton() {

  const [link , setlink] = useState("")
  const [videodetails, setvideodetails] = useState(0)
  const [loading , setloading] = useState(0)
  const [message, setmessage] = useState("")
  const [msgtype, setmsgtype] = useState("")

  async function getvideolink(){
    if (link.length < 10){
      setmessage("No Video link.")
      setmsgtype("error")
    }else if (loading){
      setmessage("Loading plase wait")
      setmsgtype("error")
    }else{
      try{
        setloading(true)
        const response = await axios.post("http://localhost:4003/api/video/details",{"videourl":link})
        if(response.status === 200){
          setvideodetails(response.data)
        }
      }catch (error){
        setmessage("Invalid Link")
        setmsgtype("error")
      }finally{
        setloading(false)
      }
  }
    setTimeout(() => {
      setmessage(null);
      setmsgtype(null);
    }, 3000); //
  }

  function linkset(e){
    setlink(e.target.value)
  }

  function clearsearch(){
    setvideodetails("")
    setlink("")
  }

  return (
    <>
    <div  className='search'>
        <input 
          className='searchbox'
          placeholder='Paste Your Video link here'
          value={link}
          onChange={linkset}
          ></input>
          <div className='clear' onClick={clearsearch}><p>Clear</p></div>
          <button onClick={getvideolink} className='searchbtn'>Search</button>
    </div>
    <div className='maincontent'>
    {loading ?<Loading/> : videodetails 
    ?<Videodetails  url ={link} metadata={videodetails.metadata} audioformats = {videodetails.audioformats} videoformats = {videodetails.videoformats} subtitles = {videodetails.subtitles} />:<h1>Main page here</h1>}
    {message && msgtype ? <Floatingmsg message= {message} msgtype = {msgtype} time ="10" />:null}
    </div>
    </>
  )
}
