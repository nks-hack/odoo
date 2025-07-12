import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    skillsOffered: [
      {
        type: String,
        trim: true,
      },
    ],
    skillsWanted: [
      {
        type: String,
        trim: true,
      },
    ],
    availability: [
      {
        type: String,
      },
    ],
    isPublic: {
      type: Boolean,
      default: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    badges: [
      {
        type: String,
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    completedSwaps: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.User || mongoose.model("User", userSchema)
