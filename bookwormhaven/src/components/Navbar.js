import React from 'react';
import { Menubar } from 'primereact/menubar';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux'; 
import { logout } from '../features/userSlice';
import logo from '../assets/logo.png';
export default function TemplateDemo() {
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const items = [
        {
            label: 'Books',
            icon: 'pi pi-book',
            command: () => navigate('/books') 
        },
        {
            label: 'Author',
            icon: 'pi pi-pencil',
            command: () => navigate('/author') 
        },
        {
            label: 'My Shelves',
            command: () => navigate('/my-shelves') 
        },
        {
            label: 'Profile',
            icon: 'pi pi-user',
            command: () => navigate('/profile') 
        },
        {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
                dispatch(logout()); 
                navigate('/'); 
            }
        }
    ];

    // const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;

    return (
        <div className="card" style={{width:"fit-content",margin:"auto",marginTop:"10px"}}>
            <Menubar model={items} end={<SearchBar />} />
        </div>
    );
}
