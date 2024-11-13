"use client";
import { UserButton } from "@clerk/nextjs";
import React, { useEffect, useRef, useState } from "react";
import Collaborators from "./Collaborators";
import { Input } from "./ui/input";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

type RoomMetadata = {
  creatorId: string;
  email: string;
  title: string;
};

interface NavbarProps {
  roomId: string;
  roomMetadata: RoomMetadata;
}

const Navbar = ({ roomId, roomMetadata }: NavbarProps) => {
  const currentUserType = "editor";
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Inside the Navbar component, updating the `updateTitleHandler` logic

  const updateTitleHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setLoading(true);
  
      try {
        if (documentTitle !== roomMetadata.title) {
          const title = documentTitle
          const response = await axios.post("https://merge-pad.vercel.app/api/update-document", {
            roomId,        
            title, 
          });
  
          if (response.status === 200) {
            setEditing(false);
            
          } 
        } 
      } catch (error) {
        console.error("Error updating title:", error);
      } 
      setLoading(false);
    }
  };
  
  
  // Focus input when editing starts
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setEditing(false); // Stop editing when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus(); // Auto-focus input when editing starts
    }
  }, [editing]);

  return (
    <header className="bg-dark-theme-nav text-white">
      <nav className="flex items-center justify-between px-5 py-2">
        {/* Left side: MergePad logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="MergePad Logo" className="h-[70px] mr-2" />
          <Link href='/' className="text-3xl font-bold"> Merge-Pad</Link>
        </div>

      
        <div className=" flex items-center justify-center">
          {editing ? (
            <Input
              ref={inputRef}
              type="text"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              onKeyDown={updateTitleHandler}
              autoFocus
              className="text-center bg-transparent border-b-2 border-white focus:outline-none focus:ring-0 max-w-[400px] w-full"
            />
          ) : (
            <div className="text-center font-bold text-xl">{documentTitle}</div>
          )}
          {currentUserType === "editor" && !editing && (
            <Image
              src="/edit.png"
              alt="edit"
              width={22}
              height={2}
              className="cursor-pointer ml-2"
              onClick={() => setEditing(true)}
            />
          )}
          {currentUserType !== "editor" && !editing && (
            <p className="view-only-tag">View only</p>
          )}

          {loading && <p className="text-center text-sm">Saving...</p>}
        </div>

        {/* Right side: Collaborators and UserButton */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Collaborators />
          <UserButton />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
