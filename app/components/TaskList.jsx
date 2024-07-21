"use client";

import axios from "axios";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import RemoveBtn from "./RemoveBtn";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/task");
        setTasks(res.data.tasks);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchTasks();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <>
      <h1 className="font-unbounded font-bold lg:text-4xl text-center">
        Your Tasks
      </h1>
      <div className="mt-5 grid lg:grid-cols-3 lg:gap-4">
        {tasks.map((task) => (
          <div
            className="flex font-unbounded text-base shadow-[0.25rem_0.25rem_0px_0px_rgba(0,0,0,1)] rounded-md dark:bg-pink-300 bg-purple-500 justify-center items-center flex-col lg:m-4 border-2 border-black dark:border-white lg:p-2 "
            key={task._id}
          >
            <h2>Task: {task.title}</h2>
            <p>Description: {task.description}</p>
            <h1>
              Due Date: {task.dueDate ? formatDate(task.dueDate) : "Not set"}
            </h1>
            <h2>Priority: {task.priority}</h2>
            <div className="lg:mt-6 lg:gap-x-24 flex justify-between items-center">
              <Link href={`/editTask/${task._id}`}>
                <PencilIcon className="rounded-md w-6 h-6 bg-white border-2 dark:text-black border-black" />
              </Link>
              <RemoveBtn id={task._id} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskList;
