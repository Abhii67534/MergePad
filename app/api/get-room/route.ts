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
  const userId = searchParams.get('userId');

  // Validate the presence of roomId and userId
  if (!roomId || !userId) {
    return NextResponse.json({ error: "Missing roomId or userId" }, { status: 400 });
  }

  try {
    // Fetch the room from Liveblocks
    const room = await liveblocks.getRoom(roomId);

    // Check if the user has access to the room
    const hasAccess = room.usersAccesses && Object.keys(room.usersAccesses).includes(userId);

    // If no access, throw an error
    if (!hasAccess) {
      return NextResponse.json({ error: "No access to document" }, { status: 403 });
    }

    // Return the room data if everything is valid
    return NextResponse.json(room);

  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching room data:", error);

    // Return a general error message in case of failure
    return NextResponse.json({ error: 'Error fetching room data' }, { status: 500 });
  }
}
