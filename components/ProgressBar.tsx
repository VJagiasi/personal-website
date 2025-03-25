'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

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
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()
  const targetProgressRef = useRef(0)
  
  // Optimized scroll tracking with less throttling for faster response
  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.scrollY
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    
    if (scrollHeight > 0) {
      targetProgressRef.current = (scrollTop / scrollHeight) * 100
    }
  }, [])
  
  // Enhanced animation with faster response times
  const animateProgress = useCallback((time: number) => {
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time
    }
    
    const deltaTime = time - (previousTimeRef.current || 0)
    previousTimeRef.current = time
    
    const currentProgress = progress
    const targetProgress = externalProgress !== undefined ? externalProgress : targetProgressRef.current
    const difference = targetProgress - currentProgress
    
    // Ultra-responsive easing factors 
    // Base easing is faster for immediate response
    let easing = 0.2
    
    // Even faster for large movements
    if (Math.abs(difference) > 5) easing = 0.3
    
    // Almost instant for route changes
    if (isRouteChanging) easing = 0.4
    
    // Only update for meaningful changes to reduce unnecessary re-renders
    if (Math.abs(difference) > 0.01) {
      setProgress(currentProgress + difference * easing)
    }
    
    requestRef.current = requestAnimationFrame(animateProgress)
  }, [progress, externalProgress, isRouteChanging])
  
  // Optimized scroll handling with minimal latency
  useEffect(() => {
    if (isRouteChanging || externalProgress !== undefined) {
      targetProgressRef.current = externalProgress || 0
    } else {
      // Initial calculation for immediate feedback
      updateScrollProgress()
      
      // Use both scroll and wheel events for maximum responsiveness
      // Wheel event gives faster response on trackpads
      const wheelHandler = () => {
        updateScrollProgress()
      }
      
      // Minimal throttling (5ms) for scroll events
      let lastScrollTime = 0
      const scrollHandler = () => {
        const now = Date.now()
        if (now - lastScrollTime > 5) {
          lastScrollTime = now
          updateScrollProgress()
        }
      }
      
      window.addEventListener('wheel', wheelHandler, { passive: true })
      window.addEventListener('scroll', scrollHandler, { passive: true })
      
      return () => {
        window.removeEventListener('wheel', wheelHandler)
        window.removeEventListener('scroll', scrollHandler)
      }
    }
  }, [updateScrollProgress, isRouteChanging, externalProgress])
  
  // Animation setup with high priority
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateProgress)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [animateProgress])

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: `${height}px`,
        backgroundColor: 'rgba(25, 25, 25, 0.1)', // Darker, more modern background
        zIndex,
        pointerEvents: 'none',
        overflow: 'hidden',
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
          borderRadius: '0 2px 2px 0',
          willChange: 'transform, width',
          transformOrigin: 'left',
          transition: 'none',
          boxShadow: isRouteChanging 
            ? `0 0 10px ${color}, 0 0 5px ${color}` // Glowing effect for route changes
            : 'none',
        }}
      />
    </div>
  )
}