"use client"

export default function FavoritesPage() {
  return (
    <main className="py-12 max-w-2xl">
      <h1 className="text-2xl font-normal mb-8">Favorites</h1>
      <ul className="space-y-4">
        <li>
          <a
            href="https://jsomers.net/blog/speed-matters"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base leading-relaxed text-muted-foreground underline decoration-dotted hover:text-foreground"
          >
            Speed Matters by James Somers
          </a>
        </li>
        <li>
          <a
            href="https://www.lennysnewsletter.com/p/how-to-consistently-go-viral-nikita-bier"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base leading-relaxed text-muted-foreground underline decoration-dotted hover:text-foreground"
          >
            How to Consistently Go Viral by Nikita Bier
          </a>
        </li>
      </ul>
    </main>
  )
}

