import connectMongoDB from "@/libs/mongoDb";
import User from "@/models/user";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

const cleanToken = (token) => {
  return token.split("Bearer ")[1];
};

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    await connectMongoDB();
    const user = await User.findOne({ email });
    if (user.password === password) {
      const token = jwt.sign({ user }, process.env.SECRET_KEY);
      return NextResponse.json({
        message: "logged In successfully",
        success: true,
        token,
        username: user.name,
        userId: user._id,
      });
    }
    return NextResponse.json({
      message: "Wrong email or password",
      success: false,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error logging in", success: false });
  }
}

export async function GET() {
  try {
    const token = cleanToken((await headers()).get("authorization"));
    await connectMongoDB();
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    return NextResponse.json({
      message: "Logged In Successfully",
      success: true,
      username: decodedToken.user?.name,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error Logging in",
      error,
      success: false,
    });
  }
}
