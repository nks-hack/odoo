import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import Room from "@/models/Room"

export async function GET(request, { params }) {
  try {
    await connectDB()

    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const roomId = params.id

    const room = await Room.findById(roomId).populate("participants", "name profilePhoto").populate("swapRequest")

    if (!room) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 })
    }

    // Check if user is participant
    const isParticipant = room.participants.some((p) => p._id.toString() === decoded.userId)
    if (!isParticipant) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    return NextResponse.json(room)
  } catch (error) {
    console.error("Room fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
