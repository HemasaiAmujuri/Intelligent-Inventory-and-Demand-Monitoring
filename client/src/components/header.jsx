import { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom'

function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const userName = localStorage.getItem("name") ?? "John Doe";
  const firstName = userName.split(" ")[0];

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("name");
    navigate("/login")
  };

  return (
    <header className="w-full bg-blue-600 text-white">
      <div className="flex justify-between items-center p-4">
        {/* Navigation */}
        <nav>
          <ul className="flex gap-20 font-medium text-white ml-150">
            <li className="hover:text-gray-200 cursor-pointer"><Link to="/inventoryList">Products</Link> </li>
            <li className="hover:text-gray-200 cursor-pointer"> <Link to="/dashboard">Dashboard</Link></li>
            <li className="hover:text-gray-200 cursor-pointer">Orders</li>
          </ul>
        </nav>

        {/* User Dropdown */}
        <div className="relative mr-8" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-white font-medium hover:text-gray-200 transition-colors"
          >
            <FaUser className="text-lg" />
            <span>{firstName}</span>
          </button>

          {open && (
            <div className="absolute right-1 mt-2 w-48 bg-white text-gray-700 rounded-md shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-2 border-b font-medium">{userName}</div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        </div>
    </header>
  );
}

export default Header;
