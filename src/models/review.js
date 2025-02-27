import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  description: {
    type: String,
  },
  rating: {
    type: Number,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  numberOfLikes: {
    type: Number,
    default: 0,
  },
  likedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
