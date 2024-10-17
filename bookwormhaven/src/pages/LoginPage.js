// Login.js
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/userSlice'; 
import { useNavigate,Link } from 'react-router-dom';
import '../Styling/Auth.css';
import {Button} from 'primereact/button';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error } = useSelector(state => state.user); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(login({ username, password })).unwrap(); 
      if (result.token) {
        navigate('/books'); 
      }
    } catch (err) {
      console.error('Failed to login:', err);
      console.log("error",error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Button type="submit" label="Login" disabled={loading}></Button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      {/* <p> <Link to='/'>Signup</Link></p> */}
    </div>
  );
};

export default Login;
