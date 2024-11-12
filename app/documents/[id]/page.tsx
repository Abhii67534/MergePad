import React from "react";
import CollaborativeRoom from "@/components/CollaborativeRoom";
import axios from "axios";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { log } from "console";

interface DocumentProps {
  params: Promise<{ id: string }>; // Update this to expect a Promise
}

type User = {
  name: string;
  email:string,
  avatar:string,
};

const Document = async ({ params }: DocumentProps) => {
  const { id } = await params; // Await the params Promise
  const user = await currentUser();
  const userId = user?.emailAddresses[0].emailAddress;
  // console.log(userId);
  // console.log(id);
  
  

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

    // console.log("User accesses ",response.data.usersAccesses);

    const userIds = Object.keys(response.data.usersAccesses);

    // console.log("userids",userIds);
    

    const users = await axios.get("https://merge-pad.vercel.app/api/get-users", {
      params: { userIds: userIds.join(",") }, 
    });
    
    // console.log("FAILING HERE ", users.data );
    const userData = users.data.map((user:User)=>({
      ...user, 
      usertype:response.data.usersAccesses[user.email]?.includes('room:write')
      ?'editor'
      :'viewer'
    }))
// console.log("reached here");

    const currentUserType = user && user.emailAddresses[0]?.emailAddress
  ? response.data.usersAccesses[user.emailAddresses[0].emailAddress]?.includes('room:write')
    ? 'editor'
    : 'viewer'
  : 'viewer';
    return (
      <CollaborativeRoom 
      roomId={id} 
      roomMetadata={response.data.metadata} 
      users={userData}
      currentUserType={currentUserType}
      />
    );
  } catch (error) {
    console.error("Error fetching room data:", error);
    redirect("/"); 
  }
};

export default Document;
