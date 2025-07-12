import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function GET() {
  try {
    await connectDB()

    const leaderboard = await User.find({ isPublic: true })
      .select("name profilePhoto points averageRating totalReviews badges completedSwaps")
      .sort({ points: -1, averageRating: -1 })
      .limit(50)

    return NextResponse.json(leaderboard)
  } catch (error) {
    console.error("Leaderboard fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
