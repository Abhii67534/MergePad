"use client";
import { UserButton } from "@clerk/nextjs";
import React, { useEffect, useRef, useState } from "react";
import Collaborators from "./Collaborators";
import { Input } from "./ui/input";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useOthers } from "@liveblocks/react/suspense";

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

  const updateTitleHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setLoading(true);
  
      try {
        if (documentTitle !== roomMetadata.title) {
          const title = documentTitle;
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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);


  const x = useOthers();
  const collaborators = x.map((p) => p.info|| {}); 
    
  const handle = ()=>{
   
    console.log(x);
    console.log("COLLOB ",collaborators);
    
  }
  return (
    <header className="bg-dark-theme-nav text-white">
      <nav className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-2">
        
        {/* Left side: Logo */}
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <img src="/logo.png" alt="MergePad Logo" className="h-10 sm:h-[60px] mr-2" />
          <Link href="/" className="text-2xl sm:text-3xl font-bold">Merge-Pad</Link>
        </div>

        {/* Center: Document Title */}
        <div className="flex items-center justify-center text-center mb-2 sm:mb-0">
          {editing ? (
            <Input
              ref={inputRef}
              type="text"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              onKeyDown={updateTitleHandler}
              autoFocus
              className="text-center bg-transparent border-b-2 border-white focus:outline-none focus:ring-0 w-full max-w-[200px] sm:max-w-[400px]"
            />
          ) : (
            <div className="font-bold text-lg sm:text-xl md:text-xl">{documentTitle}</div>
          )}
          {currentUserType === "editor" && !editing && (
            <Image
              src="/edit.png"
              alt="edit"
              width={20}
              height={20}
              className="cursor-pointer ml-2"
              onClick={() => setEditing(true)}
            />
          )}
          {currentUserType !== "editor" && !editing && (
            <p className="view-only-tag text-sm sm:text-base">View only</p>
          )}

          {loading && <p className="text-center text-sm">Saving...</p>}
        </div>

        {/* Right side: Collaborators and UserButton */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Collaborators />
          <UserButton />
        </div>
        <button onClick={handle} >Click</button>
      </nav>
    </header>
  );
};

export default Navbar;
