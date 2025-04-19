import { TbBrandMeta } from 'react-icons/tb';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';
const Topbar = () => {
  return (
    <div className="bg-black text-white px-4">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-gray-300">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <RiTwitterXLine className="h-5 w-5" />
          </a>
        </div>
        <div className="text-sm text-center flex-grow">
          <span className="text-sm text-center">
            Fast worldwide shipping | Shop at Aarong
          </span>
        </div>
        <div className="text-sm hidden md:block">
          <a href="tel:32729we238" className="hover:text-gray-300">
            +1 (327)29479248
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
