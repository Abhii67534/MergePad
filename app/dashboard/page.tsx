import { Editor } from '@/components/Editor';
import Navbar from '@/components/Navbar';
import React from 'react';

const Page = () => {
  return (
    <div className='bg-dark-theme min-h-screen'> 
      <Navbar />
      <main> 
        <Editor />
      </main>
    </div>
  );
}

export default Page;
