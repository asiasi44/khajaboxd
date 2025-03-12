import connectMongoDB from "@/libs/mongoDb";
import { NextResponse } from "next/server";
import Review from "@/models/review";
import mongoose from "mongoose";

export async function POST(request, { params }) {
  const { id } = params;
  const { newLikedUser } = await request.json();

  await connectMongoDB();

  const review = await Review.findById(id);

  if (!review) {
    return NextResponse.json(
      { message: "Review not found", success: false },
      { status: 404 }
    );
  }

  // Check if user already liked the review
  if (review.likedUsers.includes(newLikedUser)) {
    return NextResponse.json(
      { message: "User already liked this review", success: false },
      { status: 400 }
    );
  }

  // Update only if user hasn't liked it yet
  await Review.findByIdAndUpdate(
    id,
    {
      $addToSet: { likedUsers: newLikedUser }, // Prevents duplicate entries
      $inc: { numberOfLikes: 1 }, // Increments like count
    },
    { new: true }
  );

  return NextResponse.json({
    message: "Successfully Liked Review",
    success: true,
  });
}

export async function DELETE(request, { params }) {
  const { id } = params;
  const { newDislikedUser } = await request.json();

  await connectMongoDB();

  const review = await Review.findById(id);

  if (!review) {
    return NextResponse.json(
      { message: "Review not found", success: false },
      { status: 404 }
    );
  }

  // Check if user is in likedUsers before attempting to remove
  if (!review.likedUsers.includes(newDislikedUser)) {
    return NextResponse.json(
      { message: "User has not liked this review", success: false },
      { status: 400 }
    );
  }

  // Remove user from likedUsers and decrement likes
  await Review.findByIdAndUpdate(
    id,
    {
      $pull: { likedUsers: new mongoose.Types.ObjectId(`${newDislikedUser}`) },
      $inc: { numberOfLikes: -1 }, // Decrease like count (won't go below 0)
    },
    { new: true }
  );

  return NextResponse.json({
    message: "Successfully Unliked Review",
    success: true,
  });
}
