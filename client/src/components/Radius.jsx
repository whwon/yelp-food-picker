import React from 'react';
import { FormControl, RadioGroup, FormLabel, FormControlLabel, Radio } from '@material-ui/core';

export const Radius = ({ requestedData, setRequest }) => (
  <FormControl component="fieldset">
    <FormLabel component="legend">Distance</FormLabel>
    <RadioGroup
      name="radius"
      value={requestedData.radius}
      onChange={(e) => setRequest({ ...requestedData, radius: e.target.value })}
    >
      <FormControlLabel value={'805'} control={<Radio />} label="0.5 mile" />
      <FormControlLabel value={'1610'} control={<Radio />} label="1 mile" />
      <FormControlLabel value={'8047'} control={<Radio />} label="5 mile" />
    </RadioGroup>
  </FormControl>
);
