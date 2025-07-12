import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function GET(request) {
  try {
    await connectDB()

    const token = request.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      skillsOffered: user.skillsOffered,
      skillsWanted: user.skillsWanted,
      points: user.points,
      badges: user.badges,
      profilePhoto: user.profilePhoto,
      location: user.location,
      bio: user.bio,
      availability: user.availability,
      isPublic: user.isPublic,
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }
}
