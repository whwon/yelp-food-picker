import React, { useState } from 'react';
import { AppBar, Avatar, Button, Box, Grid, List, ListItem, ListItemAvatar, ListItemText, Tab, Tabs } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { fetchData } from '../api/api';
import { useQuery } from 'react-query';
import { Terms } from './Terms';
import { GeoLocation } from './GeoLocation';
import { OpenNow } from './OpenNow'
import { SortBy } from './SortBy';
import { Radius } from './Radius';
import { SimpleMenu } from './SimpleMenu';

export const DumpingGround = () => {
  let randomNumber;
  const [requestedData, setRequest] = useState({
    latitude: 0,
    longitude: 0,
    location: '',
    radius: '1610',
    terms: 'Restaurants',
    open_now: true,
    sort_by: 'best_match'
  });
  const { data, error, isLoading, isSuccess, refetch } = useQuery('yelp', () => fetchData({ requestedData }), {
    refetchOnWindowFocus: false,
    enabled: false // turned off by default, manual refetch is needed
  });

  const handleClick = () => { refetch(); };

  const handleRandomNum = () => randomNumber = Math.floor(Math.random() * data.businesses.length);

  if (isSuccess) handleRandomNum();

  console.log(data && data.businesses, randomNumber);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item container xs={12} md={6}><Terms requestedData={requestedData} setRequest={setRequest} /></Grid>
      <Grid item container xs={12} md={6}>
        <AppBar position='static' color='default'>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            variant='scrollable'
            scrollButtons='auto'
          >
            <Tab label={<GeoLocation requestedData={requestedData} setRequest={setRequest} />} />
            <Tab label={<OpenNow requestedData={requestedData} setRequest={setRequest} />} />
            <Tab
              label={
                <SimpleMenu buttonName='Sort'>
                  <SortBy requestedData={requestedData} setRequest={setRequest} />
                </SimpleMenu>
              }
            />
            <Tab
              label={
                <SimpleMenu buttonName='Distance'>
                  <Radius requestedData={requestedData} setRequest={setRequest} />
                </SimpleMenu>
              }
            />
          </Tabs>
        </AppBar>
      </Grid>

      {/* <Grid item container xs={12} md={6}><GeoLocation requestedData={requestedData} setRequest={setRequest} /></Grid>
      <Grid item container xs={12} md={6}><OpenNow requestedData={requestedData} setRequest={setRequest} /></Grid>
      <Grid item container xs={6} md={6}>
        <SimpleMenu buttonName='Sort'>
          <SortBy requestedData={requestedData} setRequest={setRequest} />
        </SimpleMenu>
      </Grid>
      <Grid item container xs={6} md={6}>
        <SimpleMenu buttonName='Distance'>
          <Radius requestedData={requestedData} setRequest={setRequest} />
        </SimpleMenu>
      </Grid> */}

      <Grid item container xs={12} md={6}>
        <Button
          variant='contained'
          color='primary'
          disabled={requestedData.latitude === 0}
          onClick={handleClick}
        >
          Find Place
        </Button>
      </Grid>
      <Grid item container xs={12} md={6}>
        {isLoading && <Box fontWeight="fontWeightBold" fontSize="h6.fontSize">Loading Data</Box>}
        {error && <Box fontWeight="fontWeightBold" fontSize="h6.fontSize">Error Retrieving Data</Box>}
        {isSuccess &&
          <div style={{ height: '300px', overflowY: 'auto' }}>
            {data.businesses.map((business, index) => {
              if (index === randomNumber) {
                return (
                  <List key={business.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <img src={ business.image_url } alt='business logo' />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={ business.name }
                        secondary={
                          <span style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                            <span style={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'center' }}>
                              <Rating name="read-only" value={Number(business.rating)} readOnly precision={0.5} />
                              <Box ml={2}>{business.review_count}</Box>
                            </span>
                            <span>{business.location.address1}, {business.location.city}</span>
                            <span>{business.price}</span>
                            <span>{business.display_phone}</span>
                            <a href={business.url} target="_blank" rel="noreferrer">Yelp</a>
                          </span>
                        }
                      />
                    </ListItem>
                  </List>
                );
              };
            })}
            <Button onClick={handleRandomNum}>Re-Roll</Button>
          </div>
        }
      </Grid>
    </Grid>
  );
};
