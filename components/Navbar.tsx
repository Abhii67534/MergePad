import { UserButton } from '@clerk/nextjs';
import React from 'react';
import Collaborators from './Collaborators';

const Navbar = () => {
    return (
        <header className="bg-dark-theme-nav text-white">
            <nav className="flex items-center justify-between p-4">
                <div className="flex items-center">
                    <img src="/logo.png" alt="MergePad Logo" className="h-10 mr-2" />
                    <span className="text-xl font-bold ml-3">MergePad</span>
                </div>
                <div className="hidden md:flex space-x-4"> 
                <Collaborators/>
                <UserButton showName />
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
