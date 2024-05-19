import React, { useEffect, useState } from 'react'
import "./floatingmsg.css"

export default function Floatingmsg(props) {
    const [visible, setvisible]  = useState(0)
    useEffect(()=>{
      function setboxvisble(){
        setvisible(1)
        setTimeout(() => {
          setvisible(0)
        }, 3000);
      }
        setboxvisble()
    },[])

  return (
    <>
    {visible ?(
    <div style={{animation: `floatbox ${props.time ? props.time: 4}s cubic-bezier(0,.73,.94,.87)`}} className={'floatingbox '+props.msgtype}>
        <p>{props.message}</p>
    </div>
          ):null}
    </>
  )
}
