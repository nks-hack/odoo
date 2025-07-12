"use client"

import { useState } from "react"
import { X } from "lucide-react"

const POPULAR_SKILLS = [
  "JavaScript",
  "Python",
  "React",
  "Node.js",
  "HTML/CSS",
  "Java",
  "C++",
  "Data Science",
  "Machine Learning",
  "UI/UX Design",
  "Graphic Design",
  "Photography",
  "Video Editing",
  "Writing",
  "Marketing",
  "Spanish",
  "French",
  "Guitar",
  "Piano",
  "Cooking",
  "Yoga",
  "Fitness Training",
]

const AVAILABILITY_OPTIONS = [
  "Weekdays Morning",
  "Weekdays Afternoon",
  "Weekdays Evening",
  "Weekend Morning",
  "Weekend Afternoon",
  "Weekend Evening",
]

export default function SearchFilters({ filters, setFilters }) {
  const [skillInput, setSkillInput] = useState("")

  const addSkillFilter = (skill) => {
    if (!filters.skills.includes(skill)) {
      setFilters({
        ...filters,
        skills: [...filters.skills, skill],
      })
    }
    setSkillInput("")
  }

  const removeSkillFilter = (skillToRemove) => {
    setFilters({
      ...filters,
      skills: filters.skills.filter((skill) => skill !== skillToRemove),
    })
  }

  const clearAllFilters = () => {
    setFilters({
      skills: [],
      availability: "",
      location: "",
    })
  }

  const hasActiveFilters = filters.skills.length > 0 || filters.availability || filters.location

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button onClick={clearAllFilters} className="text-sm text-blue-600 hover:text-blue-700">
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Skills Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>

          {/* Selected Skills */}
          {filters.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {filters.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                >
                  {skill}
                  <button onClick={() => removeSkillFilter(skill)} className="ml-1 text-blue-600 hover:text-blue-800">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Skill Input */}
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && skillInput.trim()) {
                e.preventDefault()
                addSkillFilter(skillInput.trim())
              }
            }}
            placeholder="Add skill filter..."
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          {/* Popular Skills */}
          <div className="mt-2">
            <div className="flex flex-wrap gap-1">
              {POPULAR_SKILLS.filter((skill) => !filters.skills.includes(skill))
                .slice(0, 6)
                .map((skill, index) => (
                  <button
                    key={index}
                    onClick={() => addSkillFilter(skill)}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                  >
                    + {skill}
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Availability Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
          <select
            value={filters.availability}
            onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Any time</option>
            {AVAILABILITY_OPTIONS.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            placeholder="City, Country"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  )
}
