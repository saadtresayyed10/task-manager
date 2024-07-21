"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddListPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/task", {
        title,
        description,
        dueDate,
        priority,
      });
      setMessage("Task added successfully!");
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("low");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      setMessage("Failed to add task");
      console.error(error);
    }
  };

  return (
    <div className="flex lg:gap-y-4 justify-center items-center flex-col">
      <h1 className="my-4 text-4xl text-center font-bold">Add Task</h1>
      {message && <p>{message}</p>}
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
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddListPage;
