import Topbar from '../Layout/Topbar';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header className="border-b border-gray-600 ">
      {/* topbar */}
      <Topbar />
      {/* Navbar */}
      <Navbar />
    </header>
  );
};

export default Header;
