import React, { useState } from 'react';
import { AppBar, Tab, Tabs } from '@material-ui/core';

const terms = ['Pizza', 'Breakfast', 'Burgers', 'Chinese', 'Mexican', 'Korean', 'Thai', 'Steakhouses', 'Seafood', 'Japanese', 'Italian', 'Vietnamese', 'Sandwiches', 'Vegetarian', 'Sushi', 'American'];

export const Terms = ({ requestedData, setRequest }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log('Term --> ', requestedData.term)

  return (
    <AppBar position='static' color='default'>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        variant='scrollable'
        scrollButtons='auto'
      >
        {terms.map((foodType, index) => (
          <Tab key={`${foodType}-${index}`} onClick={() => setRequest({ ...requestedData, term: foodType })} label={foodType} />
        ))}
      </Tabs>
    </AppBar>
  )
}
