import { Liveblocks } from "@liveblocks/node";
import { NextRequest, NextResponse } from "next/server";

// Initialize Liveblocks with your secret key
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY as string,
});

// Handle GET requests to fetch room data
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get('roomId');
  
  // Validate the presence of roomId
  if (!roomId) {
    return NextResponse.json({ error: "Missing roomId" }, { status: 400 });
  }

  try {
    // Fetch the room from Liveblocks
    const room = await liveblocks.getRoom(roomId);

    // Return the room data if everything is valid
    return NextResponse.json(room,{status:200});

  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching room data:", error);

    // Return a general error message in case of failure
    return NextResponse.json({ error: 'Error fetching room data' }, { status: 500 });
  }
}
