
import React from 'react'
import Navbar from './Navbar'
import { Room } from '@/app/Room'
import { Editor } from './Editor'

interface CollaborativeRoomProps{
    roomId:string
}

const CollaborativeRoom = ({roomId}:CollaborativeRoomProps) => {
  return (
<div className='bg-dark-theme min-h-screen'> 
      <Navbar />
      <main> 
        <Room roomId={roomId}>
        <Editor />
        </Room>
      </main>
    </div>
  )
}

export default CollaborativeRoom
