import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(request) {
  try {
    await connectDB()

    const { email, password } = await request.json()

    // Find user
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

    // Create response
    const response = NextResponse.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      skillsOffered: user.skillsOffered,
      skillsWanted: user.skillsWanted,
      points: user.points,
      badges: user.badges,
    })

    // Set HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
