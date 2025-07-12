"use client"

import { useState } from "react"
import { X, Plus } from "lucide-react"

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
  "Public Speaking",
  "Project Management",
  "Excel",
  "Photoshop",
]

export default function SkillSelector({ selectedSkills, onChange, placeholder }) {
  const [inputValue, setInputValue] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  const filteredSuggestions = POPULAR_SKILLS.filter(
    (skill) => skill.toLowerCase().includes(inputValue.toLowerCase()) && !selectedSkills.includes(skill),
  )

  const addSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      onChange([...selectedSkills, skill])
    }
    setInputValue("")
    setShowSuggestions(false)
  }

  const removeSkill = (skillToRemove) => {
    onChange(selectedSkills.filter((skill) => skill !== skillToRemove))
  }

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      addSkill(inputValue.trim())
    }
  }

  return (
    <div className="relative">
      {/* Selected Skills */}
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedSkills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
            setShowSuggestions(true)
          }}
          onKeyDown={handleInputKeyDown}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Suggestions Dropdown */}
        {showSuggestions && (inputValue || selectedSkills.length === 0) && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {inputValue && !POPULAR_SKILLS.some((skill) => skill.toLowerCase() === inputValue.toLowerCase()) && (
              <button
                type="button"
                onClick={() => addSkill(inputValue)}
                className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center"
              >
                <Plus className="w-4 h-4 mr-2 text-green-600" />
                Add "{inputValue}"
              </button>
            )}

            {filteredSuggestions.map((skill, index) => (
              <button
                key={index}
                type="button"
                onClick={() => addSkill(skill)}
                className="w-full px-3 py-2 text-left hover:bg-gray-50"
              >
                {skill}
              </button>
            ))}

            {filteredSuggestions.length === 0 && !inputValue && (
              <div className="px-3 py-2 text-gray-500 text-sm">Start typing to add skills...</div>
            )}
          </div>
        )}
      </div>

      {/* Popular Skills (when no input) */}
      {!inputValue && selectedSkills.length < 5 && (
        <div className="mt-3">
          <p className="text-sm text-gray-600 mb-2">Popular skills:</p>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SKILLS.filter((skill) => !selectedSkills.includes(skill))
              .slice(0, 8)
              .map((skill, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => addSkill(skill)}
                  className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                >
                  + {skill}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}