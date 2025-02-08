"use client"

import { motion } from "framer-motion"

export default function Page() {
  const container = {
    show: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const section = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  }

  return (
    <motion.main className="py-12 px-6 md:px-0 space-y-16" variants={container} initial="hidden" animate="show">
      <motion.section className="prose prose-neutral dark:prose-invert space-y-4" variants={section}>
        <motion.p className="text-base leading-relaxed" variants={item}>
          Engineer @{" "}
          <a
            href="https://www.ordergrid.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-normal text-inherit decoration-dotted decoration-neutral-400 underline underline-offset-4 hover:decoration-neutral-800 transition-colors"
          >
            Ordergrid
          </a>{" "}
          working in the intersection of AI, Product and Design

        </motion.p>
        <motion.p className="text-base leading-relaxed" variants={item}>
          Currently a junior at Waterloo and running growth for{" "}
          <a
            href="https://www.perplexity.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-normal text-inherit decoration-dotted decoration-neutral-400 underline underline-offset-4 hover:decoration-neutral-800 transition-colors"
          >
            Perplexity
          </a>{" "}
          and building software for nonprofits at{" "}
          <a
            href="https://uwblueprint.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-normal text-inherit decoration-dotted decoration-neutral-400 underline underline-offset-4 hover:decoration-neutral-800 transition-colors"
          >
            UWBlueprint
          </a>
          .
        </motion.p>
        {/* <motion.p className="text-base leading-relaxed" variants={item}>
        Building AI-powered solutions to transform food retail and distribution—streamlining operations, optimizing inventory, and driving sustainable growth.
        </motion.p> */}
        <motion.p className="text-base leading-relaxed" variants={item}>
          Based out of Waterloo but currently in Boston working remotely. Reach out if you&apos;re in Boston and
          building something would love to meetup
        </motion.p>
        
        <motion.p className="text-base leading-relaxed" variants={item}>
          I mix music, make short films on camcorders, and write occasionally.
        </motion.p>
        <motion.p className="text-base leading-relaxed" variants={item}>
          Reach out to me at{" "}
          <a
            href="mailto:vihaan@jagiasi.com"
            className="font-normal text-inherit decoration-dotted decoration-neutral-400 underline underline-offset-4 hover:decoration-neutral-800 transition-colors"
          >
            vihaan@jagiasi.com
          </a>{" "}
          or{" "}
          <a
            href="https://x.com/VihaanJagiasi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-normal text-inherit decoration-dotted decoration-neutral-400 underline underline-offset-4 hover:decoration-neutral-800 transition-colors"
          >
            Twitter
          </a>
        </motion.p>
      </motion.section>

      {/* <motion.section variants={section}>
        <motion.h2 className="mb-8 text-lg font-normal" variants={item}>
          Work
        </motion.h2>
        <div className="space-y-4">
          {[
            {
              name: "Ordergrid",
              role: "Engineering",
              year: "Present",
              logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ordergrid%20logo-sd5dYMtBuqCupFk7jfjBHVWSi3TDXt.png",
            },
            {
              name: "Perplexity",
              role: "Growth",
              year: "Present",
              logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/perplexity%20logo-IVP5UO3aBacgiJ5lSL1f0zvSpUKR0z.png",
            },
            {
              name: "UW Blueprint",
              role: "Engineering",
              year: "Present",
              logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blueprint-logo-ReyE7t8qVkXvmeCJHvOPYElGcx269S.png",
            },
            {
              name: "BDO",
              role: "Engineering",
              year: "2024",
              logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bdo%20logo-t8fjDGflnFrW8hTkOZoOxHdPcOEFPw.png",
            },
            {
              name: "Develop for Good",
              role: "Engineering",
              year: "2024",
              logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/develop%20for%20good%20logo-V8BuO6f3GoZlFRothgWvZB0aBjr6l5.jpeg",
            },
            {
              name: "WatStreet",
              role: "Engineering",
              year: "2024",
              logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/watstreet%20logo-E8T8et7bSAdFfbNpA6HwL7Tza9qDjp.jpeg",
            },
            {
              name: "Cognext AI",
              role: "Engineering",
              year: "2023",
              logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cognext%20ai%20logo.jpg-sl2gYjEH3YxiDP2GeYr6RAil7NQJ7g.jpeg",
            },
          ].map((company, i) => (
            <motion.div key={company.name} className="group flex items-center justify-between " variants={item}>
              <div className="flex items-center gap-2">
                <div className="relative h-6 w-6 shrink-0 rounded bg-neutral-50">
                  <img
                    src={company.logo || "/placeholder.svg"}
                    alt={`${company.name} logo`}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="font-normal">{company.name}</span>
                <span className="text-sm text-muted-foreground">{company.role}</span>
              </div>
              <span className="text-sm text-muted-foreground">{company.year}</span>
            </motion.div>
          ))}
        </div>
      </motion.section> */}
    </motion.main>
  )
}

