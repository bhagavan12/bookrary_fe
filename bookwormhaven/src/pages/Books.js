import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectBook } from '../features/bookSlice';
import './Books.css';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
const BooksList = () => {
    const [books, setBooks] = useState([]);
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const handleNavigation = (book) => {
        dispatch(selectBook(book)); 
        navigate('/bookdetails'); 
    };
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/books');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooks();
    }, []);

    return (
        <div className="books-list">
            <h1 className='heading'>Books<i className='pi pi-book'></i></h1>
            <div className="books-grid">
                {books.map((book) => (
                    <div key={book.id} className="book-card"  style={{ background: "rgba(255, 255, 255, 0.26)", boxShadow: " 0px 4px 30px rgba(0, 0, 0, 0.1)", backdropFilter: "blur(5px)" }}>
                        <div className="book-cover-container">
                            <img src={book.cover_url} alt={book.title} className="book-cover" />
                            <Tag className="genre-tag">{book.genre}</Tag>
                        </div>
                        <h2>{book.title}</h2>
                        <p><strong>Author:</strong> {book.authors.join(', ')}</p>
                        <p style={{ fontSize: "small" }}><strong>Publish Date:</strong> {new Date(book.publishDate).toDateString()}</p>
                        <p>Published at {book.publishers.join(', ')}</p>
                        <Button style={{display:"flex",flexDirection:'row',margin:"auto",gap:"5px"}} outlined>
                            <Button onClick={() => handleNavigation(book)} size='small' text raised style={{}}>Open</Button>
                            <Link to={`/bookreading/${book.id}`} className='p-button' style={{fontSize:"small"}}>Read</Link>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BooksList;
