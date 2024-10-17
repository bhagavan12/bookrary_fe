import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import '../Styling/BookDetails.css';
import { Button } from 'primereact/button';
const BookReader = () => {
  const { bookId } = useParams(); 
  const readerId = useSelector((state) => state.user.user.id);
  const bookname=useSelector((state)=>state.book.selectedBook.title);
  const [progress, setProgress] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookContent, setBookContent] = useState(''); 
  const [totalPages, setTotalPages] = useState(0); 
  const [bookTotalcontent,setTc]=useState('');
  const THRESHOLD = 3000; 
  const fetchBookContent = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/book-content/${bookId}`);
      const content = response.data;
        console.log("content",content)
      const totalPageCount = Math.ceil(content.length / THRESHOLD);
      console.log(totalPageCount)
      setTotalPages(totalPageCount); 
      return content;
    } catch (error) {
      console.error('Error fetching book content:', error);
    }
  };
  const fetchProgressAndInitialize = async (bookContentAll) => {
    try {
      const progressResponse = await axios.get(
        `http://localhost:3000/api/progress/progress/${readerId}/${bookId}`
      );

      if (progressResponse.data) {
        setProgress(progressResponse.data);
        setCurrentPage(progressResponse.data.current_page);
        const start = (progressResponse.data.current_page - 1) * THRESHOLD;
      const end = start + THRESHOLD;
        setBookContent(bookContentAll.slice(start,end));
      } else {
        await axios.post(`http://localhost:3000/api/progress/update`, {
          readerId,
          bookId,
          currentPage: 1, 
          totalPages, 
          statusOfBook: 'in_progress',
        });
        setCurrentPage(1); 
        
      }
    } catch (error) {
      console.error('Error fetching or initializing progress:', error);
    }
  };
  useEffect(() => {
    const initBookReader = async () => {
      const bookContentAll = await fetchBookContent(); 
      setTc(bookContentAll);
      await fetchProgressAndInitialize(bookContentAll); 
    };

    initBookReader();
  }, [readerId, bookId]);

  const handlePageChange = async (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);

      await axios.post(`http://localhost:3000/api/progress/update`, {
        readerId,
        bookId,
        currentPage: newPage,
        totalPages,
        statusOfBook: newPage === totalPages ? 'completed' : 'in_progress',
      });

      const start = (newPage - 1) * THRESHOLD;
      const end = start + THRESHOLD;
      const contentForNewPage = bookTotalcontent.slice(start, end);
      setBookContent(contentForNewPage);
    }
  };

  return (
    <div>
      <h1 className='heading'>{bookname}'s content</h1>
      

      <div style={{marginTop:"10px",width:"fit-content",margin:"auto"}}>
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          size='small'
          raised
        >
          Previous Page
        </Button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          size='small'
          raised
        >
          Next Page
        </Button>
      </div>
      <p className='booktext'>{bookContent}</p> 
      <div style={{marginTop:"10px",width:"fit-content",margin:"auto"}}>
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          size='small'
          raised
        >
          Previous Page
        </Button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          size='small'
          raised
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default BookReader;
