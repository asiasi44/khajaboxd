import connectMongoDB from "@/libs/mongoDb";
import List from "@/models/list";
import { NextResponse } from "next/server";


export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  try {
    await connectMongoDB();
    const updatedList = await List.findByIdAndUpdate(id, { ...body });
    return NextResponse.json({
      message: "Updated List succesfully",
      data: updatedList,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error updating List",
      error,
      success: true,
    });
  }
}

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    await connectMongoDB();
    const list = await List.findById(id);
    return NextResponse.json({
      message: "List Fetched Succesfully",
      success: true,
      data: list,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error Fetching List",
        success: false,
        error,
      },
      { status: 500 }
    );
  }
}
export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    await connectMongoDB();
    const deletedList = await List.findByIdAndDelete(id);
    return NextResponse.json({
      message: "Deleted list succesfully",
      data: deletedList,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error Deleting List",
      error,
      success: false,
    });
  }
}
