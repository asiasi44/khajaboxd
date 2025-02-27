import connectMongoDB from "@/libs/mongoDb";
import Review from "@/models/review";
import User from "@/models/user";
import Restaurant from "@/models/restaurant";
import { NextResponse } from "next/server";
import { headers } from "next/headers";


const jwt = require("jsonwebtoken");

const cleanToken = (token) => {
  return token.split("Bearer ")[1];
};

export async function POST(request) {
  try {
    const { description, rating, restaurantId } = await request.json();
    const token = cleanToken((await headers()).get("authorization"));
    await connectMongoDB();
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.user._id;
    const newReview = await Review.create({
      description,
      rating,
      restaurantId,
      userId,
    });

    const user = await User.findById(userId);
    const restaurant = await Restaurant.findById(restaurantId);

    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    if (!restaurant) {
      return NextResponse.json(
        { message: "Restaurant not found", success: false },
        { status: 404 }
      );
    }

    user.reviewIds = [...(user.reviewIds || []), newReview.id];
    await user.save();
    restaurant.reviewIds = [...(restaurant.reviewIds || []), newReview.id];
    restaurant.avgRating =
      restaurant.avgRating +
      (rating - restaurant.avgRating) / (restaurant.numberOfVisitors + 1);
    restaurant.numberOfVisitors = restaurant.numberOfVisitors + 1;
    await restaurant.save();
    return NextResponse.json(
      { message: "Review Created", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error creating Review",
      success: false,
    });
  }
}

export async function GET() {
  await connectMongoDB();
  const reviews = await Review.find({});
  return NextResponse.json({ reviews });
}

export async function DELETE(request, { params }) {
  await connectMongoDB();
  const deletedReviews = await Review.deleteMany({});
  return NextResponse.json({ deletedReviews });
}
