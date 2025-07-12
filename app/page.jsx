// "use client";

// import { useEffect, useState } from "react";
// import { useAuth } from "@/contexts/AuthContext";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { Search, Filter, Star, Users, Award } from "lucide-react";
// import ProfileCard from "@/components/ProfileCard";
// import SearchFilters from "@/components/SearchFilters";
// import LoadingSpinner from "@/components/LoadingSpinner";

// export default function HomePage() {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const [profiles, setProfiles] = useState([]);
//   const [filteredProfiles, setFilteredProfiles] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({
//     skills: [],
//     availability: "",
//     location: "",
//   });
//   const [showFilters, setShowFilters] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push("/login");
//     }
//   }, [user, loading, router]);

//   useEffect(() => {
//     fetchProfiles();
//   }, []);

//   useEffect(() => {
//     filterProfiles();
//   }, [profiles, searchTerm, filters]);

//   const fetchProfiles = async () => {
//     try {
//       const response = await fetch("/api/profiles/public");
//       if (response.ok) {
//         const data = await response.json();
//         setProfiles(data);
//       }
//     } catch (error) {
//       console.error("Error fetching profiles:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filterProfiles = () => {
//     let filtered = profiles;

//     if (searchTerm) {
//       filtered = filtered.filter(
//         (profile) =>
//           profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           profile.skillsOffered.some((skill) =>
//             skill.toLowerCase().includes(searchTerm.toLowerCase())
//           ) ||
//           profile.skillsWanted.some((skill) =>
//             skill.toLowerCase().includes(searchTerm.toLowerCase())
//           )
//       );
//     }

//     if (filters.skills.length > 0) {
//       filtered = filtered.filter((profile) =>
//         filters.skills.some(
//           (skill) =>
//             profile.skillsOffered.includes(skill) ||
//             profile.skillsWanted.includes(skill)
//         )
//       );
//     }

//     if (filters.availability) {
//       filtered = filtered.filter((profile) =>
//         profile.availability.includes(filters.availability)
//       );
//     }

//     if (filters.location) {
//       filtered = filtered.filter((profile) =>
//         profile.location?.toLowerCase().includes(filters.location.toLowerCase())
//       );
//     }

//     setFilteredProfiles(filtered);
//   };

//   if (loading || isLoading) {
//     return <LoadingSpinner />;
//   }

//   if (!user) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-4">
//               <h1 className="text-2xl font-bold text-gray-900">
//                 Skill Swap Platform
//               </h1>
//             </div>
//             <nav className="flex items-center space-x-4">
//               <button
//                 onClick={() => router.push("/profile")}
//                 className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
//               >
//                 Profile
//               </button>
//               <button
//                 onClick={() => router.push("/requests")}
//                 className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
//               >
//                 Requests
//               </button>
//               <button
//                 onClick={() => router.push("/leaderboard")}
//                 className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
//               >
//                 Leaderboard
//               </button>
//               <button
//                 onClick={async () => {
//                   try {
//                     await fetch("/api/auth/logout", { method: "POST" }); 
//                     router.push("/login");
//                   } catch (err) {
//                     console.error("Logout failed", err);
//                   }
//                 }}
//                 className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
//               >
//                 Logout
//               </button>
//             </nav>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Search and Filter Section */}
//         <div className="mb-8">
//           <div className="flex flex-col sm:flex-row gap-4 mb-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search by name or skills..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
//             >
//               <Filter className="w-5 h-5" />
//               Filters
//             </button>
//           </div>

//           {showFilters && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               className="mb-4"
//             >
//               <SearchFilters filters={filters} setFilters={setFilters} />
//             </motion.div>
//           )}
//         </div>

//         {/* Stats Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white rounded-xl p-6 shadow-sm border"
//           >
//             <div className="flex items-center">
//               <Users className="w-8 h-8 text-blue-600" />
//               <div className="ml-4">
//                 <p className="text-2xl font-bold text-gray-900">
//                   {profiles.length}
//                 </p>
//                 <p className="text-gray-600">Active Members</p>
//               </div>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="bg-white rounded-xl p-6 shadow-sm border"
//           >
//             <div className="flex items-center">
//               <Star className="w-8 h-8 text-yellow-600" />
//               <div className="ml-4">
//                 <p className="text-2xl font-bold text-gray-900">
//                   {profiles.reduce(
//                     (acc, profile) => acc + profile.skillsOffered.length,
//                     0
//                   )}
//                 </p>
//                 <p className="text-gray-600">Skills Available</p>
//               </div>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="bg-white rounded-xl p-6 shadow-sm border"
//           >
//             <div className="flex items-center">
//               <Award className="w-8 h-8 text-green-600" />
//               <div className="ml-4">
//                 <p className="text-2xl font-bold text-gray-900">
//                   {profiles.reduce(
//                     (acc, profile) => acc + (profile.points || 0),
//                     0
//                   )}
//                 </p>
//                 <p className="text-gray-600">Total Points</p>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Profiles Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredProfiles.map((profile, index) => (
//             <motion.div
//               key={profile._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <ProfileCard profile={profile} />
//             </motion.div>
//           ))}
//         </div>

//         {filteredProfiles.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg">
//               No profiles found matching your criteria.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Star, Users, Award, Zap, Target, Trophy } from "lucide-react"
import ProfileCard from "@/components/ProfileCard"
import SearchFilters from "@/components/SearchFilters"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [profiles, setProfiles] = useState([])
  const [filteredProfiles, setFilteredProfiles] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    skills: [],
    availability: "",
    location: "",
  })
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    fetchProfiles()
  }, [])

  useEffect(() => {
    filterProfiles()
  }, [profiles, searchTerm, filters])

  const fetchProfiles = async () => {
    try {
      const response = await fetch("/api/profiles/public")
      if (response.ok) {
        const data = await response.json()
        setProfiles(data)
      }
    } catch (error) {
      console.error("Error fetching profiles:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterProfiles = () => {
    let filtered = profiles

    if (searchTerm) {
      filtered = filtered.filter(
        (profile) =>
          profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.skillsOffered.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
          profile.skillsWanted.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (filters.skills.length > 0) {
      filtered = filtered.filter((profile) =>
        filters.skills.some((skill) => profile.skillsOffered.includes(skill) || profile.skillsWanted.includes(skill)),
      )
    }

    if (filters.availability) {
      filtered = filtered.filter((profile) => profile.availability.includes(filters.availability))
    }

    if (filters.location) {
      filtered = filtered.filter((profile) => profile.location?.toLowerCase().includes(filters.location.toLowerCase()))
    }

    setFilteredProfiles(filtered)
  }

  if (loading || isLoading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-cyber-dark relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 cyber-grid-bg opacity-20"></div>
      <div className="fixed top-0 left-0 w-full h-full">
        {[...Array(20)].map((_, i) => (
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

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 bg-cyber-dark/80 backdrop-blur-md border-b border-neon-purple/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div className="flex items-center space-x-4" whileHover={{ scale: 1.05 }}>
              <div className="w-10 h-10 bg-gradient-to-r from-neon-pink to-neon-blue rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-cyber font-bold neon-text">SKILL NEXUS</h1>
            </motion.div>

            <nav className="hidden md:flex items-center space-x-6">
              {[
                { name: "Profile", path: "/profile", icon: Target },
                { name: "Requests", path: "/requests", icon: Users },
                { name: "Leaderboard", path: "/leaderboard", icon: Trophy },
              ].map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => router.push(item.path)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-neon-pink px-4 py-2 rounded-lg transition-all duration-300 hover:bg-cyber-purple/20 border border-transparent hover:border-neon-pink/30"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-gaming font-medium">{item.name}</span>
                </motion.button>
              ))}

              <motion.button
                onClick={() => {
                  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
                  router.push("/login")
                }}
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-6 py-2 rounded-lg font-gaming font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-red-500/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                LOGOUT
              </motion.button>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button className="md:hidden text-neon-pink" whileTap={{ scale: 0.9 }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-cyber font-bold mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="neon-text">SKILL</span> <span className="text-white">EXCHANGE</span>{" "}
            <span className="neon-text">ARENA</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 font-gaming max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Connect with fellow gamers and level up your skills in the ultimate learning battleground
          </motion.p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neon-blue w-5 h-5 group-hover:text-neon-pink transition-colors duration-300" />
              <input
                type="text"
                placeholder="Search players by name or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-cyber-dark/50 border border-neon-purple/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-pink focus:border-neon-pink text-white placeholder-gray-400 transition-all duration-300 backdrop-blur-sm font-gaming"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-pink/10 to-neon-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-3 px-6 py-4 bg-cyber-purple/20 border border-neon-blue/50 rounded-xl hover:bg-cyber-purple/40 hover:border-neon-blue text-neon-blue font-gaming font-medium transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="w-5 h-5" />
              FILTERS
            </motion.button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <SearchFilters filters={filters} setFilters={setFilters} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Users, value: profiles.length, label: "Active Players", color: "neon-blue", delay: 0.1 },
            {
              icon: Star,
              value: profiles.reduce((acc, profile) => acc + profile.skillsOffered.length, 0),
              label: "Skills Available",
              color: "neon-pink",
              delay: 0.2,
            },
            {
              icon: Award,
              value: profiles.reduce((acc, profile) => acc + (profile.points || 0), 0),
              label: "Total XP",
              color: "neon-green",
              delay: 0.3,
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: stat.delay }}
              className="gaming-card group cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-r from-${stat.color}/20 to-${stat.color}/10 flex items-center justify-center border border-${stat.color}/30 group-hover:shadow-${stat.color.replace("-", "-")} transition-all duration-300`}
                  >
                    <stat.icon
                      className={`w-8 h-8 text-${stat.color} group-hover:scale-110 transition-transform duration-300`}
                    />
                  </div>
                  <div>
                    <motion.p
                      className="text-3xl font-cyber font-bold text-white"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: stat.delay + 0.3, type: "spring" }}
                    >
                      {stat.value.toLocaleString()}
                    </motion.p>
                    <p className="text-gray-400 font-gaming">{stat.label}</p>
                  </div>
                </div>
                <div className="w-2 h-16 bg-gradient-to-b from-transparent via-neon-purple to-transparent rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Profiles Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <AnimatePresence>
            {filteredProfiles.map((profile, index) => (
              <motion.div
                key={profile._id}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.8 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                layout
              >
                <ProfileCard profile={profile} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProfiles.length === 0 && !isLoading && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 rounded-full flex items-center justify-center border border-neon-purple/30">
              <Search className="w-12 h-12 text-neon-purple" />
            </div>
            <p className="text-2xl text-gray-400 font-gaming mb-2">No players found</p>
            <p className="text-gray-500 font-gaming">Try adjusting your search criteria</p>
          </motion.div>
        )}
      </div>

      {/* Floating Action Button for Mobile */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-neon-pink to-neon-purple rounded-full flex items-center justify-center shadow-neon-purple md:hidden z-20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <Search className="w-6 h-6 text-white" />
      </motion.button>
    </div>
  )
}