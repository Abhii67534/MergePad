import React from 'react';
import CollaborativeRoom from '@/components/CollaborativeRoom';
import axios from 'axios';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

interface DocumentProps {
  params: Promise<{ id: string }>; // Update this to expect a Promise
}

const Document = async ({ params }: DocumentProps) => {
  const { id } = await params; // Await the params Promise
  const user = await currentUser();
  const userId = user?.emailAddresses[0].emailAddress;

  const RoomData = {
    roomId: id,
    userId: user ? userId : null,
  };

  try {
    const response = await axios.get('https://merge-pad.vercel.app/api/get-room', {
      params: RoomData,
    });

    if (response.status !== 200) {
      redirect('/');
    }

    console.log(response.data.metadata);
    
    

    return (
      <CollaborativeRoom roomId={id} roomMetadata={response.data.metadata}/>
    );
  } catch (error) {
    console.error('Error fetching room data:', error);
    redirect('/'); // Redirect in case of an error
  }
};

export default Document;
