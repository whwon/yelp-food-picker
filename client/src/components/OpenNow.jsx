import React from 'react';
import { RoundedButton } from './RoundedButton';

export const OpenNow = ({ requestedData, setRequest }) => (
  <RoundedButton
    variant='outlined'
    color={requestedData.open_now ? 'primary' : 'default'}
    onClick={() => setRequest({...requestedData, open_now: !requestedData.open_now})}
  >
    Open Now
  </RoundedButton>
);
