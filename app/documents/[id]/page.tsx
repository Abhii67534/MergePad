
import { Editor } from '@/components/Editor';
import Navbar from '@/components/Navbar';
import React from 'react';
import { Room } from '../../Room';
import CollaborativeRoom from '@/components/CollaborativeRoom';
import axios from 'axios';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

interface DocumentProps{
  params:{
    id:string
  }
}

interface RoomProps {
  roomId:string,
  userId:string |null
}
const Document = async ({params}:DocumentProps) => {
  const { id } = await params;
  const user = await currentUser();
const userId = user?.emailAddresses[0].emailAddress
  const RoomData = {
    roomId: id,
    userId: user ? userId : null
  };
  
  const response =await axios.get('http://localhost:3000/api/get-room', {
    params: RoomData,
  })

  if(response.status==200){
    const {room} = response.data;
  }
  else{
    redirect('/')
  }
  return (
    <CollaborativeRoom 
    roomId={id}/>
  );
}

export default Document;
