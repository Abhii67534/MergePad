import React from "react";
import CollaborativeRoom from "@/components/CollaborativeRoom";
import axios from "axios";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface DocumentProps {
  params: Promise<{ id: string }>; // Update this to expect a Promise
}

type User = {
  name: string;
  email: string;
  avatar: string;
};

const Document = async ({ params }: DocumentProps) => {
  const { id } = await params; // Await the params Promise
  const user = await currentUser();
  const userId = user?.emailAddresses[0].emailAddress;

  const RoomData = {
    roomId: id,
    userId: user ? userId : null,
  };

  try {
    const response = await axios.get(
      "https://merge-pad.vercel.app/api/get-room",
      {
        params: RoomData,
      }
    );

    const userIds = Object.keys(response.data.usersAccesses);

    const users = await axios.get("https://merge-pad.vercel.app/api/get-users", {
      params: { userIds: userIds.join(",") },
    });

    const userData = users.data.map((user: User) => ({
      ...user,
      usertype: response.data.usersAccesses[user.email]?.includes('room:write')
        ? 'editor'
        : 'viewer'
    }));

    const currentUserType = user && user.emailAddresses[0]?.emailAddress
      ? response.data.usersAccesses[user.emailAddresses[0].emailAddress]?.includes('room:write')
        ? 'editor'
        : 'viewer'
      : 'viewer';

    return (
      <div className="min-h-screen p-4 bg-dark-blue-gradient">
        <CollaborativeRoom 
          roomId={id} 
          roomMetadata={response.data.metadata} 
          users={userData}
          currentUserType={currentUserType}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching room data:", error);
    redirect("/"); 
  }
};

export default Document;
