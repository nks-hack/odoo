"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { Video, VideoOff, Mic, MicOff, Phone, MessageSquare, ClapperboardIcon as Whiteboard } from "lucide-react"
import LoadingSpinner from "@/components/LoadingSpinner"
import FeedbackModal from "@/components/FeedbackModal"
import toast from "react-hot-toast"

export default function RoomPage({ params }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [room, setRoom] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [showFeedback, setShowFeedback] = useState(false)
  const [sessionEnded, setSessionEnded] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const videoRef = useRef(null)
  const remoteVideoRef = useRef(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    } else if (user) {
      fetchRoom()
    }
  }, [user, loading, router, params.id])

  const fetchRoom = async () => {
    try {
      const response = await fetch(`/api/rooms/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setRoom(data)
        initializeVideoCall()
      } else {
        toast.error("Room not found")
        router.push("/requests")
      }
    } catch (error) {
      console.error("Error fetching room:", error)
      toast.error("Failed to load room")
      router.push("/requests")
    } finally {
      setIsLoading(false)
    }
  }

  const initializeVideoCall = async () => {
    try {
      // Initialize video call with Daily.co or similar service
      // This is a placeholder for the actual video call implementation
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      // Store the stream for later cleanup
      window.localStream = stream
    } catch (error) {
      console.error("Error accessing media devices:", error)
      toast.error("Failed to access camera/microphone")
    }
  }

  const toggleVideo = () => {
    if (window.localStream) {
      const videoTrack = window.localStream.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled
        setIsVideoOn(videoTrack.enabled)
      }
    }
  }

  const toggleAudio = () => {
    if (window.localStream) {
      const audioTrack = window.localStream.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        setIsAudioOn(audioTrack.enabled)
      }
    }
  }

  const endSession = async () => {
    try {
      // Stop local stream
      if (window.localStream) {
        window.localStream.getTracks().forEach((track) => track.stop())
      }

      // Update room status
      await fetch(`/api/rooms/${params.id}/end`, {
        method: "POST",
      })

      setSessionEnded(true)
      setShowFeedback(true)
    } catch (error) {
      console.error("Error ending session:", error)
      toast.error("Failed to end session")
    }
  }

  const sendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: user.name,
        timestamp: new Date(),
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleFeedbackSubmit = async (feedbackData) => {
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...feedbackData,
          roomId: params.id,
        }),
      })

      toast.success("Feedback submitted successfully!")
      router.push("/requests")
    } catch (error) {
      toast.error("Failed to submit feedback")
    }
  }

  if (loading || isLoading) {
    return <LoadingSpinner />
  }

  if (!user || !room) {
    return null
  }

  const otherUser = room.participants.find((p) => p._id !== user._id)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">Skill Swap Session</h1>
              <span className="text-gray-400">with {otherUser?.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400 text-sm">● Live</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Video Section */}
        <div className="flex-1 relative">
          {/* Remote Video */}
          <div className="absolute inset-0 bg-gray-800">
            <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded">{otherUser?.name}</div>
          </div>

          {/* Local Video */}
          <div className="absolute bottom-4 right-4 w-64 h-48 bg-gray-700 rounded-lg overflow-hidden">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-sm">You</div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-4 bg-gray-800 bg-opacity-90 px-6 py-3 rounded-full">
              <button
                onClick={toggleVideo}
                className={`p-3 rounded-full ${
                  isVideoOn ? "bg-gray-600 hover:bg-gray-500" : "bg-red-600 hover:bg-red-500"
                }`}
              >
                {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button
                onClick={toggleAudio}
                className={`p-3 rounded-full ${
                  isAudioOn ? "bg-gray-600 hover:bg-gray-500" : "bg-red-600 hover:bg-red-500"
                }`}
              >
                {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => window.open("/whiteboard", "_blank")}
                className="p-3 rounded-full bg-blue-600 hover:bg-blue-500"
              >
                <Whiteboard className="w-5 h-5" />
              </button>

              <button onClick={endSession} className="p-3 rounded-full bg-red-600 hover:bg-red-500">
                <Phone className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h3 className="font-semibold flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Chat
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`${message.sender === user.name ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block max-w-xs px-3 py-2 rounded-lg ${
                    message.sender === user.name ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-100"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-75 mt-1">{new Date(message.timestamp).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedback && (
        <FeedbackModal
          isOpen={showFeedback}
          onClose={() => setShowFeedback(false)}
          onSubmit={handleFeedbackSubmit}
          otherUser={otherUser}
        />
      )}
    </div>
  )
}
