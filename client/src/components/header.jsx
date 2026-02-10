import { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom'
import Capitalise from "../utils/utils";

function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_BASE_URL

  const token = localStorage.getItem("token");

  useEffect(()=> {
     async function fetchData() {
      try{
        const response = await fetch(`${baseUrl}/api/user/getUserInfo`,{
          method : "GET",
          headers : {
            Authorization : `Bearer ${token}`
          }
        });
        const data = await response.json();
        if(response.ok){
          console.log(data,"data");
          setName(data?.name)
        }else{
          console.log("error while fetching data")
        }
     }catch(err){
      console.log(err)
     }
    }

     fetchData()
  },[])
  



    const userName =  name ?? "John Doe"  
    const firstName = Capitalise(userName.split(" ")[0]);


  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);  //This is the cleanup function in useEffect. It removes the event listener when the component unmounts to prevent memory leaks or multiple listeners stacking up.


  }, []);

  // Logout function
  const handleLogout = () => {    //REGIRECT TO LOGIN PAGE
    localStorage.clear();
    navigate("/login")
  };

  return (
    <header className="w-full bg-blue-500 text-white">
      <div className="flex justify-between items-center p-4">
        {/* Navigation */}
        <nav>
          <ul className="flex gap-20 font-medium text-white ml-150">
            <li className="hover:text-gray-200 cursor-pointer"><Link to="/inventoryList">Products</Link> </li>
            <li className="hover:text-gray-200 cursor-pointer"> <Link to="/dashboard">Dashboard</Link></li>
            <li className="hover:text-gray-200 cursor-pointer"> <Link to="/order">Order</Link></li>
          </ul>
        </nav>

        {/* User Dropdown */}
        <div className="relative mr-8" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-white font-medium hover:text-gray-200 transition-colors"
          >
            <FaUser className="text-lg" />
            <span>{Capitalise(firstName)}</span>
          </button>

          {open && (     // THIS EXECTUTE WHEN OPEN IS TRUE
            <div className="absolute right-1 mt-2 w-48 bg-white text-gray-700 rounded-md shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-2 border-b font-medium">{Capitalise(firstName)}</div>
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
