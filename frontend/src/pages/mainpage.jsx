import { useState } from "react"
import "./mainpage.css"
import Hero from "../components/hero"
import Supportedsites from "../components/supportedsites"

export default function Mainpage() {
  const [login ,setlogin] = useState(0)
  return (
    <>
    <div className="emptydiv"></div>
    <div></div>

      <main>
        <Hero/>
        <Supportedsites/>
      </main>
      <footer>

      </footer>
    </>
  )
}
