import mongoose, { Schema } from "mongoose";

const restaurantSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  bestDish: {
    type: String,
  },
  preparationTime: {
    type: Number,
  },
  heroUrl: {
    type: String,
  },
  posterUrl: {
    type: String,
  },
  avgRating: {
    type: Number,
    default: 0,
  },
  numberOfVisitors: {
    type: Number,
    default: 0,
  },
  reviewIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Restaurant =
  mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
