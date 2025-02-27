import connectMongoDB from "@/libs/mongoDb";
import { NextResponse } from "next/server";
import Review from "@/models/review";
import Restaurant from "@/models/restaurant";
import mongoose from "mongoose";

export async function POST(request, { params }) {
  const { id } = await params;
  const { newLikedUser } = await request.json();
  await connectMongoDB();
  const review = await Review.findById(id);
  review.likedUsers = [...(review.likedUsers || []), newLikedUser];
  review.numberOfLikes = review.numberOfLikes + 1;
  await review.save();
  return NextResponse.json({
    message: "Successfully Liked Review",
    success: true,
  });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const { newDislikedUser } = await request.json();

  await connectMongoDB();
  const review = await Review.findById(id);

  if (!review) {
    return NextResponse.json(
      { message: "Review not found", success: false },
      { status: 404 }
    );
  }

  review.likedUsers = review.likedUsers.filter(
    (user) => !user.equals(new mongoose.Types.ObjectId(newDislikedUser))
  );

  review.numberOfLikes = Math.max(0, review.numberOfLikes - 1);

  await review.save();

  return NextResponse.json({
    message: "Successfully Unliked Review",
    success: true,
  });
}
