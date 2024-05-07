import { Link } from "react-router-dom";
import {FaCog, FaHome, FaPoll, FaRegFileAlt, FaUser} from 'react-icons/fa';
import React from "react";


function Sidebar ()  {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  }
   
  return (
    <div className='w-64 bg-gray-800 fixed h-full px-4 py-2'>
        <div className='my-2 mb-4'>

            <h1 className='text-2x text-white font-bold'>Admin Dashboard</h1>

        </div>
        <hr />
        <ul className='mt-3 text-white font-bold'>
            <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'> <a href="" className='px-3'> <FaHome className='inline-block w-6 h-6 mr-2 -mt-2'></FaHome>Home</a> </li>
            <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'> <Link to="/Crud" className='px-3'> <FaRegFileAlt className='inline-block w-6 h-6 mr-2 -mt-2'></FaRegFileAlt>CRUD</Link> </li>
            <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'> <a href="" className='px-3'> <FaCog className='inline-block w-6 h-6 mr-2 -mt-2'></FaCog>Settings</a> </li>
            <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'> <a href="" className='px-3'> <FaPoll className='inline-block w-6 h-6 mr-2 -mt-2'></FaPoll>About</a> </li>
            <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'> <button className='px-3' onClick={handleLogout}> <FaUser className='inline-block w-6 h-6 mr-2 -mt-2'></FaUser>Logout</button> </li>
        </ul>
   
   </div>
  );
};

export default Sidebar;
