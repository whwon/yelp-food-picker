import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const StyledButton = styled(Button)({
  padding: '5px 15px',
  borderRadius: '100px'
});

export const RoundedButton = (props) =>  (
  <StyledButton {...props}>
    {props.children}
  </StyledButton>
);
