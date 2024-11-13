import { useUser, SignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { redirect } from "next/navigation";

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_BgYTqzUcJD6GMfmBAfBul4v6aW1AbbinT0UNEGZP4xGZawypOJ7cgs0my0M7dRIk",
});
interface userInfo {
  id: string;
  email: string;
}

export async function POST(request: Request) {
  // Get the current user from your database
  const clerkUser = await currentUser();
  
  
  if (!clerkUser) {
    // Send an unauthorized response instead of redirecting
    return new Response("Unauthorized", { status: 401 });
  }
  const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;
  const user = {
    id,
    info: {
      id: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress || "",
      name: clerkUser.fullName || "",
      avatar: clerkUser.imageUrl,
      color: "#eb4034",
    },
  };
  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.email,
      groupIds:[],
    },
    { userInfo:user.info }
  );

  return new Response(body, { status });
}
