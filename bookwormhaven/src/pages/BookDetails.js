import React, { useEffect, useState ,useRef} from 'react';
import { useSelector } from 'react-redux'; 
import '../Styling/BookDetails.css';
import { Fieldset } from 'primereact/fieldset';
import { Tag } from 'primereact/tag';
import { Link } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown'; 
import axios from 'axios';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
export default function BookDetails() {
    const toast = useRef(null);
    const selectedBook = useSelector((state) => state.book.selectedBook); 
    const userId = useSelector((state) => state.user.user.id);
    const [bookshelvesc, setBookshelvesc] = useState([]);
    const [bookInShelves, setBookInShelves] = useState({});
    const [selectedBookshelf, setSelectedBookshelf] = useState(null); 
    const base = "http://localhost:3000";

    useEffect(() => {
        handleFetchBookshelves();
    }, []);

    useEffect(() => {
        if (bookshelvesc.length > 0) {
            checkBookshelves();
        }
    }, [bookshelvesc]);

    const handleFetchBookshelves = async () => {
        try {
            const response = await axios.get(`${base}/api/bookshelves/${userId}`);
            setBookshelvesc(response.data);
            console.log("response.data",response.data)
        } catch (error) {
            console.error("Error fetching bookshelves", error);
        }
    };

    const checkBookshelves = async () => {
        const booksInShelvesStatus = {};

        await Promise.all(bookshelvesc.map(async (shelf) => {
            try {
                const res1 = await axios.get(`${base}/api/bookshelves/books/${shelf.id}/${selectedBook.id}/check`);
                booksInShelvesStatus[shelf.id] = res1.data.exists;
            } catch (err) {
                console.error(`Error checking bookshelf ${shelf.id}`, err);
                booksInShelvesStatus[shelf.id] = false;
            }
        }));

        setBookInShelves(booksInShelvesStatus);
    };

    // Function to handle adding the book to the selected bookshelf
    const handleAddToBookshelf = async (id) => {
        if (selectedBookshelf) {
            try {
                const res=await axios.post(`${base}/api/bookshelves/books`, {
                    bookshelfId:selectedBookshelf.id,
                    bookId: selectedBook.id
                });
                console.log("Book added to the bookshelf",res);
                showSuccess();
                checkBookshelves(); // Re-check the bookshelves after adding the book
            } catch (error) {
                console.error("Error adding book to the bookshelf", error);
                showError()
            }
        }
    };

    if (!selectedBook) {
        return <div>No book selected</div>;
    }
    const reviews = [
        {
            id: 1,
            reader_id: "12wer",
            book_id: selectedBook?.title,
            review: "qwertyui ertyuy wertyhgfd ",
            created_at: "2003-05-01"
        },
        {
            id: 2,
            reader_id: "12wer",
            book_id: selectedBook?.title,
            review: "qwertyui ertyuy wertyhgfd ",
            created_at: "2003-05-01"
        },
        {
            id: 3,
            reader_id: "12wer",
            book_id: selectedBook?.title,
            review: "qwertyui ertyuy wertyhgfd ",
            created_at: "2003-05-01"
        }
    ];
    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'Book added', life: 3000});
    }
    const showError = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'Error', life: 3000});
    }
    return (
        <>
            <Toast ref={toast} style={{height:"15px",width:"100px",padding:"0px"}}/>
            <div className='bookcstyle'>
                <h1 id='title'>{selectedBook?.title}</h1>
                <div className='bookc'>
                    <div>
                        <img src={selectedBook.cover_url} alt={selectedBook.title} className='bookimg' />
                        {/* Dropdown to select a bookshelf */}
                        <div>
                         
                        <Dropdown
                            value={selectedBookshelf}
                            onChange={(e) => setSelectedBookshelf(e.value)}
                            options={bookshelvesc}
                            optionLabel="name" // Display bookshelf name in dropdown
                            placeholder="Select a Bookshelf"
                            className="w-full md:w-14rem"
                            itemTemplate={(option) => (
                                <div className="flex align-items-center">
                                    <span>{option.name}</span>
                                    {bookInShelves[option.id] && <Tag severity="danger" value="Exists" className="ml-2" />}
                                </div>
                            )}
                            disabled={bookInShelves[selectedBookshelf?.id]} // Disable if book exists in the selected shelf
                            disabledItems={bookshelvesc.filter((shelf) => bookInShelves[shelf.id])} // Disable shelves with the book
                        />
                        <Button onClick={()=>handleAddToBookshelf(selectedBookshelf?.id)} disabled={!selectedBookshelf || bookInShelves[selectedBookshelf?.id]}>
                            Add to Bookshelf 
                        </Button>
                           
                        </div>
                    </div>
                    <hr />
                    <div className='bookd'>
                        <p id='st'><strong>Genre:</strong> {selectedBook.genre}</p>
                        <p id='st'><strong>Description:</strong> {selectedBook.description}</p>
                        <p id='st'><strong>Authors:</strong> {selectedBook.authors}</p>
                        <p id='st'><strong>Publishers:</strong> {selectedBook.publishers}</p>
                        <p id='st'><strong>Languages:</strong> {selectedBook.languages}</p>
                        <p id='st'><strong>Pages:</strong> {selectedBook.pages}</p>
                        <p id='st'><strong>Free to Read:</strong> {selectedBook.freeToRead ? "Yes" : "No"}</p>
                        <Link to={`/bookreading/${selectedBook.id}`}>Read for Free</Link>
                    </div>
                </div>
            </div>
            <div className='bookcstyle'>
                <Fieldset legend="Ratings">
                    {/* Render reviews */}
                    {
                        reviews?.map((robj) => (
                            <div className="bookcstyle" style={{ display: 'flex' }} key={robj.id}>
                                <p>{robj.review}</p>
                                <Tag value={robj.created_at} style={{ marginRight: "0px", marginLeft: "auto" }} />
                            </div>
                        ))
                    }
                </Fieldset>
            </div>
        </>
    );
}
