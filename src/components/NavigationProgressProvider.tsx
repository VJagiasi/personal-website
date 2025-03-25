'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'
import ProgressBar from './ProgressBar'

interface NavigationProgressContextType {
  isRouteChanging: boolean
  progressValue: number
}

const NavigationProgressContext = createContext<NavigationProgressContextType>({
  isRouteChanging: false,
  progressValue: 0,
})

export const useNavigationProgress = () => useContext(NavigationProgressContext)

interface NavigationProgressProviderProps {
  children: React.ReactNode
  color?: string
  height?: number
  showScrollProgress?: boolean
}

export default function NavigationProgressProvider({
  children,
  color = '#0070f3',
  height = 2,
  showScrollProgress = true,
}: NavigationProgressProviderProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isRouteChanging, setIsRouteChanging] = useState(false)
  const [progressValue, setProgressValue] = useState(0)
  const [isNavigating, setIsNavigating] = useState(false)

  // Reset progress when navigation completes
  useEffect(() => {
    if (isRouteChanging) {
      // Quickly complete the progress when route is changed
      setProgressValue(100)
      
      const timeout = setTimeout(() => {
        setIsRouteChanging(false)
        setProgressValue(0)
      }, 300) // Allow time for animation to complete
      
      return () => clearTimeout(timeout)
    }
  }, [pathname, searchParams, isRouteChanging])

  // Handle simulated progress
  useEffect(() => {
    if (!isNavigating) return
    
    setIsRouteChanging(true)
    let timeoutId: NodeJS.Timeout

    // Simulate progress
    const simulateProgress = () => {
      setProgressValue((prev) => {
        // Randomly progress up to 90%
        const increment = Math.random() * 10
        const nextProgress = Math.min(prev + increment, 90)
        
        if (nextProgress < 90) {
          timeoutId = setTimeout(simulateProgress, 300)
        }
        
        return nextProgress
      })
    }

    simulateProgress()
    
    return () => clearTimeout(timeoutId)
  }, [isNavigating])

  // Detect navigation start
  useEffect(() => {
    setIsNavigating(true)
    
    // Immediately reset when effect runs (on pathname/searchParams change)
    return () => {
      setIsNavigating(false)
    }
  }, [pathname, searchParams])

  return (
    <NavigationProgressContext.Provider value={{ isRouteChanging, progressValue }}>
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