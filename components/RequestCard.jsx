"use client"

import { motion } from "framer-motion"
import { Check, X, Clock, Video, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RequestCard({ request, currentUser, onAction, isReceived }) {
  const router = useRouter()
  const otherUser = isReceived ? request.sender : request.receiver

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "accepted":
        return <Check className="w-4 h-4" />
      case "rejected":
        return <X className="w-4 h-4" />
      default:
        return null
    }
  }

  const handleJoinRoom = () => {
    if (request.roomId) {
      router.push(`/room/${request.roomId}`)
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
            {otherUser.profilePhoto ? (
              <img
                src={otherUser.profilePhoto || "/placeholder.svg"}
                alt={otherUser.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                {otherUser.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{otherUser.name}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(request.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}
        >
          {getStatusIcon(request.status)}
          <span className="ml-1 capitalize">{request.status}</span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{isReceived ? "They can teach:" : "You offered:"}</span>
          <span className="font-medium text-green-700 bg-green-50 px-2 py-1 rounded">{request.offeredSkill}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{isReceived ? "They want to learn:" : "You want to learn:"}</span>
          <span className="font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded">{request.wantedSkill}</span>
        </div>
      </div>

      {request.message && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-sm text-gray-700">{request.message}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-2">
        {isReceived && request.status === "pending" && (
          <>
            <button
              onClick={() => onAction(request._id, "accept")}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center"
            >
              <Check className="w-4 h-4 mr-1" />
              Accept
            </button>
            <button
              onClick={() => onAction(request._id, "reject")}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center"
            >
              <X className="w-4 h-4 mr-1" />
              Reject
            </button>
          </>
        )}

        {request.status === "accepted" && request.roomId && (
          <button
            onClick={handleJoinRoom}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center"
          >
            <Video className="w-4 h-4 mr-1" />
            Join Session
          </button>
        )}

        {!isReceived && request.status === "pending" && (
          <button
            onClick={() => onAction(request._id, "cancel")}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Cancel Request
          </button>
        )}

        {request.status === "rejected" && (
          <div className="flex-1 text-center py-2 text-gray-500 text-sm">
            Request was {isReceived ? "rejected" : "declined"}
          </div>
        )}
      </div>
    </motion.div>
  )
}
