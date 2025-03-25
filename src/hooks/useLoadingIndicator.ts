'use client'

import { useState, useEffect } from 'react'

interface UseLoadingIndicatorOptions {
  /**
   * Automatically finish loading after this time (in ms)
   */
  timeout?: number
  /**
   * Callback to run when loading completes
   */
  onComplete?: () => void
}

interface UseLoadingIndicatorReturn {
  /**
   * Current loading progress (0-100)
   */
  progress: number
  /**
   * Whether loading is currently active
   */
  isLoading: boolean
  /**
   * Start the loading indicator
   */
  startLoading: () => void
  /**
   * Set loading to 100% and then finish
   */
  completeLoading: () => void
  /**
   * Manually set the progress value
   */
  setProgress: (value: number) => void
}

/**
 * Hook for manually controlling loading indicators
 */
export default function useLoadingIndicator({
  timeout = 10000, // 10 seconds default
  onComplete,
}: UseLoadingIndicatorOptions = {}): UseLoadingIndicatorReturn {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  
  // Handle automatic progress simulation
  useEffect(() => {
    if (!isLoading || progress >= 100) return
    
    let timeoutId: NodeJS.Timeout
    let simulationInterval: NodeJS.Timeout
    
    // Simulate progress incrementing
    const simulateProgress = () => {
      setProgress(prev => {
        if (prev >= 90) return prev // Stop at 90%
        
        // Calculate a random increment, smaller as we get closer to 90%
        const factor = 1 - prev / 100
        const increment = Math.random() * 3 * factor
        
        return Math.min(prev + increment, 90)
      })
    }
    
    // Start simulation
    simulationInterval = setInterval(simulateProgress, 200)
    
    // Set timeout to auto-complete if needed
    if (timeout > 0) {
      timeoutId = setTimeout(() => {
        completeLoading()
      }, timeout)
    }
    
    return () => {
      clearInterval(simulationInterval)
      clearTimeout(timeoutId)
    }
  }, [isLoading, progress, timeout])
  
  // Handle completion animation
  useEffect(() => {
    if (progress === 100) {
      const completeTimeout = setTimeout(() => {
        setIsLoading(false)
        setProgress(0)
        onComplete?.()
      }, 300) // Allow time for the animation
      
      return () => clearTimeout(completeTimeout)
    }
  }, [progress, onComplete])
  
  const startLoading = () => {
    setIsLoading(true)
    setProgress(0)
  }
  
  const completeLoading = () => {
    setProgress(100)
  }
  
  return {
    progress,
    isLoading,
    startLoading,
    completeLoading,
    setProgress
  }
}