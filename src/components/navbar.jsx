import React, {useState, useEffect} from 'react';
import { Link } from 'react-scroll';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const changetheme = () => {
    if(theme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  useEffect(() => {
    if(theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme]);
 
  
  return (
    <div
      className="flex justify-around items-center bg-background dark:bg-white h-28 p-7 top-0">
          <h2 className="text-3xl text-white dark:text-black font-rubik font-bold">Home</h2>
          <ul className="flex justify-center text-xl text-white dark:text-black font-bold font-rubik gap-4">
              <div className="transition hover:-translate-y-1 hover: motion-reduce:transition-none motion-reduce:hover:transform-none hover:text-yellow-400">
                <li><Link to="about" spy={true} smooth={true} className="text-2xl">About</Link></li>
              </div>
              <div className="transition hover:-translate-y-1 hover: motion-reduce:transition-none motion-reduce:hover:transform-none hover:text-yellow-400">
                <li><Link to="experience" spy={true} smooth={true} className="
                text-2xl">Experience</Link></li>
              </div>
              <div className="transition hover:-translate-y-1 hover: motion-reduce:transition-none motion-reduce:hover:transform-none hover:text-yellow-400">
                <li><Link to="contact" spy={true} smooth={true} className="
                text-2xl">Contact</Link></li>
              </div>
              <div className="transition hover:-translate-y-1 hover: motion-reduce:transition-none motion-reduce:hover:transform-none hover:text-yellow-400">
                <button type="button" onClick={changetheme} className="ml-4">
                  <FontAwesomeIcon icon={theme === "dark"? faMoon:faSun} size="xl"></FontAwesomeIcon>
                  </button>
              </div>
          </ul>
    </div>
  )
}

export default Navbar