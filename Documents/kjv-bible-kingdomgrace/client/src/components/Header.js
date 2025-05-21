import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import BookIcon from '@mui/icons-material/Book';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <BookIcon sx={{ mr: 2 }} />
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          KJV Bible Verse Separator
        </Typography>
        <Button
          color="inherit"
          component={RouterLink}
          to="/"
        >
          Search
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header; 