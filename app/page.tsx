"use client"

import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

export default function Home() {
  const router = useRouter(); // Initialize the router

  const handleClick = () => {
    router.push("/dashboard"); // Redirect to the dashboard
  };

  return (
    <> 
      <button className="bg-slate-200" onClick={handleClick}>
        Go to Editor
      </button>
    </>
  );
}
