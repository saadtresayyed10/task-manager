import connectToDB from "../../../../libs/db";
import Task from "../../../../model/task";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  await connectToDB();
  const {
    newTitle: title,
    newDescription: description,
    newDueDate: dueDate,
    newPriority: priority,
  } = await request.json();
  await Task.findByIdAndUpdate(id, { title, description, dueDate, priority });
  return NextResponse.json({ message: "Task Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectToDB();
  const task = await Task.findById(id);
  return NextResponse.json({ task }, { status: 200 });
}
