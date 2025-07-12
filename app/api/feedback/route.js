import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import Feedback from "@/models/Feedback"
import User from "@/models/User"

export async function POST(request) {
  try {
    await connectDB()

    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { rating, feedback, receiverId, roomId } = await request.json()

    // Create feedback
    const newFeedback = await Feedback.create({
      giver: decoded.userId,
      receiver: receiverId,
      room: roomId,
      rating,
      feedback,
    })

    // Update receiver's stats
    const receiver = await User.findById(receiverId)
    const allFeedbacks = await Feedback.find({ receiver: receiverId })

    const totalRating = allFeedbacks.reduce((sum, fb) => sum + fb.rating, 0)
    const averageRating = totalRating / allFeedbacks.length

    receiver.averageRating = averageRating
    receiver.totalReviews = allFeedbacks.length

    // Award points
    receiver.points = (receiver.points || 0) + 10

    // Check for badges
    const badges = []
    if (receiver.points >= 100 && !receiver.badges.includes("Rising Star")) {
      badges.push("Rising Star")
    }
    if (receiver.points >= 500 && !receiver.badges.includes("Knowledge Seeker")) {
      badges.push("Knowledge Seeker")
    }
    if (receiver.points >= 1000 && !receiver.badges.includes("Skill Master")) {
      badges.push("Skill Master")
    }
    if (averageRating >= 4.5 && receiver.totalReviews >= 10 && !receiver.badges.includes("Community Helper")) {
      badges.push("Community Helper")
    }

    receiver.badges = [...new Set([...receiver.badges, ...badges])]
    await receiver.save()

    // Award points to giver too
    const giver = await User.findById(decoded.userId)
    giver.points = (giver.points || 0) + 5
    await giver.save()

    return NextResponse.json(newFeedback, { status: 201 })
  } catch (error) {
    console.error("Feedback creation error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
