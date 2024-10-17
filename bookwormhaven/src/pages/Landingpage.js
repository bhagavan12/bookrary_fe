import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog'; 
import Login from './LoginPage'; 
import Signup from './SignupPage'; 
import CoverImg from '../assets/bookcover.png';
import logo from '../assets/logo.png';
import '../Styling/Landingpage.css';
import { Fieldset } from 'primereact/fieldset';
export default function Landingpage() {
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const trendingBooksRef = useRef(null);

  const items = [
    {
      label: 'Features',
      icon: 'pi pi-sparkles',
      command: () => featuresRef.current.scrollIntoView({ behavior: 'smooth' }) 
    },
    {
      label: 'Testimonials',
      icon: 'pi pi-pencil',
      command: () => testimonialsRef.current.scrollIntoView({ behavior: 'smooth' }) 
    },
    {
      label: 'Trending Books',
      command: () => trendingBooksRef.current.scrollIntoView({ behavior: 'smooth' }) 
    }
  ];

  const start = (
    <img alt="logo" src={logo} height="40" className="mr-2" onClick={() => window.scrollTo(0, 0)} />
  );
  const [loginVisible, setLoginVisible] = useState(false);
  const [signupVisible, setSignupVisible] = useState(false);

  return (
    <div className='fullc'>
      <div className='navbar-container'>
        <Menubar model={items} start={start} className='glass-effect' />
      </div>
      <div className='landingpage'>
        <div className='image-container'>
          <img src={CoverImg} alt='Book Cover' id='bookcover' />
        </div>
        <div className='content' style={{ background: "rgba(255, 255, 255, 0.26)", boxShadow: " 0px 4px 30px rgba(0, 0, 0, 0.1)", backdropFilter: "blur(5px)" }}>
          <h1>Welcome to Bookrary</h1>
          <p>Your Personal Book Haven – Curate, Read, and Connect</p>
          <Button style={{ display: "flex", flexDirection: 'row', margin: "auto", gap: "5px" }} outlined>
            <Button
              style={{ display: "flex", flexDirection: 'row', margin: "auto", gap: "5px" }}
              onClick={() => setLoginVisible(true)} 
              outlined
            >
              Sign in
            </Button>
            <Button
              style={{ display: "flex", flexDirection: 'row', margin: "auto", gap: "5px" }}
              onClick={() => setSignupVisible(true)} 
              // outlined
            >
              <i className='pi pi-user-plus'></i> Sign Up
            </Button>
          </Button>
        </div>

      </div>

      <Dialog
        header="Login"
        visible={loginVisible}
        // style={{ width: '30vw' }}
        onHide={() => setLoginVisible(false)} 
      >
        <Login />
      </Dialog>
      <Dialog
        header="Sign Up"
        visible={signupVisible}
        // style={{ width: '30vw' }}
        onHide={() => setSignupVisible(false)} // Close the modal
      >
        <Signup />
      </Dialog>

      <section className='features' ref={featuresRef}>

        <Fieldset legend="Features">
          <div className='feature-item'>
            <i className='bookshelf-icon'></i>
            <h3 className='fhead' style={{ background: "rgba(255, 255, 255, 0.26)", boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)", backdropFilter: "blur(5px)" }}>
              <h3>Personalized Bookshelves</h3>
              <p> >> Create and curate your personal library.</p>
            </h3>
          </div>
          <div className='feature-item'>
            <i className='progress-icon'></i>
            <h3 className='fhead' style={{ background: "rgba(255, 255, 255, 0.26)", boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)", backdropFilter: "blur(5px)" }}>
              <h3>Track Your Reading Progress</h3>
              <p> >> Never lose track of your reading journey.</p>
            </h3>
          </div>
          <div className='feature-item'>
            <i className='progress-icon'></i>
            <h3 className='fhead' style={{ background: "rgba(255, 255, 255, 0.26)", boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)", backdropFilter: "blur(5px)" }}>
              <h3>Share Reviews & Recommendations</h3>
              <p> >> Connect with other readers and share your thoughts</p>
            </h3>
          </div>
          <div className='feature-item'>
            <i className='progress-icon'></i>
            <h3 className='fhead' style={{ background: "rgba(255, 255, 255, 0.26)", boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)", backdropFilter: "blur(5px)" }}>
              <h3>Book Suggestions & Discover New Reads</h3>
              <p> >> Get tailored recommendations based on your reading habits.</p>
            </h3>
          </div>
        </Fieldset>
      </section>
      <section className='features' ref={testimonialsRef}>

        <Fieldset legend="User Testimonials">
          <div className='feature-item'>
            <i className='bookshelf-icon'></i>
            <h3 className='fhead' style={{ background: "rgba(255, 255, 255, 0.26)", boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)", backdropFilter: "blur(5px)" }}>

              <p>"Bookworm Haven helped me rediscover my love for reading!" – <strong>Sarah, Enthusiastic Reader</strong></p>
            </h3>
          </div>
          <div className='feature-item'>
            <i className='progress-icon'></i>
            <h3 className='fhead' style={{ background: "rgba(255, 255, 255, 0.26)", boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)", backdropFilter: "blur(5px)" }}>

              <p> "Bookworm Haven helped me rediscover my love for reading!" – <strong>Sarah, Enthusiastic Reader</strong></p>
            </h3>
          </div>

        </Fieldset>
      </section>
      <section className='features' ref={trendingBooksRef}>

        <Fieldset legend="Trending Books" >
          <div className='grid-container'>
            <div className='lcard'>
              <img src={CoverImg} alt='Book Cover' className='' style={{ width: "300px" }} />
              <h3>The Bike Guy - By Emma Mayers</h3>
            </div>

            <div className='lcard'>
              <img src={CoverImg} alt='Book Cover' className='' style={{ width: "300px" }} />
              <h3>The Bike Guy - By Emma Mayers</h3>
            </div>
          </div>
        </Fieldset>
      </section>
    </div>
  );
}
