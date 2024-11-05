// components/Loader.js
import Image from 'next/image';

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <img src="https://cdn.pixabay.com/animation/2023/05/02/04/29/04-29-06-428_512.gif" alt="Loading..." width={100} height={100} />
    </div>
  );
};

export default Loader;
