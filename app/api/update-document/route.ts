import { NextRequest, NextResponse } from "next/server";
import { Liveblocks } from "@liveblocks/node";
import { revalidatePath } from "next/cache";

// Initialize Liveblocks with your secret key
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY as string,
});

export const POST = async (request: NextRequest) => {
  try {
    // Parse the incoming JSON request body
    const { roomId, title } = await request.json();

    // Check for missing roomId or title in the request
    if (!roomId || !title) {
      return NextResponse.json(
        { error: "Missing roomId or title" },
        { status: 400 }
      );
    }


    // Update the room metadata using Liveblocks API
    const updateRoom = await liveblocks.updateRoom(roomId, {
      metadata: {
        title,
      },
    });

    if (!updateRoom) {
      return NextResponse.json(
        { error: "Room update failed" },
        { status: 500 }
      );
    }

    // Trigger revalidation of the document page
    revalidatePath(`/documents/${roomId}`);

    // Return success response with updated room data
    return NextResponse.json({updatedRoom: updateRoom},{status:200});

  } catch (error) {
    console.error("Error updating room data:", error);

    // Catch any unexpected errors and return a generic error response
    return NextResponse.json(
      { error: "Error updating room data" },
      { status: 500 }
    );
  }
};
