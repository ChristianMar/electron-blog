import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Avatar,
} from '@mui/material';

interface userMenu {
  avatar: string;
  username: string;
  userMenu: {
    id: string;
    label: string;
  }[];
  onUserMenuClick: (id: string) => void;
}

export const UserMenu = ({
  avatar,
  username,
  userMenu,
  onUserMenuClick,
}: userMenu) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar alt={username} src={avatar}>
          {!username ? 'A' : username.charAt(0)}
        </Avatar>
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {userMenu.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => {
              handleCloseUserMenu();
              onUserMenuClick(item.id);
            }}
          >
            <Typography textAlign="center">{item.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
