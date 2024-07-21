"use client";

import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const RemoveBtn = ({ id }) => {
  const router = useRouter();

  const removeTask = async () => {
    const confirmed = confirm("Are you sure you want to delete?");

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <button>
      <TrashIcon className="rounded-md w-6 h-6 bg-white border-2 dark:text-black border-black" />
    </button>
  );
};

export default RemoveBtn;
