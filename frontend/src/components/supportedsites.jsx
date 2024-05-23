import "./supportedsites.css"
import rightarrow from "../assets/right-arrow.svg"
 

const importimg = (r) => r.keys().map(r)
const images = importimg(require.context("../assets/logos",true,/\.(png)$/))
console.log(images)

export default function Supportedsites() {
  return (
    <div id="supportedsites" className="sites">
                <div className="supportedlogos">
            <div className="suplogos">
                {images.map((image, index) =>(
                    <img className="supportlogos" key={index} src={image}></img>
                ))}
            </div>
            <div>
                <a target="_blank" href="https://raw.githubusercontent.com/yt-dlp/yt-dlp/master/supportedsites.md">
                    <button className="boxesformat sitesbtn">+1500 sites* <img style={{width:"30px"}} src={rightarrow} alt="" /></button>
                </a>
            </div>
        </div>
        <div className="sitestext">
            <h2>Supported sites</h2>
            <p>Access 1500+ websites for media downloads, including Facebook, Twitter, Instagram, YouTube, and more. Enjoy high-quality downloads and a user-friendly experience with our secure platform.</p>
        </div>

    </div>
  )
}
