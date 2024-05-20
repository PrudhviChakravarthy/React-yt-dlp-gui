import "./header.css"
import logo from "../assets/logo.svg"
import gitlogo from "../assets/github-logo.svg"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <div className='mainheader'>
      <div  className='logosection'>
        <Link to="/">
        <img className="headerlogo" src={logo} alt="" />
        </Link>
      </div>
      <div className='options'>
        <a href="#howto">
          <p>How to use?</p>
        </a>
        <a href="#supportedsites">
          <p>Supported Sites</p>
        </a>
        <p>donate</p>
        <a  target="_blank" href="https://github.com/PrudhviChakravarthy/React-yt-dlp-gui">
          <div className="gitlogo">
            <img   src={gitlogo} alt="" />
            <p>/React-yt-dlp-gui</p>
          </div>
        </a>
      </div>
    </div>

  )
}
