import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';

interface menu {
  menu: {
    id: string;
    label: string;
  }[];
  onMenuClick: (id: string) => void;
}

export const NavigationMenu = ({ menu, onMenuClick }: menu) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' }
          }}
        >
          {menu.map((item) => (
            <MenuItem key={item.id} onClick={handleCloseNavMenu}>
              <Typography textAlign="center">{item.label}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {menu.map((item) => (
          <Button
            key={item.id}
            onClick={() => onMenuClick(item.id)}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            {item.label}
          </Button>
        ))}
      </Box>
    </React.Fragment>
  );
};
