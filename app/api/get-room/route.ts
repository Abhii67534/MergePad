import { getAuth } from "@clerk/nextjs/server";
import { Liveblocks, RoomAccesses } from "@liveblocks/node";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from 'next/server';

// Initialize Liveblocks with your secret key
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY as string,
});

// Handle POST requests to create a room
export async function GET(request: NextRequest) {

  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get('roomId');
  const userId = searchParams.get('userId');

  try {
    
    const room = await liveblocks.getRoom(roomId||"");

    const hasAccess = Object.keys(room.usersAccesses).includes(userId||"");

    if(!hasAccess){
        throw new Error("No access to document")
    }
    return NextResponse.json(room);

  } catch (error) {
    // Handle errors
    console.error("Error creating room:", error);
    return NextResponse.json({ error: 'Error creating room' }, { status: 500 });
  }
}
