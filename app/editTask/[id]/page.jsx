"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function EditTaskPage({ _id }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/task/${_id}`
        );
        const { title, description, dueDate, priority } = response.data.task;
        setTitle(title);
        setDescription(description);
        setDueDate(dueDate.split("T")[0]);
        setPriority(priority);
      } catch (error) {
        console.error("Failed to fetch task:", error);
      }
    };

    if (_id) {
      fetchTask();
    }
  }, [_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      await axios.put(`http://localhost:3000/api/task/${_id}`, {
        newTitle: title,
        newDescription: description,
        newDueDate: dueDate,
        newPriority: priority,
      });
      setMessage("Task updated successfully!");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      setError("Failed to update task");
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="flex lg:gap-y-4 justify-center items-center flex-col">
      <h1 className="my-4 text-4xl text-center font-bold">Edit Task</h1>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <input
          type="text"
          placeholder="Enter task title*"
          required
          className="py-1 px-3 border-2 border-black rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter task description*"
          required
          className="py-1 px-3 border-2 border-black rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          className="py-1 px-3 border-2 border-black rounded-md"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select
          className="py-1 px-3 border-2 border-black rounded-md"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          type="submit"
          className="border-2 border-black shadow-[0.25rem_0.25rem_0px_0px_rgba(0,0,0,1)] text-black bg-violet-500 py-1 px-2 rounded-md"
        >
          Update Task
        </button>
      </form>
    </div>
  );
}
