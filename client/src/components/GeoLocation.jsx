import React, { useState, useEffect } from 'react';
import { Input } from '@material-ui/core';
import { RoundedButton } from './RoundedButton';

export const GeoLocation = ({ requestedData, setRequest }) => {
  const [noGeoLoc, geoLocChecked] = useState('');

  useEffect(() =>
    getLocation()
  , [])

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      geoLocChecked('Geolocation is not supported by this browser.');
    }
  }

  function showPosition(position) {
    console.log(position.coords)
    setRequest({ ...requestedData, latitude: position.coords.latitude, longitude: position.coords.longitude })
  }

  // function showPosition(position) {
  //   var latlon = position.coords.latitude + "," + position.coords.longitude;

  //   var img_url = `https://maps.googleapis.com/maps/api/staticmap?center=
  //   "+latlon+"&zoom=14&size=400x300&sensor=false&key=YOUR_KEY`;
  // }

  return (
    <>
      <RoundedButton
        variant='outlined'
        color={requestedData.latitude > 0 ? 'primary' : 'default'}
        onClick={getLocation}
      >
        Get Location
      </RoundedButton>
      {/* <Input placeholder='Zip Code' onChange={(e) => setRequest({ ...requestedData, location: e.target.value })}/> */}
    </>
  )
}
