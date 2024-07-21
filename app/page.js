"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/task");
        setTasks(response.data.tasks);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchTasks();
  }, []);

  if (error) return <div>Error... {error}</div>;

  return (
    <div>
      <h1>Task List:</h1>
      {tasks.map((task) => (
        <div
          key={task._id}
          className="border-2 border-black flex flex-col justify-center items-center"
        >
          <h2>{task.title}</h2>
          <h2>{task.description}</h2>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
