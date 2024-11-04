import { useUser,SignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { redirect } from "next/navigation";


const liveblocks = new Liveblocks({
  secret: "sk_dev_BgYTqzUcJD6GMfmBAfBul4v6aW1AbbinT0UNEGZP4xGZawypOJ7cgs0my0M7dRIk",
});
interface userInfo{
    id:string,
    email:string
}

export async function POST(request: Request) {
  // Get the current user from your database
  const user = await currentUser()

  if (!user) {
    // Send an unauthorized response instead of redirecting
    return new Response("Unauthorized", { status: 401 });
  }

  const userInfo={
    id:user.id,
    email:user.emailAddresses[0].emailAddress || "",
    name:user.fullName ||"",
    avatar:user.imageUrl,
    color:"#eb4034"


  }
  const groupIds:string[]=[]
  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.id,
      groupIds,
    },
    { userInfo },
  );

  return new Response(body, { status });
}