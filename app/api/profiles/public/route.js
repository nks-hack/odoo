import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function GET() {
  try {
    await connectDB()

    const profiles = await User.find({ isPublic: true }).select("-password -email").sort({ points: -1, createdAt: -1 })

    return NextResponse.json(profiles)
  } catch (error) {
    console.error("Public profiles fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
