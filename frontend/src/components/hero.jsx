import './hero.css';
import rightarrow from "../assets/right-arrow.svg"
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="container">
      <main className="hero-content">
        <div className="hero-text">
          <h1>The one stop Yt-dlp gui downloder.</h1>
          <p>Download videos from multiple sites effortlessly. Select formats, view options, and save your favorite content with our easy-to-use tool.</p>
          <Link to="search">
            <button  className='boxesformat herobtn'>Download Media<img className='rightarrow' src={rightarrow}></img> </button>
          </Link>
        </div>
        <div className="hero-image">
          {/* Add your image or 3D animation here */}
        </div>
      </main>
    </div>
  );
}