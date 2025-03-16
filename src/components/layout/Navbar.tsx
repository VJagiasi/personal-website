'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { TbBrandX } from 'react-icons/tb'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    // Removed the "Home" link
    // { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: "Writings", path: "/writings" },
    { name: "Favorites", path: "/favorites" },
    // Removed the "Life" link
    // { name: "Life", path: "/camcorders" },
  ]

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -8,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    closed: { opacity: 0, x: -8 },
    open: { opacity: 1, x: 0 }
  }

  return (
    <>
      {/* Mobile Navigation */}
      <nav className="md:hidden relative z-50">
        <motion.div 
          initial={false}
          className="flex justify-between items-center px-6 py-6"
        >
          <Link href="/" className="text-xl font-bold">
            Vihaan Jagiasi
          </Link>
          <motion.button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 -mr-1 text-muted-foreground hover:text-foreground rounded-md hover:bg-neutral-100 transition-colors"
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            <RxHamburgerMenu size={20} />
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="absolute top-[calc(100%-0.5rem)] left-0 right-0 bg-background/80 backdrop-blur-lg shadow-lg border-y border-neutral-200/50"
            >
              <motion.div className="flex flex-col py-2">
                {navItems.map((item) => (
                  <motion.div key={item.path} variants={itemVariants}>
                    <Link
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-sm block py-3.5 px-6 transition-colors ${
                        pathname === item.path 
                          ? "text-foreground font-medium" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div 
                  variants={itemVariants}
                  className="flex gap-2 py-3.5 mt-1 px-6 border-t border-neutral-200/50"
                >
                  <a 
                    href="https://github.com/Vjagiasi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-md hover:bg-neutral-100 transition-colors"
                  >
                    <FaGithub className="text-muted-foreground hover:text-foreground" size={18} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/vihaanjagiasi/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-md hover:bg-neutral-100 transition-colors"
                  >
                    <FaLinkedin className="text-muted-foreground hover:text-foreground" size={18} />
                  </a>
                  <a 
                    href="https://x.com/VihaanJagiasi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-md hover:bg-neutral-100 transition-colors"
                  >
                    <TbBrandX className="text-muted-foreground hover:text-foreground" size={18} />
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-between py-4 pt-8">
        <Link href="/" className="text-3xl font-bold">
          Vihaan Jagiasi
        </Link>
        <div className="flex gap-4 items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm ${
                pathname === item.path ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex gap-2">
            <a href="https://github.com/Vjagiasi" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-muted-foreground hover:text-foreground" size={20} />
            </a>
            <a href="https://www.linkedin.com/in/vihaanjagiasi/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-muted-foreground hover:text-foreground" size={20} />
            </a>
            <a href="https://x.com/VihaanJagiasi" target="_blank" rel="noopener noreferrer">
              <TbBrandX className="text-muted-foreground hover:text-foreground" size={20} />
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}

