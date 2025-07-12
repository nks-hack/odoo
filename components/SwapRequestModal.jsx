"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import toast from "react-hot-toast"

export default function SwapRequestModal({ isOpen, onClose, targetUser }) {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    offeredSkill: "",
    wantedSkill: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiverId: targetUser._id,
          offeredSkill: formData.offeredSkill,
          wantedSkill: formData.wantedSkill,
          message: formData.message,
        }),
      })

      if (response.ok) {
        toast.success("Skill swap request sent!")
        onClose()
        setFormData({ offeredSkill: "", wantedSkill: "", message: "" })
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to send request")
      }
    } catch (error) {
      toast.error("Failed to send request")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
            className="relative bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Request Skill Swap</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                    {targetUser.profilePhoto ? (
                      <img
                        src={targetUser.profilePhoto || "/placeholder.svg"}
                        alt={targetUser.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                        {targetUser.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{targetUser.name}</h3>
                    <p className="text-sm text-gray-500">Skill swap request</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">I can teach:</label>
                  <select
                    name="offeredSkill"
                    value={formData.offeredSkill}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a skill you can teach</option>
                    {user?.skillsOffered?.map((skill, index) => (
                      <option key={index} value={skill}>
                        {skill}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">I want to learn:</label>
                  <select
                    name="wantedSkill"
                    value={formData.wantedSkill}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a skill you want to learn</option>
                    {targetUser.skillsOffered?.map((skill, index) => (
                      <option key={index} value={skill}>
                        {skill}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message:</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell them why you'd like to swap skills..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Request
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
