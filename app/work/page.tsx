"use client"

import { motion } from "framer-motion"

export default function WorkPage() {
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
    <motion.main className="py-12 px-6 md:px-0 max-w-2xl" variants={container} initial="hidden" animate="show">
      <motion.h1 className="text-2xl font-normal mb-16" variants={item}>
        Work
      </motion.h1>
      <div className="space-y-16">
        {[
        {
            company: "Ordergrid",
            role: "Software Engineering Intern",
            date: "Jan 2025  Present",
            achievements: [
              "Building AI-powered solutions to transform food retail and distribution",
            ],
          },
          {
            company: "BDO",
            role: "Software Engineering Intern",
            date: "May 2024 – Aug 2024",
            achievements: [
              "Built an IaC framework in Python and TypeScript to automate AWS infrastructure, cutting manual provisioning by 78% and boosting dev efficiency by 57%.",
              "Integrated AI-driven resource management to automatically scale services and reduce cloud spend by 30%.",
              "Developed 10+ Python-based data center tools, adopted by 50+ financial institutions for scalable operations.",
            ],
          },
          {
            company: "UWBlueprint",
            role: "Software Engineer",
            date: "2024-Present",
            achievements: [
              "Collaborating with 13 developers and designers on an open-source platform offering music education to 500+ underserved students.",
              "Scoping and executing an end-to-end application processing system, saving hours of planning and coordination for 50+ teachers at Sistema Toronto.",
            ],
          },
          {
            company: "WatStreet",
            role: "Software Engineer",
            date: "Feb 2024 - Aug 2024 ",
            achievements: [
              "Development of an algorithmic trading backtesting application, integrating stock and crypto data APIs in Next.js.",
              "Visualized TensorFlow deep learning model simulations with custom React graphing components.",
              "Shipped 8 new features, boosting overall platform performance by 40% and adding advanced trading algorithms.",
            ],
          },
          {
            company: "CogNext AI",
            role: "Software Engineering Intern",
            date: "May 2023 – Aug 2023",
            achievements: [
              "Migrated key dashboard features to GraphQL, improving load times by 47% for 10,000+ users.",
              "Revamped TypeScript development with a monorepo-based workflow, slashing rebuild times by 97%.",
              "Implemented a Passport.js SSO service in Node.js/Express, cutting login overhead by 73% and streamlining authentication.",
            ],
          },
          {
            company: "BayCream",
            role: "Software Engineering Intern",
            date: "Oct 2020 – Feb 2021",
            achievements: [
              "Created a dynamic payment library with Stripe fallback, ensuring 100% transaction uptime and recovering $80,000 in sales during outages.",
              "Drove a 47% sales increase via automated Python email receipts, enhancing customer engagement and product promotion.",
            ],
          },
        ].map((job) => (
          <motion.div key={job.company} className="space-y-2 border-b border-dotted border-neutral-300 pb-4" variants={item}>
            <h2 className="text-xl font-normal">{job.company}</h2>
            <p className="text-neutral-500 text-sm">
              {job.role}, {job.date}
            </p>
            <ul className="space-y-2 mt-4">
              {job.achievements.map((achievement, index) => (
                <li key={index} className="text-neutral-800 pl-4 relative">
                  <span className="absolute left-0 top-[0.5em] w-1 h-1 bg-neutral-300 rounded-full" />
                  {achievement}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.main>
  )
}

