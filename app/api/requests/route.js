import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import SwapRequest from "@/models/SwapRequest"

export async function GET(request) {
  try {
    await connectDB()

    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const requests = await SwapRequest.find({
      $or: [{ sender: decoded.userId }, { receiver: decoded.userId }],
    })
      .populate("sender", "name profilePhoto")
      .populate("receiver", "name profilePhoto")
      .sort({ createdAt: -1 })

    return NextResponse.json(requests)
  } catch (error) {
    console.error("Requests fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectDB()

    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { receiverId, offeredSkill, wantedSkill, message } = await request.json()

    // Check if request already exists
    const existingRequest = await SwapRequest.findOne({
      sender: decoded.userId,
      receiver: receiverId,
      status: "pending",
    })

    if (existingRequest) {
      return NextResponse.json({ message: "You already have a pending request with this user" }, { status: 400 })
    }

    const swapRequest = await SwapRequest.create({
      sender: decoded.userId,
      receiver: receiverId,
      offeredSkill,
      wantedSkill,
      message,
      status: "pending",
    })

    const populatedRequest = await SwapRequest.findById(swapRequest._id)
      .populate("sender", "name profilePhoto")
      .populate("receiver", "name profilePhoto")

    return NextResponse.json(populatedRequest, { status: 201 })
  } catch (error) {
    console.error("Request creation error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
