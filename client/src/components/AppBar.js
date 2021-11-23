import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import HouseIcon from '@mui/icons-material/House';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import FunctionsIcon from '@mui/icons-material/Functions';
import SortIcon from '@mui/icons-material/Sort';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#c4c4c4",
  '&:hover': {
    backgroundColor: "#c4c4c4",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));


export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    setAnchorEl(null);
    console.log(event.target.textContent);
    // TODO - write store functions to get lists and sort.
    switch (event.target.textContent) {
        case "Publish Date (Newest)":
            break;
        case "Publish Date (Oldest)":
            break;
        case "Views":
            break;
        case "Likes":
            break;
        case "Dislikes":
            break;
        default:
            console.log("Invalid sort???");
            break;
    }
  };

  const menuId = 'sort-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Publish Date (Newest)</MenuItem>
      <MenuItem onClick={handleMenuClose}>Publish Date (Oldest)</MenuItem>
      <MenuItem onClick={handleMenuClose}>Views</MenuItem>
      <MenuItem onClick={handleMenuClose}>Likes</MenuItem>
      <MenuItem onClick={handleMenuClose}>Dislikes</MenuItem>
    </Menu>
  );
  // TODO - write store functions to get proper lists of which we can then put in the IconButton's onClick.
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#e6e6e6' }}>
        <Toolbar>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton size="large" color="default">
                <Badge>
                    <HouseIcon />
                </Badge>
                </IconButton>

                <IconButton size="large" color="default">
                <Badge>
                    <GroupsIcon />
                </Badge>
                </IconButton>

                <IconButton size="large" color="default">
                <Badge>
                    <PersonIcon />
                </Badge>
                </IconButton>

                <IconButton size="large" color="default">
                <Badge>
                    <FunctionsIcon />
                </Badge>
                </IconButton>
            </Box>


          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>


          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems:"center"}}>

            <Typography
                variant="subtitle1"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' }}}
                color="black"
            >
                Sort By
            </Typography>

            <IconButton
              size="large"
              edge="end"
              aria-label="Sort Menu"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="default"
            >
                <Badge>
                    <SortIcon />
                </Badge>
            </IconButton>



          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}