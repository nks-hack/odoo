// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { MapPin, Star, MessageSquare, Calendar, Award } from "lucide-react"
// import { useRouter } from "next/navigation"
// import SwapRequestModal from "./SwapRequestModal"

// export default function ProfileCard({ profile }) {
//   const router = useRouter()
//   const [showRequestModal, setShowRequestModal] = useState(false)

//   const getBadgeColor = (badge) => {
//     switch (badge) {
//       case "Skill Master":
//         return "bg-purple-100 text-purple-800"
//       case "Knowledge Seeker":
//         return "bg-blue-100 text-blue-800"
//       case "Community Helper":
//         return "bg-green-100 text-green-800"
//       case "Rising Star":
//         return "bg-yellow-100 text-yellow-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   return (
//     <>
//       <motion.div
//         whileHover={{ y: -5 }}
//         className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 overflow-hidden"
//       >
//         <div className="p-6">
//           {/* Profile Header */}
//           <div className="flex items-start space-x-4 mb-4">
//             <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
//               {profile.profilePhoto ? (
//                 <img
//                   src={profile.profilePhoto || "/placeholder.svg"}
//                   alt={profile.name}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
//                   {profile.name.charAt(0)}
//                 </div>
//               )}
//             </div>

//             <div className="flex-1 min-w-0">
//               <h3 className="text-lg font-semibold text-gray-900 truncate">{profile.name}</h3>

//               {profile.location && (
//                 <div className="flex items-center text-gray-500 text-sm mt-1">
//                   <MapPin className="w-4 h-4 mr-1" />
//                   {profile.location}
//                 </div>
//               )}

//               <div className="flex items-center mt-2">
//                 <div className="flex items-center text-yellow-500">
//                   <Star className="w-4 h-4 mr-1" />
//                   <span className="text-sm font-medium">
//                     {profile.averageRating ? profile.averageRating.toFixed(1) : "New"}
//                   </span>
//                 </div>
//                 <span className="text-gray-400 text-sm ml-2">({profile.totalReviews || 0} reviews)</span>
//               </div>
//             </div>

//             <div className="text-right">
//               <div className="text-lg font-bold text-blue-600">{profile.points || 0}</div>
//               <div className="text-xs text-gray-500">points</div>
//             </div>
//           </div>

//           {/* Bio */}
//           {profile.bio && <p className="text-gray-600 text-sm mb-4 line-clamp-2">{profile.bio}</p>}

//           {/* Skills Offered */}
//           <div className="mb-4">
//             <h4 className="text-sm font-medium text-gray-700 mb-2">Can teach:</h4>
//             <div className="flex flex-wrap gap-1">
//               {profile.skillsOffered.slice(0, 3).map((skill, index) => (
//                 <span key={index} className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
//                   {skill}
//                 </span>
//               ))}
//               {profile.skillsOffered.length > 3 && (
//                 <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
//                   +{profile.skillsOffered.length - 3} more
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Skills Wanted */}
//           <div className="mb-4">
//             <h4 className="text-sm font-medium text-gray-700 mb-2">Wants to learn:</h4>
//             <div className="flex flex-wrap gap-1">
//               {profile.skillsWanted.slice(0, 3).map((skill, index) => (
//                 <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
//                   {skill}
//                 </span>
//               ))}
//               {profile.skillsWanted.length > 3 && (
//                 <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
//                   +{profile.skillsWanted.length - 3} more
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Availability */}
//           {profile.availability && profile.availability.length > 0 && (
//             <div className="mb-4">
//               <div className="flex items-center text-gray-600 text-sm">
//                 <Calendar className="w-4 h-4 mr-1" />
//                 <span>Available {profile.availability[0]}</span>
//                 {profile.availability.length > 1 && (
//                   <span className="ml-1">+{profile.availability.length - 1} more</span>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Badges */}
//           {profile.badges && profile.badges.length > 0 && (
//             <div className="mb-4">
//               <div className="flex flex-wrap gap-1">
//                 {profile.badges.slice(0, 2).map((badge, index) => (
//                   <span
//                     key={index}
//                     className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(badge)}`}
//                   >
//                     <Award className="w-3 h-3 mr-1" />
//                     {badge}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Action Button */}
//           <button
//             onClick={() => setShowRequestModal(true)}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
//           >
//             <MessageSquare className="w-4 h-4 mr-2" />
//             Request Skill Swap
//           </button>
//         </div>
//       </motion.div>

//       {/* Swap Request Modal */}
//       <SwapRequestModal isOpen={showRequestModal} onClose={() => setShowRequestModal(false)} targetUser={profile} />
//     </>
//   )
// }
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Star, MessageSquare, Calendar, Award, Zap, Shield, Target } from "lucide-react"
import { useRouter } from "next/navigation"
import SwapRequestModal from "./SwapRequestModal"

export default function ProfileCard({ profile }) {
  const router = useRouter()
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Skill Master":
        return "from-purple-500/20 to-purple-400/20 text-purple-300 border-purple-400/30"
      case "Knowledge Seeker":
        return "from-blue-500/20 to-blue-400/20 text-blue-300 border-blue-400/30"
      case "Community Helper":
        return "from-green-500/20 to-green-400/20 text-green-300 border-green-400/30"
      case "Rising Star":
        return "from-yellow-500/20 to-yellow-400/20 text-yellow-300 border-yellow-400/30"
      default:
        return "from-gray-500/20 to-gray-400/20 text-gray-300 border-gray-400/30"
    }
  }

  return (
    <>
      <motion.div
        className="gaming-card group cursor-pointer relative overflow-hidden"
        whileHover={{
          scale: 1.05,
          y: -10,
          rotateY: 5,
        }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Hologram Effect */}
        <div className="absolute inset-0 hologram-effect opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>

        {/* Glow Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-pink/20 via-neon-purple/20 to-neon-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={isHovered ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="relative z-10 p-6">
          {/* Profile Header */}
          <div className="flex items-start space-x-4 mb-6">
            <motion.div className="relative" whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring" }}>
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 border-neon-purple/30 group-hover:border-neon-pink/50 transition-colors duration-300">
                {profile.profilePhoto ? (
                  <img
                    src={profile.profilePhoto || "/placeholder.svg"}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-neon-pink/30 to-neon-purple/30 flex items-center justify-center text-white font-bold text-2xl backdrop-blur-sm">
                    {profile.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Status Indicator */}
              <motion.div
                className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-neon-green to-green-400 rounded-full border-2 border-cyber-dark flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </motion.div>
            </motion.div>

            <div className="flex-1 min-w-0">
              <motion.h3
                className="text-xl font-cyber font-bold text-white truncate mb-2 group-hover:text-neon-pink transition-colors duration-300"
                layoutId={`name-${profile._id}`}
              >
                {profile.name}
              </motion.h3>

              {profile.location && (
                <motion.div
                  className="flex items-center text-gray-400 text-sm mb-2 group-hover:text-neon-blue transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {profile.location}
                </motion.div>
              )}

              <div className="flex items-center space-x-4">
                <motion.div className="flex items-center" whileHover={{ scale: 1.1 }}>
                  <div className="flex items-center text-neon-yellow">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    <span className="text-sm font-bold font-gaming">
                      {profile.averageRating ? profile.averageRating.toFixed(1) : "NEW"}
                    </span>
                  </div>
                  <span className="text-gray-500 text-xs ml-2 font-gaming">({profile.totalReviews || 0} reviews)</span>
                </motion.div>
              </div>
            </div>

            <motion.div className="text-right" whileHover={{ scale: 1.1 }}>
              <div className="flex items-center space-x-1 mb-1">
                <Zap className="w-4 h-4 text-neon-blue" />
                <div className="text-2xl font-cyber font-bold text-neon-blue">{profile.points || 0}</div>
              </div>
              <div className="text-xs text-gray-400 font-gaming">XP</div>
            </motion.div>
          </div>

          {/* Bio */}
          {profile.bio && (
            <motion.div
              className="mb-4 p-3 bg-cyber-purple/10 rounded-lg border border-neon-purple/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-gray-300 text-sm line-clamp-2 font-gaming">{profile.bio}</p>
            </motion.div>
          )}

          {/* Skills Offered */}
          <div className="mb-4">
            <div className="flex items-center mb-3">
              <Target className="w-4 h-4 text-neon-green mr-2" />
              <h4 className="text-sm font-gaming font-bold text-neon-green">SKILLS OFFERED:</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {profile.skillsOffered.slice(0, 3).map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.1 }}
                    className="inline-block bg-gradient-to-r from-neon-green/20 to-green-500/20 text-neon-green border border-neon-green/30 text-xs px-3 py-1 rounded-full font-gaming font-medium hover:from-neon-green/30 hover:to-green-500/30 transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </AnimatePresence>
              {profile.skillsOffered.length > 3 && (
                <motion.span
                  className="inline-block bg-gradient-to-r from-gray-500/20 to-gray-400/20 text-gray-300 border border-gray-500/30 text-xs px-3 py-1 rounded-full font-gaming"
                  whileHover={{ scale: 1.05 }}
                >
                  +{profile.skillsOffered.length - 3} more
                </motion.span>
              )}
            </div>
          </div>

          {/* Skills Wanted */}
          <div className="mb-4">
            <div className="flex items-center mb-3">
              <Shield className="w-4 h-4 text-neon-blue mr-2" />
              <h4 className="text-sm font-gaming font-bold text-neon-blue">WANTS TO LEARN:</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {profile.skillsWanted.slice(0, 3).map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.1 }}
                    className="inline-block bg-gradient-to-r from-neon-blue/20 to-blue-500/20 text-neon-blue border border-neon-blue/30 text-xs px-3 py-1 rounded-full font-gaming font-medium hover:from-neon-blue/30 hover:to-blue-500/30 transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </AnimatePresence>
              {profile.skillsWanted.length > 3 && (
                <motion.span
                  className="inline-block bg-gradient-to-r from-gray-500/20 to-gray-400/20 text-gray-300 border border-gray-500/30 text-xs px-3 py-1 rounded-full font-gaming"
                  whileHover={{ scale: 1.05 }}
                >
                  +{profile.skillsWanted.length - 3} more
                </motion.span>
              )}
            </div>
          </div>

          {/* Availability */}
          {profile.availability && profile.availability.length > 0 && (
            <motion.div
              className="mb-4 p-3 bg-cyber-blue/10 rounded-lg border border-neon-blue/20"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center text-neon-blue text-sm font-gaming">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="font-bold">Available:</span>
                <span className="ml-2">{profile.availability[0]}</span>
                {profile.availability.length > 1 && (
                  <span className="ml-1 text-gray-400">+{profile.availability.length - 1} more</span>
                )}
              </div>
            </motion.div>
          )}

          {/* Badges */}
          {profile.badges && profile.badges.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {profile.badges.slice(0, 2).map((badge, index) => (
                    <motion.span
                      key={badge}
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0, rotate: 180 }}
                      transition={{ delay: index * 0.1, type: "spring" }}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border bg-gradient-to-r ${getBadgeColor(badge)} font-gaming`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Award className="w-3 h-3 mr-1" />
                      {badge}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Action Button */}
          <motion.button
            onClick={() => setShowRequestModal(true)}
            className="w-full bg-gradient-to-r from-neon-pink to-neon-purple hover:from-neon-purple hover:to-neon-blue text-white font-cyber font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 border border-neon-purple/30 relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center space-x-2 relative z-10">
              <MessageSquare className="w-5 h-5" />
              <span>CHALLENGE PLAYER</span>
            </div>

            {/* Button Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

            {/* Scan Line Effect */}
            <motion.div
              className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100"
              animate={isHovered ? { x: ["-100%", "100%"] } : {}}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </motion.button>
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-neon-purple/30 group-hover:border-neon-pink/50 transition-colors duration-300"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-neon-purple/30 group-hover:border-neon-pink/50 transition-colors duration-300"></div>
      </motion.div>

      {/* Swap Request Modal */}
      <SwapRequestModal isOpen={showRequestModal} onClose={() => setShowRequestModal(false)} targetUser={profile} />
    </>
  )
}