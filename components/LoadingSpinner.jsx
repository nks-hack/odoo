"use client"

import { motion } from "framer-motion"

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"
        />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
}
