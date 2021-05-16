import React from 'react';
import { FormControl, RadioGroup, FormLabel, FormControlLabel, Radio } from '@material-ui/core';

export const SortBy = ({ requestedData, setRequest }) => (
    <FormControl component="fieldset">
      <FormLabel component="legend">Sort by</FormLabel>
      <RadioGroup
        name="sort_by"
        value={requestedData.sort_by}
        onChange={(e) => setRequest({ ...requestedData, sort_by: e.target.value})}
      >
        <FormControlLabel value="best_match" control={<Radio />} label="Recommended (default)" />
        <FormControlLabel value="distance" control={<Radio />} label="Distance" />
        <FormControlLabel value="rating" control={<Radio />} label="Rating" />
        <FormControlLabel value="review" control={<Radio />} label="Most Reviewed" />
      </RadioGroup>
    </FormControl>
  );
