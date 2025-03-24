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
      <motion.h1 className="text-2xl font-normal mb-8" variants={item}>
        Principles
      </motion.h1>

      <motion.p className="text-m text-neutral-600 italic mb-4" variants={item}>
        I live by these few principles. Note: this list is not complete yet
      </motion.p>
      
      <div className="space-y-8">
        <motion.div className="space-y-2 border-b border-dotted border-neutral-300 pb-4" variants={item}>
          <p className="text-base leading-relaxed text-neutral-800 pl-4 relative">
          <span className="font-semibold decoration-dotted decoration-neutral-400 underline underline-offset-4 hover:decoration-neutral-800 transition-colors">1. betting on myself: </span>
            <span className="absolute left-0 top-[0.5em] w-1 h-1 bg-neutral-300 rounded-full" />
            i don't give a shit if every single person i know stops believing in me. As long as I do - I'm good. The day I stop, I'm better off dead.
          </p>
        </motion.div>

        <motion.div className="space-y-2 border-b border-dotted border-neutral-300 pb-4" variants={item}>
          <p className="text-base leading-relaxed text-neutral-800 pl-4 relative">
          <span className="font-semibold decoration-dotted decoration-neutral-400 underline underline-offset-4 hover:decoration-neutral-800 transition-colors">2. I don't believe in talent: </span>
            <span className="absolute left-0 top-[0.5em] w-1 h-1 bg-neutral-300 rounded-full" />
            if you have a fully functional body—two hands, two legs, two eyes, two ears, and so on—you can pretty much achieve anything you want. if you still think you're not capable enough - you're just making excuses to feel better about yourself.
          </p>
        </motion.div>

        <motion.div className="space-y-2 border-b border-dotted border-neutral-300 pb-4" variants={item}>
          <p className="text-base leading-relaxed text-neutral-800 pl-4 relative">
          <span className="font-semibold decoration-dotted decoration-neutral-400 underline underline-offset-4 hover:decoration-neutral-800 transition-colors">3. doing too much: </span>
            <span className="absolute left-0 top-[0.5em] w-1 h-1 bg-neutral-300 rounded-full" />
            in initial stages when starting off or learning something new as a complete beginner you shouldn’t worry too much about where to begin or what resources to use - you should care more about how much should you be doing and if you’re even doing enough?
          </p>
        </motion.div>

        <motion.div className="space-y-2 border-b border-dotted border-neutral-300 pb-4" variants={item}>
          <p className="text-base leading-relaxed text-neutral-800 pl-4 relative">
          <span className="font-semibold decoration-dotted decoration-neutral-400 underline underline-offset-4 hover:decoration-neutral-800 transition-colors">4. whatever it takes, get it done: </span>
            <span className="absolute left-0 top-[0.5em] w-1 h-1 bg-neutral-300 rounded-full" />
            there is no excuse. if you didn’t get the thing done it’s not cause of x,y and z reasons - it’s cause you didn’t want it bad enough and that’s okay but say that with a straight face - don’t lie to me and be like this thing got in the way - no it’s just cause you didn’t want it bad enough that's it.
          </p>
        </motion.div>

        <motion.div className="space-y-2 border-b border-dotted border-neutral-300 pb-4" variants={item}>
          <p className="text-base leading-relaxed text-neutral-800 pl-4 relative">
          <span className="font-semibold decoration-dotted decoration-neutral-400 underline underline-offset-4 hover:decoration-neutral-800 transition-colors">5. don't tolerate bullshit: </span>
            <span className="absolute left-0 top-[0.5em] w-1 h-1 bg-neutral-300 rounded-full" />
            this speaks for itself - no matter what you do - do not ever tolerate bullshit from anyone - i value and respect my time more than anything else and if someone doesn’t - i’m don’t give a shit about them.
          </p>
        </motion.div>
      </div>
    </motion.main>
  )
}