import "./header.css"
import logo from "../assets/logo.svg"
import gitlogo from "../assets/github-logo.svg"
import { Link } from "react-router-dom"
import SearchButton from "./searchbutton"

export default function Header() {
  return (
    <div className='mainheader'>
      <div  className='logosection'>
        <Link to="/">
        <img className="headerlogo" src={logo} alt="" />
        </Link>
      </div>
      <SearchButton/>
      <div className='options'>
        <a  target="_blank" rel="noreferrer" href="https://github.com/PrudhviChakravarthy/React-yt-dlp-gui">
          <div className="gitlogo">
            <img   src={gitlogo} alt="" />
            <p>/React-yt-dlp-gui</p>
          </div>
        </a>
        <p>donate</p>
      </div>
    </div>

  )
}
