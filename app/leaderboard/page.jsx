"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useSocket } from "@/contexts/SocketContext"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Trophy, Medal, Award, Star, Crown } from "lucide-react"
import LoadingSpinner from "@/components/LoadingSpinner"
import confetti from "canvas-confetti"

export default function LeaderboardPage() {
  const { user, loading } = useAuth()
  const { socket } = useSocket()
  const router = useRouter()
  const [leaderboard, setLeaderboard] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [userRank, setUserRank] = useState(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    } else if (user) {
      fetchLeaderboard()
    }
  }, [user, loading, router])

  useEffect(() => {
    if (socket) {
      socket.on("leaderboardUpdate", (updatedLeaderboard) => {
        setLeaderboard(updatedLeaderboard)
        updateUserRank(updatedLeaderboard)
      })

      return () => {
        socket.off("leaderboardUpdate")
      }
    }
  }, [socket, user])

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch("/api/leaderboard")
      if (response.ok) {
        const data = await response.json()
        setLeaderboard(data)
        updateUserRank(data)
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateUserRank = (data) => {
    if (user) {
      const rank = data.findIndex((item) => item._id === user._id) + 1
      setUserRank(rank > 0 ? rank : null)
    }
  }

  const getRankIcon = (position) => {
    switch (position) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-orange-500" />
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">{position}</span>
    }
  }

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Skill Master":
        return "bg-purple-100 text-purple-800"
      case "Knowledge Seeker":
        return "bg-blue-100 text-blue-800"
      case "Community Helper":
        return "bg-green-100 text-green-800"
      case "Rising Star":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  if (loading || isLoading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => router.push("/")} className="text-blue-600 hover:text-blue-700 font-medium">
              ← Back to Home
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Leaderboard</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User's Current Rank */}
        {userRank && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Your Current Rank</h2>
                <p className="text-blue-100">Keep learning to climb higher!</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">#{userRank}</div>
                <div className="text-blue-100">
                  {leaderboard.find((item) => item._id === user._id)?.points || 0} points
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Top 3 Podium */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Top Performers</h2>
          <div className="flex justify-center items-end space-x-4">
            {leaderboard.slice(0, 3).map((user, index) => {
              const position = index + 1
              const heights = ["h-32", "h-40", "h-28"]
              const bgColors = ["bg-gray-200", "bg-yellow-200", "bg-orange-200"]

              return (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={`${heights[index]} ${bgColors[index]} rounded-t-lg p-4 flex flex-col items-center justify-end min-w-[120px]`}
                  onClick={position === 1 ? triggerConfetti : undefined}
                >
                  <div className="text-center mb-2">
                    {getRankIcon(position)}
                    <div className="text-lg font-bold text-gray-900">{position}</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-300 mx-auto mb-2 overflow-hidden">
                      {user.profilePhoto ? (
                        <img
                          src={user.profilePhoto || "/placeholder.svg"}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-600">{user.points} pts</div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border"
        >
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">All Rankings</h3>
          </div>

          <div className="divide-y divide-gray-200">
            {leaderboard.map((user, index) => {
              const position = index + 1
              const isCurrentUser = user._id === user._id

              return (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-6 flex items-center space-x-4 ${
                    isCurrentUser ? "bg-blue-50 border-l-4 border-blue-500" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex-shrink-0">{getRankIcon(position)}</div>

                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                    {user.profilePhoto ? (
                      <img
                        src={user.profilePhoto || "/placeholder.svg"}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-lg font-medium text-gray-900 truncate">
                        {user.name}
                        {isCurrentUser && <span className="ml-2 text-sm text-blue-600 font-normal">(You)</span>}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="w-4 h-4 mr-1" />
                        {user.averageRating ? user.averageRating.toFixed(1) : "N/A"}
                      </div>
                      <div className="text-sm text-gray-500">{user.completedSwaps || 0} swaps completed</div>
                    </div>
                    {user.badges && user.badges.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {user.badges.map((badge, badgeIndex) => (
                          <span
                            key={badgeIndex}
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(badge)}`}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{user.points}</div>
                    <div className="text-sm text-gray-500">points</div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {leaderboard.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No rankings available yet</p>
            <p className="text-gray-400">Complete skill swaps to appear on the leaderboard!</p>
          </div>
        )}
      </div>
    </div>
  )
}
