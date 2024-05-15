import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './user.css';
import toast from 'react-hot-toast';
import moment from 'moment';

const User = () => {



  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');


  


  useEffect(() =>{

    const fetchData = async()=>{
      try {
        let url = `http://localhost:8000/api/getAll`;
        if(statusFilter) {
          url += `?status=${statusFilter}`;
        }
        if(genderFilter) {
          url += `?gender=${genderFilter}`;
        }
        const response = await axios.get(url);
     setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
     
    };

    fetchData();

  },[statusFilter, genderFilter]);



  const deleteUser = async (userId, userName) =>{
    if (window.confirm(`Are you sure you want to delete ${userName}?`)){
    await axios.delete(`http://localhost:8000/api/delete/${userId}`)
    .then((response)=>{
      setUsers((prevUser)=> prevUser.filter((user)=> user._id !== userId))
      toast.success(response.data.msg, {position: 'top-right'})
    })
    .catch((error) =>{
      console.log(error)
    })
  }}



  const toggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    const confirmationMessage = `Are you sure you want to change status to ${newStatus}?`;

    if (window.confirm(confirmationMessage)) {
      try {
        const response = await axios.put(`http://localhost:8000/api/update/${userId}`, { status: newStatus });
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, status: newStatus } : user
          )
        );
        toast.success(response.data.msg, { position: "top-right" });
      } catch (error) {
        toast.error("Failed to update status", { position: "top-right" });
        console.error(error);
      }
    }
  };


  const handleSearch = async (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    try {
      const response = await axios.get(`http://localhost:8000/api/search?term=${searchTerm}`);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
      
    }
  }


  
  const formatDate = (dateString) => {
    return moment(dateString).format('DD-MM-YYYY');
  };

  return (
    <div className='userTable'>
      <div className='searchbar'>
        <input type='text' placeholder='Search by name or email' value={searchTerm} onChange={handleSearch}/>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value=''>Filter by Status</option>
          <option value='active'>Active</option>
          <option value='inactive'>Inactive</option>
        </select>
        <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
          <option value=''>Filter by Gender</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
          <option value='Other'>Other</option>
        </select>
      </div>
        <Link to="/add" className="addButton">Add User</Link>
      
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
            <tr>
                <th>S.No.</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Date Of Birth</th>
                <th>Age</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
          {
            users.map((user, index)=>{
              return(
                <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.fname} {user.lname}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.address}</td>
                <td>{formatDate(user.dob)}</td>
                <td>{user.age}</td>
                <td>{user.status}</td>
                <td className='actionButtons'>
                <button onClick={() => toggleStatus(user._id, user.status)}>
                  {user.status === 'active' ? 'Set Inactive' : 'Set Active'}
                </button>
                    <button onClick={()=> deleteUser(user._id, `${user.fname} ${user.lname}`) }>Delete</button>
                    <Link to={`/edit/`+user._id}>Edit</Link>
                </td>
            </tr>
              )
            })
          }
            
        </tbody>
      </table>
    </div>
  )
}

export default User;
