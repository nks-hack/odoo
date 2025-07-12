// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { useAuth } from "@/contexts/AuthContext"
// import { motion } from "framer-motion"
// import { Eye, EyeOff, Mail, Lock } from "lucide-react"
// import Link from "next/link"
// import toast from "react-hot-toast"

// export default function LoginPage() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const { user, login } = useAuth()
//   const router = useRouter()

//   useEffect(() => {
//     if (user) {
//       router.push("/")
//     }
//   }, [user, router])

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)

//     try {
//       await login(formData.email, formData.password)
//       toast.success("Welcome back!")
//       router.push("/")
//     } catch (error) {
//       toast.error(error.message || "Login failed")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//   }

//   if (user) {
//     return null
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
//             <p className="text-gray-600">Sign in to your Skill Swap account</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                 Email
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
//             >
//               {isLoading ? "Signing in..." : "Sign In"}
//             </button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-gray-600">
//               {"Don't have an account? "}
//               <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, Shield, GamepadIcon } from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { user, login } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [user, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(formData.email, formData.password)
      toast.success("Welcome back, Player!")
      router.push("/")
    } catch (error) {
      toast.error(error.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (user) {
    return null
  }

  return (
    <div className="min-h-screen bg-cyber-dark relative overflow-hidden flex items-center justify-center px-4">
      {/* Animated Background */}
      <div className="fixed inset-0 cyber-grid-bg opacity-20"></div>

      {/* Floating Particles */}
      <div className="fixed inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-purple rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Glowing Orbs */}
      <motion.div
        className="fixed top-20 left-20 w-64 h-64 bg-neon-pink/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="fixed bottom-20 right-20 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="max-w-md w-full relative z-10"
      >
        <div className="gaming-card backdrop-blur-xl border-2 border-neon-purple/30 relative overflow-hidden">
          {/* Hologram Effect */}
          <div className="absolute inset-0 hologram-effect opacity-20"></div>

          {/* Header */}
          <motion.div
            className="text-center mb-8 relative z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-neon-pink to-neon-blue rounded-xl flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring" }}
            >
              <GamepadIcon className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h1
              className="text-4xl font-cyber font-bold mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <span className="neon-text">PLAYER</span> <span className="text-white">LOGIN</span>
            </motion.h1>
            <p className="text-gray-400 font-gaming">Access your gaming profile</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <label htmlFor="email" className="block text-sm font-gaming font-medium text-neon-blue mb-2">
                EMAIL ADDRESS
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neon-purple w-5 h-5 group-hover:text-neon-pink transition-colors duration-300" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-cyber-dark/50 border border-neon-purple/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-pink focus:border-neon-pink text-white placeholder-gray-400 transition-all duration-300 backdrop-blur-sm font-gaming"
                  placeholder="Enter your email"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-pink/5 to-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <label htmlFor="password" className="block text-sm font-gaming font-medium text-neon-blue mb-2">
                PASSWORD
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neon-purple w-5 h-5 group-hover:text-neon-pink transition-colors duration-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-14 py-4 bg-cyber-dark/50 border border-neon-purple/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-pink focus:border-neon-pink text-white placeholder-gray-400 transition-all duration-300 backdrop-blur-sm font-gaming"
                  placeholder="Enter your password"
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neon-purple hover:text-neon-pink transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </motion.button>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-pink/5 to-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-neon-pink to-neon-purple hover:from-neon-purple hover:to-neon-blue text-white font-cyber font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-neon-purple border border-neon-purple/30 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center space-x-2"
                  >
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>ACCESSING...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center space-x-2"
                  >
                    <Shield className="w-5 h-5" />
                    <span>LOGIN</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Button Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            </motion.button>
          </form>

          <motion.div
            className="mt-8 text-center relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-gray-400 font-gaming">
              New to the arena?{" "}
              <Link
                href="/signup"
                className="text-neon-pink hover:text-neon-blue font-bold transition-colors duration-300 hover:underline"
              >
                CREATE ACCOUNT
              </Link>
            </p>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-neon-pink rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-0 w-1 h-8 bg-gradient-to-b from-transparent via-neon-purple to-transparent"></div>
          <div className="absolute top-1/2 right-0 w-1 h-8 bg-gradient-to-b from-transparent via-neon-pink to-transparent"></div>
        </div>

        {/* Additional Gaming Elements */}
        <motion.div
          className="absolute -top-10 -right-10 w-20 h-20 border-2 border-neon-blue/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-16 h-16 border-2 border-neon-pink/30 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </motion.div>
    </div>
  )
}