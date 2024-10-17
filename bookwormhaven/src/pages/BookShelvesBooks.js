import React, { useState, useEffect,useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectBook } from '../features/bookSlice';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Carousel } from 'primereact/carousel';
import { Toast } from 'primereact/toast';
const Bookshelf = () => {
    const toast = useRef(null);
    const { bookshelfId, bookshelfName } = useParams();
    const [books, setBooks] = useState([]);
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const base = "http://localhost:3000"

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    useEffect(() => {
        const fetchBookshelfData = async () => {
            try {
                const booksResponse = await axios.get(`${base}/api/bookshelves/books/${bookshelfId}`);
                setBooks(booksResponse.data);
                console.log(booksResponse.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBookshelfData();
    }, [bookshelfId]);
    const handleRemoveBook = async (bookId) => {
        try {
            await axios.delete(`${base}/api/bookshelves/books/${bookshelfId}/${bookId}`);
            const updatedBooks = books.filter((book) => book.id !== bookId);
            console.log("bookId",bookId,"remaining",updatedBooks);
            showSuccess();
            setBooks(updatedBooks);
        } catch (error) {
            showError();
            console.error('Error removing book:', error);
        }
    };
    const handleNavigation = (book) => {
        dispatch(selectBook(book)); 
        navigate('/bookdetails');
    };
    const bookTemplate = (book) => {
        return (
            <div className="book-card" style={{ background: "rgba(255, 255, 255, 0.26)", boxShadow: " 0px 4px 30px rgba(0, 0, 0, 0.1)", backdropFilter: "blur(5px)",width:"250px" }}>
                <img src={book.cover_url} alt={book.title} className='image' />
                <h3>{book.title}</h3>
                <p>By: {book.authors.join(', ')}</p>
                <Button style={{display:"flex",flexDirection:'column',margin:"auto",gap:"5px",width:"200px"}} outlined>
                    <Button label="Open" onClick={() => handleNavigation(book)} size='small' style={{width:"190px"}} />
                    <Button label="Remove" onClick={() => handleRemoveBook(book.id)} size='small' style={{width:"190px"}}/>
                </Button>
                
            </div>
        );
    };
    const showSuccess = () => {
        toast.current.show({severity:'success',detail:'Book Removed', life: 3000});
    }
    const showError = () => {
        toast.current.show({severity:'error', detail:'Error', life: 3000});
    }
    return (
        <div className='slidercomp'>
        <Toast ref={toast} style={{height:"15px",width:"100px",padding:"0px"}}/>
            <h1>{bookshelfName}</h1>
            {books.length > 0 ? (
                <Carousel
                    value={books}
                    numVisible={3}
                    numScroll={1}
                    responsiveOptions={responsiveOptions}
                    circular
                    itemTemplate={bookTemplate}
                />
            ) : (
                <p>No books added yet.</p> 
            )}
        </div>
    );
};

export default Bookshelf;
