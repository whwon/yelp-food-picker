import axios from 'axios';

const url = 'http://localhost:8000/api';

export const fetchData = (geoLoc) => axios.get(url, { params: { latitude: geoLoc.latitude, longitude: geoLoc.longitude, radius: geoLoc.radius }}).then(({data}) => data);