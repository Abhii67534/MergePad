import { Liveblocks, RoomAccesses } from "@liveblocks/node";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from 'next/server';

// Initialize Liveblocks with your secret key
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY as string,
});

// Handle POST requests to create a room
export async function POST(request: NextRequest) {

    const roomId = nanoid();//random id's

  try {
    const body = await request.json();
    const metadata={
        creatorId:body.userId,
        email:body.email,
        title:'Untitled Document'
    }
    const usersAccesses:RoomAccesses={
        [body.email]:['room:write']
    }

    const room = await liveblocks.createRoom(roomId, {
        metadata,
        usersAccesses,
        defaultAccesses:['room:write'] //CHANGE TO RESTRICT PERMISSIONS
      });
      revalidatePath('/');
      return NextResponse.json({room:room},{status:200});
  } catch (error) {
    // Handle errors
    console.error("Error creating room:", error);
    return NextResponse.json({ error: 'Error creating room' }, { status: 500 });
  }
}
