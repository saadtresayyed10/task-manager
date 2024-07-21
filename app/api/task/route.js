import connectToDB from "@/libs/db";
import Task from "@/model/task";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, description, dueDate, priority } = await request.json();
  await connectToDB();
  await Task.create({ title, description, dueDate, priority });
  return NextResponse.json({ message: "Task created" }, { status: 201 });
}

export async function GET() {
  await connectToDB();
  const tasks = await Task.find();
  return NextResponse.json({ tasks }, { status: 200 });
}

export async function DELETE(request) {
  await connectToDB();
  const id = request.nextUrl.searchParams.get("id");
  await Task.findByIdAndDelete(id);
  return NextResponse.json({ message: "Task Deleted" }, { status: 200 });
}
