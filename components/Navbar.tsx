'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { TbBrandX } from 'react-icons/tb'

export function Navbar() {
  const pathname = usePathname()

  const navItems = [
    // Removed the "Home" link
    // { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: "Writings", path: "/writings" },
    { name: "Favorites", path: "/favorites" },
    // Removed the "Life" link
    // { name: "Life", path: "/camcorders" },
  ]

  return (
    <nav className="flex items-center justify-between py-4 pt-8">
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
  )
}

