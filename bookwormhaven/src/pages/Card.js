import React from 'react';
import '../Styling/Card.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectBook } from '../features/bookSlice';
import { Button } from 'primereact/button';

export default function Card({ book }) {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const handleNavigation = () => {
    dispatch(selectBook(book));
    navigate('/bookdetails'); 
  };

  return (
    <div className='book-card' style={{ background: "rgba(255, 255, 255, 0.26)", boxShadow: " 0px 4px 30px rgba(0, 0, 0, 0.1)", backdropFilter: "blur(5px)",width:"250px" }}>
      <img src={book?.cover_url} alt='' className='image' />
      <p id="title">{book?.title}</p>
      <p id="genre">{book?.genre}</p>
      <Button onClick={handleNavigation}>Read for Free</Button>
    </div>
  );
}
