// Signup.js
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../features/userSlice'
import { useNavigate, Link } from 'react-router-dom';
import '../Styling/Auth.css';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Password } from 'primereact/password';
const Signup = () => {
  const [success, setSuccess] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(state => state.user);
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long and include lowercase, uppercase, number, and special character.');
      return;
    }
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
  const passwordHeader = <div className="font-bold mb-3">Pick a password</div>;
  const passwordFooter = (
    <>
      <hr />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>At least one lowercase letter</li>
        <li>At least one uppercase letter</li>
        <li>At least one numeric character</li>
        <li>At least one special character (e.g., *, @, #)</li>
        <li>Minimum 8 characters</li>
      </ul>
    </>
  );
  return (
    <div className="login-container">
      {/* <Toast ref={toast} position="bottom-right" style={{height:"10px",width:"80px",padding:"0px"}}/> */}
      <form onSubmit={handleSubmit}>
        <FloatLabel style={{ marginTop: "15px" }}>
          <InputText
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="username">Username</label>
        </FloatLabel>
        <FloatLabel style={{ marginTop: "15px" }}>
          <InputText
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
        </FloatLabel>
        <FloatLabel style={{ marginTop: "15px" }}>
          <Password
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError('');
          }}
          header={passwordHeader}
          footer={passwordFooter}
          toggleMask
        />
          <label htmlFor="password">Password</label>
        </FloatLabel>
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        <Button label="SignUp" type="submit" disabled={loading}></Button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      {/* <p> <Link to='/'>Login IN</Link></p> */}
    </div>
  );
};

export default Signup;
