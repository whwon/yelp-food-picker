import React, { useState } from 'react';
import { Avatar, Button, Box, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { fetchData } from '../api/api';
import { useQuery } from 'react-query';

export const GeoLocation = () => {
  const [geoLoc, setGeoLoc] = useState({ latitude: 0, longitude: 0, radius: 20000})
  const [noGeoLoc, geoLocChecked] = useState('');
  const { data, error, isLoading, refetch } = useQuery('yelp', () => fetchData(geoLoc), {
    refetchOnWindowFocus: false,
    enabled: false // turned off by default, manual refetch is needed
  })
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      geoLocChecked('Geolocation is not supported by this browser.');
    }
  }

  function showPosition(position) {
    console.log(position.coords)
    setGeoLoc({ ...geoLoc, latitude: position.coords.latitude, longitude: position.coords.longitude })
  }

  // function showPosition(position) {
  //   var latlon = position.coords.latitude + "," + position.coords.longitude;

  //   var img_url = `https://maps.googleapis.com/maps/api/staticmap?center=
  //   "+latlon+"&zoom=14&size=400x300&sensor=false&key=YOUR_KEY`;
  // }

  const handleClick = () => {refetch()};

  console.log(data)
  return (
    <div>
      {noGeoLoc}
      <Button variant='outlined' color='secondary' onClick={getLocation}>Get GeoLocation</Button>
      <Button variant='contained' color='primary' disabled={geoLoc.latitude === 0} onClick={handleClick}>Fetch Data</Button>
      {/* <img src={} /> */}
      {isLoading && <Box fontWeight="fontWeightBold" fontSize="h6.fontSize">Loading Data</Box>}
      {error && <Box fontWeight="fontWeightBold" fontSize="h6.fontSize">Error Retrieving Data</Box>}
      <div style={{ height: '300px', overflowY: 'auto' }}>
        {data && data.businesses.map((business) => (
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <img src={business.image_url} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={business.name} secondary={
                <React.Fragment>
                  <div>Rating: {business.rating}</div>
                  <div>Address: {business.location.address1}</div>
                  <div>City: {business.location.city}</div>
                </React.Fragment>
              } />
            </ListItem>
          </List>
        ))}
      </div>
    </div>
  )
}
