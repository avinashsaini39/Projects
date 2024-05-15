import React, {useState} from 'react';
import axios from 'axios';
import './add.css';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import moment from 'moment';


const Add = () => {

  const users = {
    fname:"",
    lname: "",
    email:"",
    password:"",
    gender:"",
    address:"",
    age:""
    
  }
  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) =>{
    const {name, value} = e.target;
    // setUser({...user, [name]:value});
    
    // Calculate age based on date of birth
    if (name === 'dob') {
      const dob = moment(value);
      const age = moment().diff(dob, 'years');
      setUser({ ...user, [name]: value, age: age }); // Update age field
    } else {
      setUser({ ...user, [name]: value });
    }
  }

  

  const submitForm = async (e) => {
    e.preventDefault();
    // Check if all required fields are filled
    if (!user.fname || !user.lname || !user.email || !user.password || !user.gender || !user.address || !user.age) {
      toast.error("Please fill in all fields", { position: "top-right" });
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/api/create", user, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      toast.success(response.data.msg, { position: "top-right" });
      navigate("/");
    } catch (error) {
      toast.error("Failed to add user", { position: "top-right" });
      console.error(error);
    }
  };

  // const submitForm = async(e) =>{
  //   e.preventDefault();
  //   await axios.post("http://localhost:8000/api/create", user)
  //   .then((response)=>{
  //     toast.success(response.data.msg, {position:"top-right"})
  //     navigate("/")
  //   }).catch(error => console.log(error))
  // }


  return (
    <div className='addUser'>
      <Link to="/">Back</Link>
      <h3>Add new user</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className="inputGroup">
            <label htmlFor="fname">First name</label>
            <input type='text' required='true' onChange={inputHandler} id='fname' name='fname' autoComplete='off' placeholder='First Name' />
            
        </div>
        <div className="inputGroup">
            <label htmlFor="lname">Last name</label>
            <input type='text' required='true' onChange={inputHandler} id='lname' name='lname' autoComplete='off' placeholder='Last Name' />

        </div>
        <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input type='email' required='true' onChange={inputHandler} id='email' name='email' autoComplete='off' placeholder='Email' />

        </div>
        <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input type='password' required='true' onChange={inputHandler} id='password' name='password' autoComplete='off' placeholder='Password' />

        </div>
        <div className="inputGroup">
            <label htmlFor="gender">Gender</label>
            <select id="gender" required='true' name="gender" onChange={inputHandler}>
                    <option value="">Select your gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
              

        </div>
        <div className="inputGroup">
            <label htmlFor="address">Address</label>
            <input type='text' required='true' onChange={inputHandler} id='address' name='address' autoComplete='off' placeholder='Address' />

        </div>
        <div className="inputGroup">
  <label htmlFor="dob">Date of Birth</label>
  <input
    type="date"
    required='true'
    onChange={inputHandler}
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
          <button type='submit'>ADD USER</button>

        </div>
      </form>
    </div>
  )
}

export default Add;
