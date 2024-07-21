import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: false,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    required: false,
  },
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
