'use client'

import { useEffect, useState } from 'react'

interface ProgressBarProps {
  isRouteChanging?: boolean
  progress?: number
  height?: number
  color?: string
  zIndex?: number
}

export default function ProgressBar({
  isRouteChanging = false,
  progress: externalProgress,
  height = 2,
  color = '#0070f3', // Default Next.js blue
  zIndex = 50,
}: ProgressBarProps) {
  const [progress, setProgress] = useState(0)

  // Handle scroll progress
  useEffect(() => {
    if (isRouteChanging || externalProgress !== undefined) return

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      
      if (scrollHeight > 0) {
        const calculatedProgress = (scrollTop / scrollHeight) * 100
        setProgress(calculatedProgress)
      }
    }

    // Initialize scroll position
    updateScrollProgress()

    // Add scroll event listener
    window.addEventListener('scroll', updateScrollProgress)
    
    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
    }
  }, [isRouteChanging, externalProgress])

  // Use external progress if provided
  useEffect(() => {
    if (externalProgress !== undefined) {
      setProgress(externalProgress)
    }
  }, [externalProgress])

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: `${height}px`,
        backgroundColor: 'rgba(229, 231, 235, 0.5)', // Light gray background
        zIndex,
      }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page progress"
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          backgroundColor: color,
          transition: isRouteChanging 
            ? 'width 0.2s ease-in-out'
            : 'width 0.1s ease-out',
        }}
      />
    </div>
  )
}