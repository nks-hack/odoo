"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Star, Send } from "lucide-react"
import confetti from "canvas-confetti"

export default function FeedbackModal({ isOpen, onClose, onSubmit, otherUser }) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit({
        rating,
        feedback,
        receiverId: otherUser._id,
      })

      // Trigger confetti for high ratings
      if (rating >= 4) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      }

      onClose()
    } catch (error) {
      console.error("Error submitting feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1
      const isFilled = starValue <= (hoveredRating || rating)

      return (
        <button
          key={index}
          type="button"
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
          className={`text-3xl transition-colors duration-200 ${
            isFilled ? "text-yellow-400" : "text-gray-300"
          } hover:text-yellow-400`}
        >
          <Star className={`w-8 h-8 ${isFilled ? "fill-current" : ""}`} />
        </button>
      )
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-xl max-w-md w-full"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Rate Your Experience</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mx-auto mb-3">
                  {otherUser.profilePhoto ? (
                    <img
                      src={otherUser.profilePhoto || "/placeholder.svg"}
                      alt={otherUser.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                      {otherUser.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{otherUser.name}</h3>
                <p className="text-sm text-gray-500">How was your skill swap session?</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center">
                  <div className="flex justify-center space-x-1 mb-2">{renderStars()}</div>
                  <p className="text-sm text-gray-600">
                    {rating === 0 && "Click to rate"}
                    {rating === 1 && "Poor"}
                    {rating === 2 && "Fair"}
                    {rating === 3 && "Good"}
                    {rating === 4 && "Very Good"}
                    {rating === 5 && "Excellent"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Share your feedback (optional)</label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                    placeholder="What did you learn? How was the teaching style?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Skip
                  </button>
                  <button
                    type="submit"
                    disabled={rating === 0 || isSubmitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
