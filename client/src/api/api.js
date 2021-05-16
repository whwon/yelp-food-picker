import axios from 'axios';

const url = 'http://localhost:8000/api';

export const fetchData = ({ requestedData }) => axios.get(url, {
  params: {
    latitude: requestedData.latitude,
    longitude: requestedData.longitude,
    radius: parseInt(requestedData.radius, 10),
    location: requestedData.location,
    term: requestedData.term,
    sort_by: requestedData.sortBy,
    open_now: requestedData.openNow,
  }}).then(({data}) => data);
