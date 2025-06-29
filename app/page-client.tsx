"use client"

import { motion } from "framer-motion"

interface ClientPageProps {
  thoughts: string[];
}

export default function ClientPage({ thoughts }: ClientPageProps) {
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
    <motion.main className="py-12 px-6 md:px-0 space-y-12" variants={container} initial="hidden" animate="show">
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
          building AI-powered inventory systems to optimize operations for food retailers and distributors.
        </motion.p>
        <motion.p className="text-base leading-relaxed" variants={item}>
          Currently a junior at Waterloo running growth for{" "}
          <a
            href="https://www.perplexity.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-normal text-inherit decoration-dotted decoration-neutral-400 underline underline-offset-4 hover:decoration-neutral-800 transition-colors"
          >
            Perplexity
          </a>{" "}
          and{" "}
          <a
            href="https://mercor.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-normal text-inherit decoration-dotted decoration-neutral-400 underline underline-offset-4 hover:decoration-neutral-800 transition-colors"
          >
            Mercor {""}
          </a>
           on campus and building software for nonprofits at{" "}
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
        <motion.p className="text-base leading-relaxed" variants={item}>
          Based out of Waterloo but currently in Boston working remote.
        </motion.p>
        
        <motion.p className="text-base leading-relaxed" variants={item}>
          I mix music, make short films on camcorders, and write sometimes.
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

      <motion.section variants={section} className="mt-12">
        <motion.h2 className="text-[17px] font-normal mb-2" variants={item}>
          Observations:
        </motion.h2>
        <motion.ul className="list-none pl-6 space-y-1">
          {thoughts.map((thought, index) => (
            <motion.li
              key={index}
              variants={item}
              className="flex items-start gap-3 text-[17px] leading-relaxed text-neutral-900"
            >
              <span className="block min-w-[5px] h-[5px] mt-[0.6em] bg-black rounded-full" />
              {thought}
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>
    </motion.main>
  )
} 