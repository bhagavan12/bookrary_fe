import axios from 'axios';
import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
const AuthorsList = () => {
    const [authors, setAuthors] = useState([]);
    const apibase = process.env.REACT_APP_DB_HOST;
    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await axios.get(`${apibase}/api/authors`);
                setAuthors(response.data);
            } catch (error) {
                console.error("Error fetching the authors:", error);
            }
        };

        fetchAuthors();
    }, []);

    return (
        <div>
            <h1 className='heading'>Authors<i className='pi pi-pencil'></i></h1>
            <div className='alist'>
                {authors.map(author => (
                    <Card key={author.id} className='acard'>
                        <h2>{author.name}</h2>
                        <p><strong>Birth Date:</strong> {new Date(author.birth_date).toLocaleDateString()}</p>
                        <p>{author.bio}</p>
                        <Link to={author.wikipedia} className='p-button'>
                        <i className='pi pi-search-plus'></i>
                        Read more
                        </Link>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AuthorsList;
