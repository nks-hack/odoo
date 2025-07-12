import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import SwapRequest from "@/models/SwapRequest"
import Room from "@/models/Room"

export async function PUT(request, { params }) {
  try {
    await connectDB()

    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { action } = await request.json()
    const requestId = params.id

    const swapRequest = await SwapRequest.findById(requestId)
    if (!swapRequest) {
      return NextResponse.json({ message: "Request not found" }, { status: 404 })
    }

    // Check authorization
    if (action === "accept" || action === "reject") {
      if (swapRequest.receiver.toString() !== decoded.userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
      }
    } else if (action === "cancel") {
      if (swapRequest.sender.toString() !== decoded.userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
      }
    }

    // Update request status
    swapRequest.status = action === "cancel" ? "cancelled" : action + "ed"

    // Create room if accepted
    if (action === "accept") {
      const room = await Room.create({
        participants: [swapRequest.sender, swapRequest.receiver],
        swapRequest: swapRequest._id,
        status: "active",
      })
      swapRequest.roomId = room._id
    }

    await swapRequest.save()

    const populatedRequest = await SwapRequest.findById(swapRequest._id)
      .populate("sender", "name profilePhoto")
      .populate("receiver", "name profilePhoto")

    return NextResponse.json(populatedRequest)
  } catch (error) {
    console.error("Request update error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
