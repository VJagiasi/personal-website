"use client"

import Link from 'next/link';
import { motion } from "framer-motion";

interface Writing {
  id: string;
  title: string;
  slug: string;
  date?: string;
  description?: string;
}

interface WritingsClientProps {
  writings: Writing[];
}

export default function WritingsClient({ writings }: WritingsClientProps) {
  // Animation variants
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
      <motion.h1 className="text-2xl font-normal mb-16" variants={item}>
        Writing
      </motion.h1>
      
      {writings.length === 0 ? (
        <motion.p className="text-neutral-500" variants={item}>Coming soon...</motion.p>
      ) : (
        <div className="space-y-16">
          {writings.map((writing) => (
            <motion.div 
              key={writing.id} 
              className="space-y-2 border-b border-dotted border-neutral-300 pb-4" 
              variants={item}
            >
              <h2 className="text-xl font-normal">
                <Link 
                  href={`/writings/${writing.slug}`}
                  className="font-normal text-inherit decoration-dotted decoration-neutral-400 underline underline-offset-4 hover:decoration-neutral-800 transition-colors"
                >
                  {writing.title}
                </Link>
              </h2>
              <p className="text-neutral-500 text-sm">
                {writing.date}
              </p>
              {writing.description && (
                <ul className="space-y-2 mt-4">
                  <li className="text-neutral-800 pl-4 relative">
                    <span className="absolute left-0 top-[0.5em] w-1 h-1 bg-neutral-300 rounded-full" />
                    {writing.description}
                  </li>
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.main>
  );
} 