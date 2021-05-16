import React, { useState } from 'react';
import { Avatar, Button, Box, Grid, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { fetchData } from '../api/api';
import { useQuery } from 'react-query';
import { Terms } from './Terms';
import { GeoLocation } from './GeoLocation';
import { OpenNow } from './OpenNow'
import { SortBy } from './SortBy';
import { Radius } from './Radius';

export const DumpingGround = () => {
  const [requestedData, setRequest] = useState({
    latitude: 0,
    longitude: 0,
    location: '',
    radius: '1610',
    terms: '',
    open_now: true,
    sort_by: 'best_match'
  });
  const { data, error, isLoading, isSuccess, refetch } = useQuery('yelp', () => fetchData({ requestedData }), {
    refetchOnWindowFocus: false,
    enabled: false // turned off by default, manual refetch is needed
  });

  const handleClick = () => { refetch(); };

  let randomNumber;
  if (isSuccess) {randomNumber = Math.floor(Math.random() * data.businesses.length); console.log(data.businesses[randomNumber])};

  console.log(data && data.businesses, randomNumber);

  return (
    <Grid container spacing={2}>
      <Grid item container xs={12} md={6}><Terms requestedData={requestedData} setRequest={setRequest} /></Grid>
      <Grid item container xs={12} md={6}><GeoLocation requestedData={requestedData} setRequest={setRequest} /></Grid>
      <Grid item container xs={12} md={6}><OpenNow requestedData={requestedData} setRequest={setRequest} /></Grid>
      <Grid item container xs={12} md={6}><SortBy requestedData={requestedData} setRequest={setRequest} /></Grid>
      <Grid item container xs={12} md={6}><Radius requestedData={requestedData} setRequest={setRequest} /></Grid>
      <Grid item container xs={12} md={6}>
        <Button variant='contained' color='primary' onClick={handleClick}>Fetch Data</Button>
        {/* <Button variant='contained' color='primary' disabled={geoLoc.latitude === 0} onClick={handleClick}>Fetch Data</Button> */}
      </Grid>
      <Grid item container xs={12} md={6}>
        {isLoading && <Box fontWeight="fontWeightBold" fontSize="h6.fontSize">Loading Data</Box>}
        {error && <Box fontWeight="fontWeightBold" fontSize="h6.fontSize">Error Retrieving Data</Box>}
        {isSuccess && <div style={{ height: '300px', overflowY: 'auto' }}>
          {/* {data && data.businesses.map((business) => (
            <List key={business.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <img src={business.image_url} alt='business logo' />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={business.name} secondary={
                  <React.Fragment>
                    <span>Rating: {business.rating}</span>
                    <span>Address: {business.location.address1}</span>
                    <span>City: {business.location.city}</span>
                  </React.Fragment>
                } />
              </ListItem>
            </List> */}
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <img src={data.businesses[randomNumber].image_url} alt='business logo' />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={data.businesses[randomNumber].name} secondary={
                <span style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                  <div style={{ display: 'flex' }}>
                    <Rating name="read-only" value={Number(data.businesses[randomNumber].rating)} readOnly precision={0.5} />
                    <Box ml={2}>{data.businesses[randomNumber].review_count}</Box>
                  </div>
                  <span>{data.businesses[randomNumber].location.address1}, {data.businesses[randomNumber].location.city}</span>
                  <span>{data.businesses[randomNumber].price}</span>
                  <span>{data.businesses[randomNumber].display_phone}</span>
                </span>
              } />
            </ListItem>
          </List>
        </div>
      }
      </Grid>
    </Grid>
  )
}
