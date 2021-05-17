import React from 'react';
import { Button } from '@material-ui/core';

export const OpenNow = ({ requestedData, setRequest }) => (
  <Button
    variant='outlined'
    color={requestedData.open_now ? 'primary' : 'default'}
    onClick={() => setRequest({...requestedData, open_now: !requestedData.open_now})}
  >
    Open Now
  </Button>
);
