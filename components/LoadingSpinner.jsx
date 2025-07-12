// "use client"

// import { motion } from "framer-motion"

// export default function LoadingSpinner() {
//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="text-center">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//           className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"
//         />
//         <p className="text-gray-600">Loading...</p>
//       </div>
//     </div>
//   )
// }
"use client"

import { motion } from "framer-motion"

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-cyber-dark flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 cyber-grid-bg opacity-20"></div>

      {/* Floating Particles */}
      <div className="fixed inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-purple rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10">
        {/* Main Loading Ring */}
        <motion.div
          className="relative w-24 h-24 mx-auto mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="absolute inset-0 border-4 border-neon-purple/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-neon-pink rounded-full"></div>
          <div className="absolute inset-2 border-2 border-transparent border-r-neon-blue rounded-full"></div>

          {/* Center Glow */}
          <motion.div
            className="absolute inset-6 bg-gradient-to-r from-neon-pink to-neon-blue rounded-full"
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <motion.h2
            className="text-2xl font-cyber font-bold mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <span className="neon-text">LOADING</span> <span className="text-white">ARENA</span>
          </motion.h2>

          <motion.p
            className="text-gray-400 font-gaming"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
          >
            Initializing gaming systems...
          </motion.p>
        </motion.div>

        {/* Progress Bars */}
        <div className="mt-8 space-y-3">
          {["Network", "Graphics", "Audio"].map((system, index) => (
            <motion.div
              key={system}
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.2 }}
            >
              <span className="text-sm font-gaming text-gray-400 w-16 text-left">{system}</span>
              <div className="flex-1 h-1 bg-cyber-purple/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-neon-pink to-neon-blue rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    delay: 1 + index * 0.3,
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute -top-10 -left-10 w-20 h-20 border border-neon-purple/20 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-10 -right-10 w-16 h-16 border border-neon-blue/20 rounded-full"
          animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>
    </div>
  )
}