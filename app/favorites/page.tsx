"use client"

export default function FavoritesPage() {
  return (
    <main className="py-12 px-6 md:px-0 max-w-2xl font-mono">
      <h1 className="text-2xl mb-8">Favorites</h1>
      
      <div className="space-y-12">

        <section>
          <h2 className="text-xl mb-2">
            Blogs & Articles
          </h2>
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
            <li>
              <a
                href="https://x.com/chrishlad/status/1863919588666220764/photo/1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base leading-relaxed text-muted-foreground underline decoration-dotted hover:text-foreground"
              >
                Why Travis Kalanick is a winner
              </a>
            </li>
            <li>
              <a
                href="https://patrickcollison.com/advice"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base leading-relaxed text-muted-foreground underline decoration-dotted hover:text-foreground"
              >
                Advice for ambitious teenagers by Patrick Collison
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl mb-2">
            Videos
          </h2>
          <ul className="space-y-4">
            <li>
              <a
                href="https://www.youtube.com/watch?v=jG7dSXcfVqE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base leading-relaxed text-muted-foreground underline decoration-dotted hover:text-foreground"
              >
                DO WHAT YOU CAN'T by Casey Neistat
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  )
}

