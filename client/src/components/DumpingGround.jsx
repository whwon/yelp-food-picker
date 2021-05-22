import React, { useState, useEffect } from 'react';
import { AppBar, Button, Box, CircularProgress, Grid, Tab, Tabs } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { fetchData } from '../api/api';
import { useQuery } from 'react-query';
import { Terms } from './Terms';
import { GeoLocation } from './GeoLocation';
import { OpenNow } from './OpenNow'
import { SortBy } from './SortBy';
import { Radius } from './Radius';
import { SimpleMenu } from './SimpleMenu';

const defaultValue = {
  latitude: 0,
  longitude: 0,
  location: '',
  radius: '1610',
  terms: 'Restaurants',
  open_now: true,
  sort_by: 'best_match'
}

export const DumpingGround = () => {
  const [requestedData, setRequest] = useState(defaultValue);
  const [filteredValue, setFilter] = useState(0);
  const [randomNumber, setRandomNum] = useState()
  const { data, error, isLoading, isSuccess, refetch } = useQuery('yelp', () => fetchData({ requestedData }), {
    refetchOnWindowFocus: false,
    enabled: false // turned off by default, manual refetch is needed
  });

  useEffect(() => {
    if (isSuccess) {
      handleRandomNum()
    }
  }, [isSuccess])

  const handleFilter = (event, newValue) => {
    setFilter(newValue);
  };
  const handleClick = () => { refetch(); };

  const handleRandomNum = () => setRandomNum(Math.floor(Math.random() * data.businesses.length));


  return (
    <Grid container spacing={2}>
      <Grid item container xs={12} md={6}><Terms requestedData={requestedData} setRequest={setRequest} /></Grid>
      <Grid item container xs={12} md={6}>
        <AppBar position='static' color='default'>
          <Tabs
            value={filteredValue}
            onChange={handleFilter}
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

      <Grid item container xs={12} md={6}>
        {isLoading && <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '300px'}}><CircularProgress size='6rem'/></div>}
        {error && <Box fontWeight="fontWeightBold" fontSize="h6.fontSize">Error Retrieving Data</Box>}
        {isSuccess &&
          <div >
            {data.businesses.map((business, index) => {
              if (index === randomNumber) {
                return (
                  <div key={business.id} style={{ padding: '1rem' }}>
                    <img style={{ width: '100%', height: '300px'}} src={ business.image_url } alt='business logo' />
                    <span style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                      <span style={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'center' }}>
                        <Rating name="read-only" value={Number(business.rating)} readOnly precision={0.5} />
                        <Box ml={2}>{business.review_count}</Box>
                      </span>
                      <span>{business.location.address1}, {business.location.city}</span>
                      <span>{business.price ? business.price : '$'}</span>
                      <span>{business.display_phone}</span>
                      <a href={business.url} target="_blank" rel="noreferrer">Yelp</a>
                    </span>
                  </div>
                );
              };
            })}
          </div>
        }
        {!isSuccess && <img alt="" height="auto" width="100%" src="http://9pl9.mjt.lu/tplimg/9pl9/b/yvom/zn8m2.png" title="" />}
      </Grid>
      <Grid item container xs={12} md={6}>
        <Box m={1} style={{ width: '100%' }}>
          <Button
            variant='contained'
            color='primary'
            disabled={requestedData.latitude === 0}
            fullWidth
            onClick={handleClick}
          >
            Find Place
          </Button>
        </Box>
        <Box m={1} style={{ width: '100%' }}>
          <Button
            variant='outlined'
            color='primary'
            disabled={!isSuccess}
            fullWidth
            onClick={handleRandomNum}
          >
            ReRoll
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
