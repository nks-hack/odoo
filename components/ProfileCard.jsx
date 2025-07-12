"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Star, MessageSquare, Calendar, Award } from "lucide-react"
import { useRouter } from "next/navigation"
import SwapRequestModal from "./SwapRequestModal"

export default function ProfileCard({ profile }) {
  const router = useRouter()
  const [showRequestModal, setShowRequestModal] = useState(false)

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

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 overflow-hidden"
      >
        <div className="p-6">
          {/* Profile Header */}
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
              {profile.profilePhoto ? (
                <img
                  src={profile.profilePhoto || "/placeholder.svg"}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                  {profile.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{profile.name}</h3>

              {profile.location && (
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {profile.location}
                </div>
              )}

              <div className="flex items-center mt-2">
                <div className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">
                    {profile.averageRating ? profile.averageRating.toFixed(1) : "New"}
                  </span>
                </div>
                <span className="text-gray-400 text-sm ml-2">({profile.totalReviews || 0} reviews)</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-lg font-bold text-blue-600">{profile.points || 0}</div>
              <div className="text-xs text-gray-500">points</div>
            </div>
          </div>

          {/* Bio */}
          {profile.bio && <p className="text-gray-600 text-sm mb-4 line-clamp-2">{profile.bio}</p>}

          {/* Skills Offered */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Can teach:</h4>
            <div className="flex flex-wrap gap-1">
              {profile.skillsOffered.slice(0, 3).map((skill, index) => (
                <span key={index} className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  {skill}
                </span>
              ))}
              {profile.skillsOffered.length > 3 && (
                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                  +{profile.skillsOffered.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Skills Wanted */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Wants to learn:</h4>
            <div className="flex flex-wrap gap-1">
              {profile.skillsWanted.slice(0, 3).map((skill, index) => (
                <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {skill}
                </span>
              ))}
              {profile.skillsWanted.length > 3 && (
                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                  +{profile.skillsWanted.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Availability */}
          {profile.availability && profile.availability.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center text-gray-600 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Available {profile.availability[0]}</span>
                {profile.availability.length > 1 && (
                  <span className="ml-1">+{profile.availability.length - 1} more</span>
                )}
              </div>
            </div>
          )}

          {/* Badges */}
          {profile.badges && profile.badges.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {profile.badges.slice(0, 2).map((badge, index) => (
                  <span
                    key={index}
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(badge)}`}
                  >
                    <Award className="w-3 h-3 mr-1" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={() => setShowRequestModal(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Request Skill Swap
          </button>
        </div>
      </motion.div>

      {/* Swap Request Modal */}
      <SwapRequestModal isOpen={showRequestModal} onClose={() => setShowRequestModal(false)} targetUser={profile} />
    </>
  )
}
