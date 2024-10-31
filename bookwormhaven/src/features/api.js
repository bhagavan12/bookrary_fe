import axios from 'axios';
const baseapi=process.env.REACT_APP_DB_HOST;
const api = axios.create({
  baseURL: `${baseapi}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const loginUser = async (username, password) => {
  // try {
    const response = await axios.post(`${baseapi}/api/readers/login`, {
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
const apibase = process.env.REACT_APP_DB_HOST;

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
