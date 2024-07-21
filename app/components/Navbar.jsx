import Link from "next/link";
import DarkMode from "./DarkMode";

const Navbar = () => {
  return (
    <header className="w-full flex justify-between lg:p-8 p-4 border-b-2 border-black dark:border-white items-center bg-gradient-to-br  from-fuchsia-500 to-violet-700">
      <Link href="/addTask">
        <button className="lg:px-4 px-2 py-1 text-black border-2 border-black shadow-[0.25rem_0.25rem_0px_0px_rgba(0,0,0,1)] rounded-md font-semibold lg:text-base text-xs bg-white">
          Add Task
        </button>
      </Link>
      <Link
        href="/"
        className="lg:text-2xl text-lg font-semibold font-unbounded tracking-wide"
      >
        Saad Sayyed
      </Link>
      <DarkMode />
    </header>
  );
};

export default Navbar;
