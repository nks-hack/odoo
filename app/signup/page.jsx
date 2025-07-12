"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, User, UserPlus, Zap } from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { user, signup } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [user, router])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    setIsLoading(true)

    try {
      await signup(formData.name, formData.email, formData.password)
      toast.success("Welcome to the arena, Player!")
      router.push("/profile")
    } catch (error) {
      toast.error(error.message || "Signup failed")
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
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-green rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Glowing Orbs */}
      <motion.div
        className="fixed top-10 right-10 w-80 h-80 bg-neon-green/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="fixed bottom-10 left-10 w-72 h-72 bg-neon-purple/10 rounded-full blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="max-w-md w-full relative z-10"
      >
        <div className="gaming-card backdrop-blur-xl border-2 border-neon-green/30 relative overflow-hidden">
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
              className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-neon-green to-neon-purple rounded-xl flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: "spring" }}
            >
              <UserPlus className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h1
              className="text-4xl font-cyber font-bold mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <span className="text-neon-green">JOIN</span> <span className="text-white">THE</span>{" "}
              <span className="neon-text">ARENA</span>
            </motion.h1>
            <p className="text-gray-400 font-gaming">Create your player profile</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <label htmlFor="name" className="block text-sm font-gaming font-medium text-neon-green mb-2">
                PLAYER NAME
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neon-purple w-5 h-5 group-hover:text-neon-green transition-colors duration-300" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-cyber-dark/50 border border-neon-purple/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-neon-green text-white placeholder-gray-400 transition-all duration-300 backdrop-blur-sm font-gaming"
                  placeholder="Enter your player name"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-green/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <label htmlFor="email" className="block text-sm font-gaming font-medium text-neon-green mb-2">
                EMAIL ADDRESS
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neon-purple w-5 h-5 group-hover:text-neon-green transition-colors duration-300" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-cyber-dark/50 border border-neon-purple/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-neon-green text-white placeholder-gray-400 transition-all duration-300 backdrop-blur-sm font-gaming"
                  placeholder="Enter your email"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-green/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <label htmlFor="password" className="block text-sm font-gaming font-medium text-neon-green mb-2">
                PASSWORD
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neon-purple w-5 h-5 group-hover:text-neon-green transition-colors duration-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-14 py-4 bg-cyber-dark/50 border border-neon-purple/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-neon-green text-white placeholder-gray-400 transition-all duration-300 backdrop-blur-sm font-gaming"
                  placeholder="Create a password"
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neon-purple hover:text-neon-green transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </motion.button>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-green/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
              <label htmlFor="confirmPassword" className="block text-sm font-gaming font-medium text-neon-green mb-2">
                CONFIRM PASSWORD
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neon-purple w-5 h-5 group-hover:text-neon-green transition-colors duration-300" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-14 py-4 bg-cyber-dark/50 border border-neon-purple/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-neon-green text-white placeholder-gray-400 transition-all duration-300 backdrop-blur-sm font-gaming"
                  placeholder="Confirm your password"
                />
                <motion.button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neon-purple hover:text-neon-green transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </motion.button>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-green/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-neon-green to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white font-cyber font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-neon-green border border-neon-green/30 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
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
                    <span>CREATING PROFILE...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center space-x-2"
                  >
                    <Zap className="w-5 h-5" />
                    <span>CREATE ACCOUNT</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Button Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-green/20 to-neon-purple/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            </motion.button>
          </form>

          <motion.div
            className="mt-8 text-center relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <p className="text-gray-400 font-gaming">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-neon-green hover:text-neon-pink font-bold transition-colors duration-300 hover:underline"
              >
                LOGIN HERE
              </Link>
            </p>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-2 h-2 bg-neon-purple rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-0 w-1 h-8 bg-gradient-to-b from-transparent via-neon-green to-transparent"></div>
          <div className="absolute top-1/2 right-0 w-1 h-8 bg-gradient-to-b from-transparent via-neon-purple to-transparent"></div>
        </div>

        {/* Additional Gaming Elements */}
        <motion.div
          className="absolute -top-10 -right-10 w-20 h-20 border-2 border-neon-green/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-16 h-16 border-2 border-neon-purple/30 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </motion.div>
    </div>
  )
}