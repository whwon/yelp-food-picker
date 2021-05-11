import axios from 'axios';

const url = 'http://localhost:5000/api';

export const fetchData = () => axios.get(url)