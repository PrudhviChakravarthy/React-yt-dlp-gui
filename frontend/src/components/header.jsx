import "./header.css"
import logo from "../assets/logo.svg"
import gitlogo from "../assets/github-logo.svg"

export default function Header() {
  return (
    <div className='mainheader'>
      <div  className='logosection'>
        <img src={logo} alt="" />
      </div>
      <div className='options'>
        <div>Downlaods</div>
        <div className="gitlogo">
          <img  src={gitlogo} alt="" />
        </div>
        <div>donate</div>
      </div>
    </div>

  )
}
