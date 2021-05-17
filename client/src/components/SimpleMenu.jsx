import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { ExpandMore as ExpandIcon } from '@material-ui/icons';

const StyledMenuItem = withStyles((theme) => ({
  root: {
    border: '1px solid #d3d4d5'
  },
}))(MenuItem);

export const SimpleMenu = ({ buttonName, children }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-haspopup="true" variant='outlined' endIcon={<ExpandIcon />} onClick={handleClick}>
        {buttonName}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        style={{ width: '100vw' }}
      >
        <StyledMenuItem onClick={handleClose} style={{ width: '100vw' }}>
          {children}
        </StyledMenuItem>
      </Menu>
    </div>
  );
}
