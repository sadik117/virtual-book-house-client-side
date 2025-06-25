import { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../Firebase/AuthProvider";
import { Link } from "react-router";
import { toast } from "react-toastify";
import bookAnimation from "../../../public/book-nav.json";
import Lottie from "lottie-react";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext)

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    logOut()
    .then(() => { 
    }).catch(() => {
     toast.error("An error happened!!")
    });
  }

  return (
    <nav className="bg-[#121829] text-white fixed top-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl flex font-bold text-blue-400">
        <div className="w-10 h-8">
            <Lottie animationData={bookAnimation} loop={true} className="-mt-1"/>
          </div>
          <span className="text-white">Book</span>shelf.
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center font-medium">
          <Link to="/">Home</Link>
          <Link to="/bookshelf">Bookshelf</Link>
          <Link to="/add-book">Add Book</Link>
          {user && <Link to="/my-books">My Books</Link>}
          {user && <Link to="/my-profile">My Profile</Link>}
          {!user ? (
            <Link to="/auth/login" className="bg-blue-500 px-4 py-1 rounded hover:bg-blue-600">
              Login
            </Link>
          ) : (
            <button onClick={handleLogout} className="text-red-400 hover:text-red-500">
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-xl cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-[#1A2238]">
          <Link to="/" className="block py-2" onClick={toggleMenu}>Home</Link>
          <Link to="/bookshelf" className="block py-2" onClick={toggleMenu}>Bookshelf</Link>
          <Link to="/add-book" className="block py-2" onClick={toggleMenu}>Add Book</Link>
          {user && <Link to="/my-books" className="block py-2" onClick={toggleMenu}>My Books</Link>}
          {user && <Link to="/my-profile" className="block py-2" onClick={toggleMenu}>My Profile</Link>}
          {!user ? (
            <Link to="/auth/login" className="block py-2 text-blue-400" onClick={toggleMenu}>
              Login
            </Link>
          ) : (
            <button onClick={() => { handleLogout(); toggleMenu(); }} className="block py-2 text-red-400">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
