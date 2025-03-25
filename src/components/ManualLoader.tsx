'use client'

import { useState } from 'react'
import useLoadingIndicator from '../hooks/useLoadingIndicator'
import ProgressBar from './ProgressBar'

interface ManualLoaderProps {
  color?: string
  height?: number
}

export default function ManualLoader({ 
  color = '#0070f3',
  height = 2
}: ManualLoaderProps) {
  const { isLoading, progress, startLoading, completeLoading, setProgress } = useLoadingIndicator({
    timeout: 8000, // Auto-complete after 8 seconds
    onComplete: () => console.log('Loading completed')
  })
  
  const [manualProgress, setManualProgress] = useState(0)
  
  const handleStartAutoLoading = () => {
    startLoading()
  }
  
  const handleCompleteLoading = () => {
    completeLoading()
  }
  
  const handleSetManualProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    setManualProgress(value)
    setProgress(value)
  }
  
  return (
    <div className="space-y-4">
      {/* Show the progress bar when loading */}
      {isLoading && (
        <ProgressBar
          progress={progress}
          color={color}
          height={height}
          isRouteChanging={true}
        />
      )}
      
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-2">
          <button
            onClick={handleStartAutoLoading}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Start Auto Loading
          </button>
          
          <button
            onClick={handleCompleteLoading}
            disabled={!isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
          >
            Complete Loading
          </button>
        </div>
        
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <span>Manual progress: {manualProgress}%</span>
            <input
              type="range"
              min="0"
              max="100"
              value={manualProgress}
              onChange={handleSetManualProgress}
              className="flex-1"
            />
          </label>
        </div>
        
        <div className="text-sm text-gray-600">
          Current progress: {Math.round(progress)}%
          <div className="text-xs">{isLoading ? 'Loading...' : 'Idle'}</div>
        </div>
      </div>
    </div>
  )
}