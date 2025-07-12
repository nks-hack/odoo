"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Camera, MapPin, Save } from "lucide-react"
import LoadingSpinner from "@/components/LoadingSpinner"
import SkillSelector from "@/components/SkillSelector"
import toast from "react-hot-toast"

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState({
    name: "",
    location: "",
    skillsOffered: [],
    skillsWanted: [],
    availability: [],
    isPublic: true,
    profilePhoto: "",
    bio: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [photoUploading, setPhotoUploading] = useState(false)

  const availabilityOptions = [
    "Weekdays Morning",
    "Weekdays Afternoon",
    "Weekdays Evening",
    "Weekend Morning",
    "Weekend Afternoon",
    "Weekend Evening",
  ]

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    } else if (user) {
      fetchProfile()
    }
  }, [user, loading, router])

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/profile")
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      })

      if (response.ok) {
        toast.success("Profile updated successfully!")
      } else {
        throw new Error("Failed to update profile")
      }
    } catch (error) {
      toast.error("Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setPhotoUploading(true)
    const formData = new FormData()
    formData.append("photo", file)

    try {
      const response = await fetch("/api/upload/photo", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setProfile({ ...profile, profilePhoto: data.url })
        toast.success("Photo uploaded successfully!")
      } else {
        throw new Error("Failed to upload photo")
      }
    } catch (error) {
      toast.error("Failed to upload photo")
    } finally {
      setPhotoUploading(false)
    }
  }

  const handleAvailabilityChange = (option) => {
    const newAvailability = profile.availability.includes(option)
      ? profile.availability.filter((item) => item !== option)
      : [...profile.availability, option]

    setProfile({ ...profile, availability: newAvailability })
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
            <h1 className="text-xl font-semibold text-gray-900">My Profile</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Photo Section */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {profile.profilePhoto ? (
                    <img
                      src={profile.profilePhoto || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    disabled={photoUploading}
                  />
                </label>
              </div>
              {photoUploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  required
                  className="input-field"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="input-field pl-10"
                    placeholder="City, Country"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={3}
                className="input-field"
                placeholder="Tell others about yourself..."
              />
            </div>

            {/* Skills Offered */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills I Can Teach *</label>
              <SkillSelector
                selectedSkills={profile.skillsOffered}
                onChange={(skills) => setProfile({ ...profile, skillsOffered: skills })}
                placeholder="Add skills you can teach..."
              />
            </div>

            {/* Skills Wanted */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills I Want to Learn *</label>
              <SkillSelector
                selectedSkills={profile.skillsWanted}
                onChange={(skills) => setProfile({ ...profile, skillsWanted: skills })}
                placeholder="Add skills you want to learn..."
              />
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availabilityOptions.map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={profile.availability.includes(option)}
                      onChange={() => handleAvailabilityChange(option)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Profile Visibility</h3>
                  <p className="text-sm text-gray-500">Make your profile visible to other users for skill swapping</p>
                </div>
                <button
                  type="button"
                  onClick={() => setProfile({ ...profile, isPublic: !profile.isPublic })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    profile.isPublic ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      profile.isPublic ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                <Save className="w-5 h-5" />
                {isSaving ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
