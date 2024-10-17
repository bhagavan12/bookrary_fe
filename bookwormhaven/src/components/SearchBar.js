import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { useNavigate } from 'react-router-dom'; 

export default function SearchBar() {
    const [selectedCriteria, setSelectedCriteria] = useState(null); 
    const [searchKeyword, setSearchKeyword] = useState(''); 
    const navigate = useNavigate();

    const criteriaOptions = [
        { name: 'Genre', value: 'genre' },
        { name: 'Author', value: 'author' },
        { name: 'Publication Date', value: 'publicationDate' },
        { name: 'Title or keywords', value: 'keyword' },
    ];

    const handleSearch = () => {
        if (selectedCriteria && searchKeyword) {
            
            navigate('/booklist', { state: { selectedCriteria, searchKeyword } });
            setSelectedCriteria(null);
            setSearchKeyword('');
        }
    };

    return (
        <div className="flex align-items-center gap-2">
            <Dropdown
                value={selectedCriteria}
                onChange={(e) => setSelectedCriteria(e.value)}
                options={criteriaOptions}
                optionLabel="name"
                placeholder="Select Criteria"
                className="w-full md:w-14rem"
            />
            <InputText
                placeholder="Search"
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-8rem sm:w-auto"
            />
            <button onClick={handleSearch} className="p-button p-component">
                <span className="p-button-icon p-c pi pi-search"></span>
                <span className="p-button-label">Search</span>
            </button>
        </div>
    );
}
