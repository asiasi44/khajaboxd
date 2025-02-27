import List from "@/models/list";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import connectMongoDB from "@/libs/mongoDb";
import Restaurant from "@/models/restaurant";

const jwt = require("jsonwebtoken");

const cleanToken = (token) => {
  return token.split("Bearer ")[1];
};

export async function POST(request, { params }) {
  const body = await request.json();
  const token = cleanToken((await headers()).get("authorization"));
  await connectMongoDB();
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decodedToken.user._id;
  try {
    const createdList = await List.create({
      ...body,
      userId,
    });

    return NextResponse.json({
      message: "Added List Succesfully",
      data: createdList,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error Creating List",
      error,
      success: false,
    });
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const lists = await List.find({}).populate(["restaurantIds", "userId"]);
    return NextResponse.json({
      message: "Lists Fetched Succesfully",
      data: lists,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching Lists",
      error,
      success: false,
    });
  }
}
