
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookDetails from './pages/BookDetails';
import BooksList from './pages/BooksList';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from './app/store';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import Landingpage from './pages/Landingpage';
import BookReader from './pages/BookReading';
import Bookshelves from './pages/Bookshelves';
import Bookshelf from './pages/BookShelvesBooks';
import Books from './pages/Books';
import AuthorsList from './pages/Author';
function App() {
  const user = useSelector((state) => state.user?.user.username|| localStorage.getItem('token'));
 console.log("user",user);
  return (
    <>
      <Router>
      {user && <Navbar />}
        <Routes>
          {/* {(!user)? */}
          <Route path='/' element={(!user)?<Landingpage />:<Books />} />
          <Route path='/home' element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path='/booklist' element={
            <ProtectedRoute>
              <BooksList />
            </ProtectedRoute>
          } />
          <Route path='/bookdetails' element={
            <ProtectedRoute>
              <BookDetails />
            </ProtectedRoute>
          } />
          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path='/bookreading/:bookId' element={
            <ProtectedRoute>
              <BookReader />
            </ProtectedRoute>
          } />
          <Route path='/my-shelves' element={
            <ProtectedRoute>
              <Bookshelves />
            </ProtectedRoute>
          } />
          <Route path='/shelvesbooks/:bookshelfId/:bookshelfName' element={
            <ProtectedRoute>
              <Bookshelf />
            </ProtectedRoute>
          } />
          <Route path='/author' element={
            <ProtectedRoute>
              <AuthorsList />
            </ProtectedRoute>
          } />
          <Route path='/books' element={
            <ProtectedRoute>
              <Books />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
