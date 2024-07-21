import connectToDB from "@/libs/db";
import Task from "@/model/task";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, description } = await request.json();
  await connectToDB();
  await Task.create({ title, description });
  return NextResponse.json({ message: "Task created" }, { status: 201 });
}
