import { useState } from "react"
import Header from "../components/header"
import "./mainpage.css"
import Hero from "../components/hero"

export default function Mainpage() {
  const [login ,setlogin] = useState(0)
  return (
    <>
      <header>
        <Header/>
      </header>
      <main>
        <Hero/>
      </main>
      <footer>

      </footer>
    </>
  )
}
