'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { createContext, useContext, useEffect, useState, useRef } from 'react'
import ProgressBar from './ProgressBar'

interface NavigationProgressContextType {
  isRouteChanging: boolean
  progressValue: number
  startProgress: () => void
  completeProgress: () => void
}

const NavigationProgressContext = createContext<NavigationProgressContextType>({
  isRouteChanging: false,
  progressValue: 0,
  startProgress: () => {},
  completeProgress: () => {},
})

export const useNavigationProgress = () => useContext(NavigationProgressContext)

interface NavigationProgressProviderProps {
  children: React.ReactNode
  color?: string
  height?: number
  showScrollProgress?: boolean
  initialDelay?: number
  incrementInterval?: number
}

export default function NavigationProgressProvider({
  children,
  color = '#0070f3',
  height = 2,
  showScrollProgress = true,
  initialDelay = 50, // ms before starting progress
  incrementInterval = 250, // ms between increments
}: NavigationProgressProviderProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isRouteChanging, setIsRouteChanging] = useState(false)
  const [progressValue, setProgressValue] = useState(0)
  const incrementTimerRef = useRef<NodeJS.Timeout | null>(null)
  const completeTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastPathnameRef = useRef(pathname)
  const lastSearchParamsRef = useRef(searchParams)

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (incrementTimerRef.current) clearTimeout(incrementTimerRef.current)
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current)
    }
  }, [])

  // Navigation state changed
  useEffect(() => {
    // Ignore the initial render
    if (lastPathnameRef.current === pathname && lastSearchParamsRef.current === searchParams) {
      return
    }
    
    // Update refs for next comparison
    lastPathnameRef.current = pathname
    lastSearchParamsRef.current = searchParams
    
    // Start new navigation progress
    startProgress()
    
    // Use MutationObserver to detect when the page content has changed
    // This is a more reliable way to detect when navigation is complete
    const observer = new MutationObserver((mutations) => {
      // Some mutations detected, probably the page has loaded
      // Wait a bit for any animations to start
      setTimeout(() => {
        completeProgress()
      }, 100)
      observer.disconnect()
    })
    
    // Start observing the main content area after a short delay
    setTimeout(() => {
      const mainElement = document.querySelector('main')
      if (mainElement) {
        observer.observe(mainElement, {
          childList: true,
          subtree: true,
          attributes: false,
          characterData: false
        })
      } else {
        // Fallback - just complete after a reasonable time
        setTimeout(completeProgress, 800)
      }
    }, 200)
    
    return () => {
      observer.disconnect()
    }
  }, [pathname, searchParams])

  // Start progress with immediate acceleration for super-fast response
  const startProgress = () => {
    // Clear existing timers
    if (incrementTimerRef.current) clearTimeout(incrementTimerRef.current)
    if (completeTimerRef.current) clearTimeout(completeTimerRef.current)
    
    // Reset and instantly jump to initial progress
    setProgressValue(0)
    setIsRouteChanging(true)
    
    // Immediate jump to 20% for ultra-fast initial feedback
    setProgressValue(20)
    
    // Use a series of rapid, staggered updates for a burst effect at the beginning
    setTimeout(() => setProgressValue(30), 30);
    setTimeout(() => setProgressValue(35), 60);
    
    // Then set up progressive increment with variable speed
    const incrementProgress = () => {
      setProgressValue((prevProgress) => {
        // Accelerated algorithm for more responsive feel
        // Base increment is higher for faster progress
        const baseIncrement = 4
        const randomVariation = Math.random() * 2.5
        
        // Custom curve for natural but faster progression
        // This creates a faster initial acceleration with a gradual slowdown
        const speedMultiplier = Math.max(0.15, 1.2 * (1 - prevProgress / 100))
        
        let increment = (baseIncrement + randomVariation) * speedMultiplier
        
        // Extra speed at lower percentages
        if (prevProgress < 40) {
          increment *= 1.2
        }
        
        // Very slow crawl at high percentages
        if (prevProgress > 80) {
          increment = Math.min(increment, 0.5 + (Math.random() * 0.3))
        }
        
        const nextProgress = Math.min(prevProgress + increment, 90)
        
        // Dynamic timing for next increment - faster early, slower later
        const nextDelay = Math.max(50, 70 + (prevProgress * 1.5))
        
        if (nextProgress < 90) {
          incrementTimerRef.current = setTimeout(incrementProgress, nextDelay)
        }
        
        return nextProgress
      })
    }
    
    // Start incrementing almost immediately
    incrementTimerRef.current = setTimeout(incrementProgress, 10)
  }

  // Enhanced completion animation for smoother finale
  const completeProgress = () => {
    // Clear any running timers
    if (incrementTimerRef.current) {
      clearTimeout(incrementTimerRef.current)
      incrementTimerRef.current = null
    }
    
    // Multi-step rapid completion for a satisfying finish
    // Fast series of jumps to create an acceleration effect
    setProgressValue(92)
    setTimeout(() => setProgressValue(96), 20)
    setTimeout(() => setProgressValue(98), 40)
    setTimeout(() => {
      setProgressValue(100)
      
      // Allow animation to complete before hiding
      completeTimerRef.current = setTimeout(() => {
        setIsRouteChanging(false)
        // Don't reset progress value immediately for a smoother transition
        setTimeout(() => setProgressValue(0), 100)
      }, 300)
    }, 60)
  }

  return (
    <NavigationProgressContext.Provider value={{ isRouteChanging, progressValue, startProgress, completeProgress }}>
      {/* Navigation Progress */}
      <ProgressBar 
        isRouteChanging={isRouteChanging} 
        progress={isRouteChanging ? progressValue : undefined}
        color={color}
        height={height}
        zIndex={100}
      />
      
      {/* Scroll Progress (only shown when not changing routes) */}
      {showScrollProgress && !isRouteChanging && (
        <ProgressBar color={color} height={height} zIndex={50} />
      )}
      
      {children}
    </NavigationProgressContext.Provider>
  )
}