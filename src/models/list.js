import mongoose, { Schema } from "mongoose";

const listSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  restaurantIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  ],
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

const List = mongoose.models.List || mongoose.model("List", listSchema);

export default List;
