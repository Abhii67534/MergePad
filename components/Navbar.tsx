import React from 'react';

const Navbar = () => {
    return (
        <header className="bg-dark-theme-nav text-white">
            <nav className="flex items-center justify-between p-4">
                <div className="flex items-center">
                    <img src="/logo.png" alt="MergePad Logo" className="h-10 mr-2" />
                    <span className="text-xl font-bold ml-3">MergePad</span>
                </div>
                {/* Placeholder for future links or buttons */}
                <div className="hidden md:flex space-x-4"> {/* Example for links, hidden on small screens */}
                    
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
