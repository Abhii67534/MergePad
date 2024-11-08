import React, { useState } from "react";
import Navbar from "./Navbar";
import { Room } from "@/app/Room";
import { Editor } from "./Editor";

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  color: string;
  userType?: "creator" | "editor" | "viewer";
}
interface CollaborativeRoomProps {
  roomId: string;
  roomMetadata: {
    creatorId: string;
    email: string;
    title: string;
  };
  users: User[];
  currentUserType: "creator" | "editor" | "viewer";
}

const CollaborativeRoom = ({ roomId,roomMetadata ,users,currentUserType}: CollaborativeRoomProps) => {
  return (
    <div className="bg-dark-theme min-h-screen">
      <main>
        <Room roomId={roomId}>
        <Navbar roomId={roomId} roomMetadata={roomMetadata} /> 
          <Editor roomId= {roomId} currentUserType={currentUserType}/>
        </Room>
      </main>
    </div>
  );
};

export default CollaborativeRoom;
