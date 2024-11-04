import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

const GET = async (request: NextRequest) => {

    const body = await request.json();
    const userIds:string[] = body.userIds;
    try { 

        //clerk docs 
        const data = (await clerkClient()).users.getUserList({
            emailAddress:userIds,
        })
        const users = data.map((user)=>(
            {
                id:user.id,
                name:user.firstName,
                
            }
        ))
        console.log(data); // Should print an array of user objects
    } catch (error) {
        console.log(`Error fetching users: ${error}`);
    }
};
