// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// const BookList = ({ status }) => {
//     const [books, setBooks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
    
//     const readerId = useSelector((state) => state.user.user.id); // Get readerId from userSlice

//     useEffect(() => {
//         const fetchBooks = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3001/api/progress/${status}/${readerId}`);
//                 setBooks(response.data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBooks();
//     }, [status, readerId]); // Dependency array ensures effect runs on change of status or readerId

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div>
//             <h2>{status === 'in_progress' ? 'Currently Reading' : 'Completed Books'}</h2>
//             <ul>
//                 {books.map((book) => (
//                     <li key={book.book_id}>
//                         <h3>{book.book_title}</h3>
//                         <p>Started on: {new Date(book.start_date).toLocaleDateString()}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default BookList;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { selectBook } from '../features/bookSlice'; // Assuming you're using Redux for book details

// const BookList = ({ status }) => {
//     const [books, setBooks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
    
//     const readerId = useSelector((state) => state.user.user.id); // Get readerId from userSlice
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchBooks = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3000/api/progress/${status}/${readerId}`);
//                 setBooks(response.data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBooks();
//     }, [status, readerId]); // Re-fetch when status or readerId changes

//     const handleNavigation = (book) => {
//         dispatch(selectBook(book)); // Dispatch the selected book to Redux
//         navigate('/bookdetails'); // Navigate to the book details page
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div>
//             <h2>{status === 'in_progress' ? 'Currently Reading' : 'Completed Books'}</h2>
//             <ul>
//                 {books.map((book) => (
                    
//                     <div key={book.book_id} style={{ marginBottom: '20px' }} className='cardd'>
//                         <img 
//                             src={`${book.cover_url}`} 
//                             alt={book.title} 
//                             // style={{ width: '100px', height: '150px', objectFit: 'cover' }} 
//                             className='image'
//                         />
//                         <h4>{book.title}</h4>
//                         <button onClick={() => handleNavigation(book)}>Read for Free</button>
//                     </div>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default BookList;
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { selectBook } from '../features/bookSlice'; 
import { ProgressBar } from 'primereact/progressbar';
export default function BookCarousel({ status }) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const readerId = useSelector((state) => state.user.user.id); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/progress/${status}/${readerId}`);
                setBooks(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [status, readerId]);

    const handleNavigation = (book) => {
        dispatch(selectBook(book)); 
        navigate('/bookdetails');
    };

    const bookTemplate = (book) => {
        return (
            <div className='book-card'>
                <div className="mb-3">
                    <img src={book.cover_url} alt={book.title} className='image' style={{height:"300px"}}/>
                </div>
                <div>
                    <h4 className="">{book.title}</h4>
                    <h6 className="">{book.authors}</h6>
                    {/* <h6>{book.current_page}/{book.total_pages}</h6> */}
                    <ProgressBar value={Math.ceil((book.current_page/book.total_pages)*100)}></ProgressBar>
                    <div className="">
                        <Button label="Read for Free" className="p-button-rounded" onClick={() => handleNavigation(book)} raised/>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>{status == 'current' ? 'Currently Reading' : 'Completed Books'}</h2>
            <Carousel 
                value={books} 
                numVisible={3} 
                numScroll={1} 
                responsiveOptions={responsiveOptions} 
                circular
                itemTemplate={bookTemplate} 
                
            />
        </div>
    );
}
