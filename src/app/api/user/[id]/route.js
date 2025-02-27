import connectMongoDB from "@/libs/mongoDb";
import User from "@/models/user";
import { NextResponse } from "next/server";



export async function DELETE(request, {params}) {
    const { id } = params;
    await connectMongoDB();
    const deletedUser = await User.findByIdAndDelete(id);
    return NextResponse.json({"message": "User deleted Successfully", deletedUser})
}