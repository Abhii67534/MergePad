// app/page.tsx or app/home/page.tsx
import AddDocumentBtn from "@/components/AddDocumentBtn";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  if (!user) redirect('/sign-in');

  // Pass necessary data to the client component
  return (
    <main>
      <UserButton userId={user.id} email={user.emailAddresses[0].emailAddress} />
    </main>
  );
}
interface UserButtonProps {
  userId: string; 
  email: string;  
}
// Create a client component for user button
const UserButton = ({ userId, email }:UserButtonProps) => {
  return (
    <AddDocumentBtn 
      userId={userId} 
      email={email} 
    />
  );
};
