"use client";
import { useOthers } from '@liveblocks/react/suspense';
import Image from 'next/image';
import React from 'react';

interface Collaborator {
    id: string;
    name?: string;  // Optional username
    avatar?: string; // Optional avatar URL
    color?: string;  // Optional color for border
}

const Collaborators = () => {
    // useOthers() returns a list of others in the room, excluding the current user.
    const others = useOthers(); 
    console.log(others);
    
    const collaborators: Collaborator[] = others.map((p) => p.info|| {}); // Accessing collaborator info

    return (
        <ul className='collaborators-list'>
            {collaborators.map(({ id, name, avatar, color = 'green' }) => ( // Fallback color
                <li key={id || Math.random().toString(36)}>
                    <Image 
                        src={avatar || '/default-avatar.png'} // Fallback image if avatar is undefined
                        alt={name || 'Unknown'} // Fallback alt text
                        width={100} 
                        height={100} 
                        className='inline-block size-8 rounded-full ring-2.5 ring-dark-100 mr-2'
                        style={{ border: `3px solid ${color}` }} // Apply border color
                    />
                </li>
            ))}
        </ul>
    );
};

export default Collaborators;
