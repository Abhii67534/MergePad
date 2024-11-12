import { clerkClient } from "@clerk/nextjs/server";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const userIdsParam = searchParams.get("userIds"); 
  const userIds: string[] = userIdsParam ? userIdsParam.split(",") : [];

  
  try {
    //clerk docs
    const response = await (
      await clerkClient()
    ).users.getUserList({
      emailAddress: userIds,
    });
    const users = response.data.map((user) => ({
      id: user.id,
      name: user.firstName,
      email: user.emailAddresses[0].emailAddress,
      avatar: user.imageUrl,
    }));
    const sortedUsers = userIds.map((email) =>
      users.find((user) => user.email === email)
    );

    console.log("FINISHED");
    
    return NextResponse.json(sortedUsers);
  } catch (error) {
    console.log(`Error fetching users: ${error}`);
  }
};
