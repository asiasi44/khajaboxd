import connectMongoDB from "@/libs/mongoDb";
import Restaurant from "@/models/restaurant";
import { NextResponse } from "next/server";
export const dynamic = "force-static";

export async function POST(request) {
  try {
    const { name, description, bestDish, preparationTime, heroUrl, posterUrl } =
      await request.json();
    await connectMongoDB();
    const restaurant = await Restaurant.create({
      name,
      description,
      bestDish,
      preparationTime,
      heroUrl,
      posterUrl,
      reviewIds: [],
    });
    return NextResponse.json(
      { message: "Restaurant Created", data: restaurant, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error creating Restaurant",
      success: false,
    });
  }
}

export async function GET() {
  await connectMongoDB();
  const restaurants = await Restaurant.find({});
  return NextResponse.json({ restaurants });
}

export async function DELETE(request, { params }) {
  await connectMongoDB();
  const deletedRestaurants = await Restaurant.deleteMany({});
  return NextResponse.json({ deletedRestaurants });
}
