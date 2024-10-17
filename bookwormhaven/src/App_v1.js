// import logo from './logo.svg';
// import './App.css';
// import Navbar from './comp/Navbar/Navbar'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import BookDetails from './comp/Home/BookDetails';
// import { BookContext,BookProvider } from './comp/BookProvider';
// import BooksList from './comp/Home/BooksList';
// function App() {
//   return (
//     <BookProvider>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path='/booklist' element={<BooksList/>}></Route>
//           <Route path="/bookdetails" element={<BookDetails />}/>
//         </Routes>
//       </Router>
//     </BookProvider>
//   );
// }

// export default App;
// App.js
import logo from './logo.svg';
import './App.css';
import Navbar from './comp/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookDetails from './comp/Home/BookDetails';
import BooksList from './comp/Home/BooksList';
import Signup from './comp/SignInUp/SignUp'; // Import Signup
import Signin from './comp/SignInUp/Signin'; // Import Signin
import ProtectedRoute from './comp/ProtectedRoute'; // Import ProtectedRoute
import { BookProvider } from './comp/BookProvider'; // Import BookProvider

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Signin />} />
        <Route path='/booklist' element={<ProtectedRoute><BookProvider><BooksList /></BookProvider></ProtectedRoute>}/>
        <Route path="/bookdetails" element={<ProtectedRoute><BookProvider><BookDetails /></BookProvider></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
