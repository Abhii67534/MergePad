import React, { useState } from "react";
import Navbar from "./Navbar";
import { Room } from "@/app/Room";
import { Editor } from "./Editor";

type roomMetadata={
  creatorId: string;
  email: string;
  title: string;
};

interface CollaborativeRoomProps {
  roomId: string;
  roomMetadata: {
    creatorId: string;
    email: string;
    title: string;
  };
}

const CollaborativeRoom = ({ roomId,roomMetadata }: CollaborativeRoomProps) => {
  return (
    <div className="bg-dark-theme min-h-screen">
      <main>
        <Room roomId={roomId}>
        <Navbar roomId={roomId} roomMetadata={roomMetadata} />
          <Editor />
        </Room>
      </main>
    </div>
  );
};

export default CollaborativeRoom;
