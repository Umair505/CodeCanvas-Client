import { useState, useEffect } from 'react'
import { 
  ScaleLoader,
  PuffLoader,
  RingLoader,
  HashLoader,
  PulseLoader,
  ClimbingBoxLoader
} from 'react-spinners'
import { motion } from 'framer-motion'

const LoadingSpinner = ({ smallHeight, fullScreen = false }) => {
  const [activeLoader, setActiveLoader] = useState(0)
  const loaders = [
    { component: ScaleLoader, props: { size: 100, color: '#00f5ff' } },
    { component: PuffLoader, props: { size: 100, color: '#ff00ff' } },
    { component: RingLoader, props: { size: 100, color: '#9d00ff' } },
    { component: HashLoader, props: { size: 80, color: '#00f5ff' } },
    { component: PulseLoader, props: { size: 30, color: '#ff00ff' } },
    { component: ClimbingBoxLoader, props: { size: 20, color: '#9d00ff' } },
  ]

  // Cycle through different loaders every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLoader(prev => (prev + 1) % loaders.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const CurrentLoader = loaders[activeLoader].component
  const loaderProps = loaders[activeLoader].props

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        ${fullScreen ? 'fixed inset-0 z-50' : ''}
        ${smallHeight ? 'h-[250px]' : fullScreen ? 'h-screen' : 'h-[70vh]'}
        w-full
        flex 
        flex-col 
        justify-center 
        items-center
        backdrop-blur-sm
        ${fullScreen ? 'bg-[#0a0a12cc]' : 'bg-transparent'}
      `}
    >
      {/* Animated gradient background for full screen mode */}
      {fullScreen && (
        <motion.div 
          className="absolute inset-0 overflow-hidden z-[-1]"
          animate={{
            background: [
              'linear-gradient(45deg, #0a0a12, #1a1a2e)',
              'linear-gradient(135deg, #0a0a12, #1a1a2e)',
              'linear-gradient(225deg, #0a0a12, #1a1a2e)',
              'linear-gradient(315deg, #0a0a12, #1a1a2e)',
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}

      <div className="relative">
        {/* Main loader */}
        <CurrentLoader {...loaderProps} />

        {/* Floating particles animation */}
        {fullScreen && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-br from-[#00f5ff] to-[#ff00ff]"
                style={{
                  width: Math.random() * 10 + 5,
                  height: Math.random() * 10 + 5,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.3,
                }}
                animate={{
                  y: [0, (Math.random() - 0.5) * 100],
                  x: [0, (Math.random() - 0.5) * 100],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: Math.random() * 10 + 5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Loading text with typing animation */}
      <motion.p 
        className="mt-8 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#ff00ff]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {['Loading creativity', 'Preparing canvas', 'Initializing magic', 'Almost there'][activeLoader % 4]}...
      </motion.p>

      {/* Progress bar for full screen mode */}
      {fullScreen && (
        <motion.div 
          className="mt-6 w-64 h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear'
          }}
        >
          <div className="h-full bg-gradient-to-r from-[#00f5ff] to-[#ff00ff] rounded-full" />
        </motion.div>
      )}
    </motion.div>
  )
}

export default LoadingSpinner