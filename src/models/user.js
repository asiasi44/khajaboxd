import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  reviewIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ]
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
