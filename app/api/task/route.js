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
  return NextResponse.json({ tasks });
}
