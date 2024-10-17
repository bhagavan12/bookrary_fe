// Signup.js
import React, { useState,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../features/userSlice' 
import { useNavigate,Link } from 'react-router-dom';
import '../Styling/Auth.css';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
const Signup = () => {
  const [success,setSuccess]=useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error } = useSelector(state => state.user); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(signup({ username, email, password })).unwrap();
      if (result.message === 'User created successfully') {
        // navigate('/'); 
        // showSuccess();
        setSuccess(result.message);
      }
    } catch (err) {
      console.error('Failed to sign up:', err);
      // showError();
    }
  };
//   const showSuccess = () => {
//     toast.current.show({severity:'success', summary: 'Success', detail:'Move to login', life: 3000});
// }
// const showError = () => {
//     toast.current.show({severity:'error', summary: 'Error', detail:'Error', life: 3000});
// }
  return (
    <div className="login-container">
    {/* <Toast ref={toast} position="bottom-right" style={{height:"10px",width:"80px",padding:"0px"}}/> */}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Button label="SignUp" type="submit" disabled={loading}></Button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{color:"red"}}>{error}</p>}
      {success && <p style={{color:"green"}}>{success}</p>}
      {/* <p> <Link to='/'>Login IN</Link></p> */}
    </div>
  );
};

export default Signup;
