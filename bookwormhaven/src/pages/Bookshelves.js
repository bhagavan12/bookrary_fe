import React, { useEffect, useState,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookshelves, createBookshelf, deleteBookshelf } from '../features/bookshelfSlice';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import '../Styling/Bookshelves.css';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
const BookshelfPage = () => {
    const toast = useRef(null);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { bookshelves } = useSelector((state) => state.bookshelves);
    const [visible, setVisible] = useState(false);
    const [newShelf, setNewShelf] = useState({
        name: '',
        description: '',
    });

    const navigate = useNavigate();
    useEffect(() => {
        if (user.id) {
            dispatch(fetchBookshelves(user.id));
        }
    }, [dispatch, user.id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewShelf({ ...newShelf, [name]: value });
    };
    const handleCreateBookshelf = (e) => {
        e.preventDefault();
        if (newShelf.name) {
            dispatch(createBookshelf({ userId: user.id, ...newShelf }));
            setNewShelf({ name: '', description: '' });
            setVisible(false);
            showAdd()
        }
    };

    const handleDeleteBookshelf = (id) => {
        dispatch(deleteBookshelf(id));
        showRemove();
    };
    const handleNavigation = (id,shelfname) => {
        navigate(`/shelvesbooks/${id}/${shelfname}`); 
    }
    const showAdd = () => {
        toast.current.show({severity:'success', detail:'BookShelve added', life: 3000});
    }
    const showRemove = () => {
        toast.current.show({severity:'success', detail:'BookShelve added', life: 3000});
    }
    return (
        <div className="bookshelf-page">
        <Toast ref={toast} style={{height:"15px",width:"100px",padding:"0px"}}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 icon="pi pi-times">{user.username}'s Bookshelves<i className="pi pi-bookmark-fill" style={{ fontSize: '1.5rem' }}></i></h2>

                <Button label="Create Bookshelf" icon="pi pi-plus" onClick={() => setVisible(true)} />
            </div>
            <Dialog
                header="Create a New Bookshelf"
                visible={visible}
                style={{ width: '50vw' }}
                onHide={() => setVisible(false)}
            >
                <form onSubmit={handleCreateBookshelf}>
                    <div>
                        <label htmlFor="name">Bookshelf Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={newShelf.name}
                            onChange={handleInputChange}
                            required
                            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            name="description"
                            value={newShelf.description}
                            onChange={handleInputChange}
                            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                        />
                    </div>
                    <Button type="submit" label="Create" icon="pi pi-check" className="p-button-success" />
                </form>
            </Dialog>
            <div className="bookshelf-list">
                {bookshelves && bookshelves.length > 0 ? (
                    bookshelves.map((shelf) => (
                        <div key={shelf.id} className="bookshelf-item">
                            <h3 id="bstitle">{shelf.name}<i className="pi pi-bookmark-fill" style={{ fontSize: '1rem' }}></i></h3>
                            <hr />
                            <p>{shelf.description}</p>
                            <Button icon="pi pi-times" size="small" severity="danger" style={{ width: "fit-content", padding: "5px"}} onClick={() => handleDeleteBookshelf(shelf.id)} label='Delete' text ></Button>
                            <Button size="small" style={{ width: "fit-content", padding: "5px", marginLeft: "1px" }} onClick={() => handleNavigation(shelf.id,shelf.name)} label='Open' text></Button>
                        </div>
                    ))
                ) : (
                    <p>No bookshelves created yet.</p>
                )}
            </div>

            
        </div>
    );
};

export default BookshelfPage;
