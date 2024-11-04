import { Editor } from '@/components/Editor';
import Navbar from '@/components/Navbar';
import React from 'react';
import { Room } from '../Room';

const Page = () => {
  return (
    <div className='bg-dark-theme min-h-screen'> 
      <Navbar />
      <main> 
        <Room>
        <Editor />
        </Room>
      </main>
    </div>
  );
}

export default Page;
