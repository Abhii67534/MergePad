// app/api/get-documents/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY as string,
});

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  try {
    const rooms = await liveblocks.getRooms();
    return NextResponse.json(rooms);
  } catch (error) {
    console.error("Error retrieving rooms:", error);
    return NextResponse.json({ error: "Error retrieving rooms" }, { status: 500 });
  }
};
