import React, {useEffect, useState} from 'react';
import { Link, useNavigate,useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../adduser/add.css';
import axios from 'axios';
import moment from 'moment';

const Edit = () => {

  const users = {
    fname: "",
    lname: "",
    email: "",
    gender: "",
    address: "",
    dob: "",
    age: ""
  }


    const {id} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(users);


    const inputChangeHandler = (e) =>{
      const {name, value} = e.target;
      // setUser({...user, [name]:value});
      // console.log(user);
      //calculate age by DOB
      if (name === 'dob') {
        const dob = moment(value);
        const age = moment().diff(dob, 'years');
        setUser({ ...user, [name]: value, age: age }); // Update age field
      } else {
        setUser({ ...user, [name]: value });
      }
    }

    useEffect(() => {
     axios.get(`http://localhost:8000/api/getOne/${id}`)
      .then((response) =>{
        setUser(response.data)
      })
      .catch((error)=>{
        console.log(error);
      })
    },[id])


    const submitForm = async(e)=>{
      e.preventDefault();
      await axios.put(`http://localhost:8000/api/update/${id}`, user)
      .then((response)=>{
        toast.success(response.data.msg, {position:"top-right"})
        navigate("/")
      })
      .catch(error => console.log(error))
    }

  return (
    <div className='addUser'>
      <Link to="/">Back</Link>
      <h3>Update user</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className="inputGroup">
            <label htmlFor="fname">First name</label>
            <input type='text' required='true' value={user.fname} onChange={inputChangeHandler} id='fname' name='fname' autoComplete='off' placeholder='First Name' />
            
        </div>
        <div className="inputGroup">
            <label htmlFor="lname">Last name</label>
            <input type='text' required='true' value={user.lname} onChange={inputChangeHandler} id='lname' name='lname' autoComplete='off' placeholder='Last Name' />

        </div>
        <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input type='email' required='true' value={user.email} onChange={inputChangeHandler} id='email' name='email' autoComplete='off' placeholder='Email' />

        </div>
        <div className="inputGroup">
            <label htmlFor="gender">Gender</label>
            <select id="gender" value={user.gender} required='true' name="gender" onChange={inputChangeHandler}>
                    <option value="" >Select your gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
              

        </div>
        <div className="inputGroup">
            <label htmlFor="address">Address</label>
            <input type='text' value={user.address} required='true' onChange={inputChangeHandler} id='address' name='address' autoComplete='off' placeholder='Address' />

        </div>
        <div className="inputGroup">
  <label htmlFor="dob">Date of Birth</label>
  <input
    type="date"
    required='true'
    value={user.dob}
    onChange={inputChangeHandler}
    id="dob"
    name="dob"
    autoComplete="off"
    placeholder="Date of Birth"
  />
</div>
        <div className="inputGroup">
            <label htmlFor="age">Age</label>
            <input type='number' required='true' value={user.age} readOnly />

        </div>
       
        <div className="inputGroup">
          <button type='submit'>UPDATE USER</button>

        </div>
      </form>
    </div>
  )
}

export default Edit;
