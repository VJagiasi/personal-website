'use client'

import { motion } from "framer-motion"

export default function PrinciplesPage() {
  const container = {
    show: {
      transition: {
        staggerChildren: 0.2,
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
    <motion.main 
      className="py-12 px-6 md:px-0 max-w-2xl"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.h1 className="text-2xl font-normal mb-6" variants={item}>
        Principles
      </motion.h1>
      
      <motion.p className="text-m text-neutral-600 italic mb-16" variants={item}>
        * Note: I keep iterating these often based on different learnings through instances in my day to day.
      </motion.p>
      
      <div className="space-y-16">
        <motion.div className="space-y-2 border-b border-dotted border-neutral-300 pb-4" variants={item}>
          <h4 className="text-xl font-normal">1. betting on myself</h4>
          <p className="text-neutral-800 pl-4 relative mt-4">
            <span className="absolute left-0 top-[0.5em] w-1 h-1 bg-neutral-300 rounded-full" />
            i don't care if every single person on this planet—including my family, my friends, and everyone i know stops believing in me. As long as I do - I don't give a shit. The day I stop -  I'm better off dead.
          </p>
        </motion.div>

        <motion.div className="space-y-2 border-b border-dotted border-neutral-300 pb-4" variants={item}>
          <h2 className="text-xl font-normal">2. I don't believe in talent or anyone being born smarter than anyone</h2>
          <p className="text-neutral-800 pl-4 relative mt-4">
            <span className="absolute left-0 top-[0.5em] w-1 h-1 bg-neutral-300 rounded-full" />
            if you have a fully functional body—two hands, two legs, two eyes, two ears, and so on—you can pretty much achieve anything you want. if you still think you're not capable enough - you're just making excuses to feel better about yourself. stop looking for self validation.
          </p>
        </motion.div>
      </div>
    </motion.main>
  )
}