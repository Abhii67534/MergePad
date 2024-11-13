import AddDocumentBtn from "@/components/AddDocumentBtn";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const email = user.emailAddresses[0].emailAddress;

  // Await the axios call to get the documents
  const response = await axios.get(
    "https://merge-pad.vercel.app/api/get-documents",
    {
      params: {
        email: email,
      },
    }
  );

  const documents = response.data.data;
  return (
    <main className="p-4 bg-dark-blue-gradient min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 ml-5 mr-5 mt-2">
        
        {/* Logo */}
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <img src="/logo.png" alt="MergePad Logo" className="h-[50px] sm:h-[70px] mr-2" />
          <Link href="/" className="text-3xl sm:text-4xl font-bold text-white">
            Merge-Pad
          </Link>
        </div>

        {/* User Button */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Userbutton userId={user.id} email={user.emailAddresses[0].emailAddress} />
          <UserButton />
        </div>
      </div>

      {/* Document List */}
      <div className="flex justify-center">
        <div className="bg-dark-blue-2/80 w-full max-w-[700px] p-8 rounded-xl shadow-lg">
          <h3 className="text-center text-2xl sm:text-3xl font-semibold text-white mb-6">
            List of All Documents
          </h3>

          {documents.length > 0 ? (
            <ul className="space-y-4 flex flex-col items-center w-full">
              {documents.map(({ id, metadata, createdAt, lastConnectionAt }: any) => (
                <li
                  key={id}
                  className="document-list-item bg-gray-700 rounded-lg p-4 flex flex-col sm:flex-row items-center gap-4 w-full max-w-[600px]"
                >
                  <Link href={`/documents/${id}`} className="flex flex-col sm:flex-row flex-1 items-center gap-4 text-white w-full">
                    <div className="rounded-md bg-dark-500 p-2">
                      <Image src="/doc.png" alt="file" width={40} height={40} />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <p className="text-lg font-semibold">
                        {metadata.title || "Untitled Document"}
                      </p>
                      <p className="text-sm text-gray-300">
                        Created At: {new Date(createdAt).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-300">
                        Last Connected: {new Date(lastConnectionAt).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-300">
                        Creator: {metadata.email}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white text-center mt-4 sm:mt-8">
              No documents found.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

interface UserButtonProps {
  userId: string;
  email: string;
}

// Client component for Add Document button
const Userbutton = ({ userId, email }: UserButtonProps) => {
  return <AddDocumentBtn userId={userId} email={email} />;
};
