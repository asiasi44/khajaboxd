import connectMongoDB from "@/libs/mongoDb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    await connectMongoDB();
    await User.create({
      name,
      email,
      password,
      reviewIds: [],
    });
    return NextResponse.json(
      { message: "User Created", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error creating User",
      success: false,
    });
  }
}

export async function GET() {
  await connectMongoDB();
  const users = await User.find({});
  return NextResponse.json({ users });
}

export async function DELETE(request, { params }) {
  await connectMongoDB();
  const deletedUsers = await User.deleteMany({});
  return NextResponse.json({ deletedUsers });
}
