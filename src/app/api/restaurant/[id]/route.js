import connectMongoDB from "@/libs/mongoDb";
import Restaurant from "@/models/restaurant";
import { NextResponse } from "next/server";
import Review from "@/models/review";
import User from "@/models/user";

export async function GET(request, { params }) {
  const { id } = await params;
  await connectMongoDB();
  const restaurant = await Restaurant.findById(id).populate({
    path: "reviewIds",
    populate: {
      path: "userId",
      select: ["name", "_id"],
    },
  });
  return NextResponse.json({ message: "here are the restaurants", restaurant });
}

export async function PUT(request, { params }) {
  const { id } = await params;
  await connectMongoDB();
  const body = await request.json();
  const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, {
    ...body,
  });
  return NextResponse.json({
    message: "Updated the given Restaurnt ",
    updatedRestaurant,
  });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
  return NextResponse.json({
    message: "Deleted Restaurant succesfully",
    deletedRestaurant,
  });
}
