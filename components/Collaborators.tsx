import { useOthers } from '@liveblocks/react/suspense'
import Image from 'next/image';
import React from 'react'

interface Collaborator{
    id:string,
    name?: string; // You can add optional fields like username and avatar
  avatar?: string;

}
const Collaborators = () => {
    //useOthers()-It tracks other users who are in the same collaborative room but are not the current user.
    // It typically returns an array or list of users currently connected, excluding the current user.
    const others = useOthers(); 
    const collaborators = others.map((p)=>p.info); //p.info contain user data like username,avatar etc


  return (
    <ul className='collaborators-list'>
        {collaborators.map(({id,name,avatar,color})=>(
            <li key={id}>
                <Image src={avatar} alt={name} width={100} height={100} 
                className='inline-block size-8 rounded-full ring-2 ring-dark-100'
                style={{border:`3px solid ${color}`}}
                />

            </li>
        ))}

    </ul>
  );
};

export default Collaborators
