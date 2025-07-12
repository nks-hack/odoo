"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useSocket } from "@/contexts/SocketContext"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Clock, Check, MessageSquare } from "lucide-react"
import LoadingSpinner from "@/components/LoadingSpinner"
import RequestCard from "@/components/RequestCard"
import toast from "react-hot-toast"

export default function RequestsPage() {
  const { user, loading } = useAuth()
  const { socket } = useSocket()
  const router = useRouter()
  const [requests, setRequests] = useState([])
  const [activeTab, setActiveTab] = useState("received")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    } else if (user) {
      fetchRequests()
    }
  }, [user, loading, router])

  useEffect(() => {
    if (socket) {
      socket.on("requestUpdate", (updatedRequest) => {
        setRequests((prev) => prev.map((req) => (req._id === updatedRequest._id ? updatedRequest : req)))
      })

      socket.on("newRequest", (newRequest) => {
        setRequests((prev) => [newRequest, ...prev])
        toast.success("New skill swap request received!")
      })

      return () => {
        socket.off("requestUpdate")
        socket.off("newRequest")
      }
    }
  }, [socket])

  const fetchRequests = async () => {
    try {
      const response = await fetch("/api/requests")
      if (response.ok) {
        const data = await response.json()
        setRequests(data)
      }
    } catch (error) {
      console.error("Error fetching requests:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRequestAction = async (requestId, action) => {
    try {
      const response = await fetch(`/api/requests/${requestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      })

      if (response.ok) {
        const updatedRequest = await response.json()
        setRequests((prev) => prev.map((req) => (req._id === requestId ? updatedRequest : req)))

        if (action === "accept") {
          toast.success("Request accepted! You can now start your skill swap session.")
        } else if (action === "reject") {
          toast.success("Request rejected.")
        }
      }
    } catch (error) {
      toast.error("Failed to update request")
    }
  }

  const filteredRequests = requests.filter((request) => {
    if (activeTab === "received") {
      return request.receiver._id === user?._id
    } else {
      return request.sender._id === user?._id
    }
  })

  const getStatusCounts = () => {
    const received = requests.filter((r) => r.receiver._id === user?._id)
    const sent = requests.filter((r) => r.sender._id === user?._id)

    return {
      receivedPending: received.filter((r) => r.status === "pending").length,
      sentPending: sent.filter((r) => r.status === "pending").length,
      accepted: requests.filter((r) => r.status === "accepted").length,
    }
  }

  if (loading || isLoading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return null
  }

  const statusCounts = getStatusCounts()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => router.push("/")} className="text-blue-600 hover:text-blue-700 font-medium">
              ← Back to Home
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Skill Swap Requests</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border"
          >
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{statusCounts.receivedPending}</p>
                <p className="text-gray-600">Pending Requests</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border"
          >
            <div className="flex items-center">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{statusCounts.sentPending}</p>
                <p className="text-gray-600">Sent Requests</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border"
          >
            <div className="flex items-center">
              <Check className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{statusCounts.accepted}</p>
                <p className="text-gray-600">Active Sessions</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("received")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "received"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Received Requests ({requests.filter((r) => r.receiver._id === user._id).length})
              </button>
              <button
                onClick={() => setActiveTab("sent")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "sent"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Sent Requests ({requests.filter((r) => r.sender._id === user._id).length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {filteredRequests.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  {activeTab === "received" ? "No requests received yet" : "No requests sent yet"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRequests.map((request, index) => (
                  <motion.div
                    key={request._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <RequestCard
                      request={request}
                      currentUser={user}
                      onAction={handleRequestAction}
                      isReceived={activeTab === "received"}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
