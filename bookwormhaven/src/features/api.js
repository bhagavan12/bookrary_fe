import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
export const loginUser = async (username, password) => {
  // try {
    const response = await axios.post('http://localhost:3000/api/readers/login', {
      username,
      password,
    });
    console.log("response.data",response.data);
    return response.data;
  // } catch (err) {

  //   console.log(err);
  //   return err;
  // }
};

export const signupUser = async (username, email, password) => {
  const response = await api.post('/readers/signup', {
    username,
    email,
    password,
  });
  return response.data;
};
const apibase = 'http://localhost:3000';

export const fetchBooksByGenre = async (keyword) => {
  const response = await axios.get(`${apibase}/api/books/genre/${encodeURIComponent(keyword)}`);
  return response.data;
};

export const fetchBooksByAuthor = async (keyword) => {
  const response = await axios.get(`${apibase}/api/books/author/${encodeURIComponent(keyword)}`);
  return response.data;
};

export const fetchBooksByPublicationDate = async (keyword) => {
  const response = await axios.get(`${apibase}/api/books/publication-date/${encodeURIComponent(keyword)}`);
  return response.data;
};

export const fetchBooksByKeyword = async (keyword) => {
  const response = await axios.get(`${apibase}/api/books/search?keyword=${encodeURIComponent(keyword)}`);
  return response.data;
};
export default api;
