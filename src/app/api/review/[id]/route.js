import connectMongoDB from "@/libs/mongoDb";
import { NextResponse } from "next/server";
import Review from "@/models/review";
import Restaurant from "@/models/restaurant";

export const dynamic = 'force-static'

export async function GET(request, { params }) {
  const { id } = await params;
  await connectMongoDB();
  const review = await Review.findById(id);
  return NextResponse.json({ message: "here are the restaurants", review });
}

export async function PUT(request, { params }) {
  const { id } = params;
  const { description, rating } = await request.json();
  await connectMongoDB();

  // Fetch the existing review
  const existingReview = await Review.findById(id);
  if (!existingReview) {
    return NextResponse.json(
      { message: "Review not found", success: false },
      { status: 404 }
    );
  }

  const restaurant = await Restaurant.findById(existingReview.restaurantId);
  if (!restaurant) {
    return NextResponse.json(
      { message: "Restaurant not found", success: false },
      { status: 404 }
    );
  }

  // Adjust the avgRating
  restaurant.avgRating =
    restaurant.avgRating +
    (rating - existingReview.rating) / restaurant.numberOfVisitors;

  // Update the review
  existingReview.description = description;
  existingReview.rating = rating;
  await existingReview.save();
  await restaurant.save();

  return NextResponse.json({
    message: "Review has been updated.",
    success: true,
    updatedReview: existingReview,
  });
}
export async function DELETE(request, { params }) {
  const { id } = params;
  console.log("id", id);
  await connectMongoDB();

  // Fetch the existing review
  const deletedReview = await Review.findById(id);
  if (!deletedReview) {
    return NextResponse.json(
      { message: "Review not found", success: false },
      { status: 404 }
    );
  }

  const restaurant = await Restaurant.findById(deletedReview.restaurantId);
  if (!restaurant) {
    return NextResponse.json(
      { message: "Restaurant not found", success: false },
      { status: 404 }
    );
  }

  // Remove the review from the restaurant's reviews array
  restaurant.reviewIds = restaurant.reviewIds.filter(
    (reviewId) => reviewId.toString() !== id
  );

  // Adjust the avgRating
  if (restaurant.numberOfVisitors > 1) {
    restaurant.avgRating =
      (restaurant.avgRating * restaurant.numberOfVisitors -
        deletedReview.rating) /
      (restaurant.numberOfVisitors - 1);
  } else {
    restaurant.avgRating = 0; // If the last review is deleted, reset avgRating
  }

  restaurant.numberOfVisitors = Math.max(restaurant.numberOfVisitors - 1, 0);
  await restaurant.save();

  // Delete the review
  await Review.findByIdAndDelete(id);

  return NextResponse.json({
    message: "Deleted Review successfully.",
    success: true,
  });
}
