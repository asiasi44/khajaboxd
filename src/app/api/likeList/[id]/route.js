import connectMongoDB from "@/libs/mongoDb";
import { NextResponse } from "next/server";
import List from "@/models/list";
import Restaurant from "@/models/restaurant";
import User from "@/models/user";
import mongoose from "mongoose";
export const dynamic = 'force-static'

export async function POST(request, { params }) {
  const { id } = await params;
  const { newLikedUser } = await request.json();
  await connectMongoDB();
  const list = await List.findById(id);
  list.likedUsers = [...(list.likedUsers || []), newLikedUser];
  list.numberOfLikes = list.numberOfLikes + 1;
  await list.save();
  return NextResponse.json({
    message: "Successfully Liked List",
    data: list,
    success: true,
  });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const { newDislikedUser } = await request.json();

  await connectMongoDB();
  const list = await List.findById(id);

  if (!list) {
    return NextResponse.json(
      { message: "List not found", success: false, data: list },
      { status: 404 }
    );
  }

  list.likedUsers = list.likedUsers.filter(
    (user) => !user.equals(new mongoose.Types.ObjectId(newDislikedUser))
  );

  list.numberOfLikes = Math.max(0, list.numberOfLikes - 1);

  await list.save();

  return NextResponse.json({
    message: "Successfully Unliked List",
    success: true,
    data: list,
  });
}
