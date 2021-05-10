import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [geoPosition, setGeoPosition] = useState({
    latitude: 0,
    longitude: 0,
    radius: 40000
  });
  const url = `https://api.yelp.com/v3/businesses/search`;

  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition);
    }
  }

  const getStateStatus = () => {
    console.log(geoPosition)
  }

  function getPosition(position) {
    setGeoPosition({...geoPosition, latitude: position.coords.latitude, longitude: position.coords.longitude})
    console.log(position.coords.latitude, position.coords.longitude);
  }

  const fetchData = async () => {
    // const data = await axios.get(`${'https://cors-anywhere.herokuapp.com/'}${url}`, {
    //   headers: {
    //     Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
    //   },
    //   params: {
    //     latitude: geoPosition.latitude,
    //     longitude: geoPosition.longitude,
    //     radius: geoPosition.radius,
    //     limit: 20
    //   }
    // }).then((data) => console.log(data)).catch((error) => console.log(error));

    console.log(process.env.REACT_APP_API_KEY)

    const data = await axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=usa`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            'Content-Type': 'application/json'
          },
          params: {
            term: 'restaurants',
            limit: 20
          },
        },
      )
      .then(json => {
        console.log(json)
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="App">
      <button onClick={() => getStateStatus()}>Status</button>
      <button onClick={() => getGeoLocation()}>Geolocation</button>
      <button onClick={() => fetchData()}>Yelp</button>
    </div>
  );
}

export default App;
