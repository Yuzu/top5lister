import * as React from 'react';
import { styled } from '@mui/material/styles';
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

import { useContext } from 'react'
import { GlobalStoreContext } from '../store'


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

  const CurrentViewType = {
    HOME_SCREEN: "HOME_SCREEN",
    ALL_LISTS: "ALL_LISTS",
    USER_LISTS: "USER_LISTS",
    COMMUNITY_LISTS: "COMMUNITY_LISTS"
  }
  
  const currentSortType = {
    PUB_NEW: "PUB_NEW",
    PUB_OLD: "PUB_OLD",
    VIEWS: "VIEWS",
    LIKES: "LIKES",
    DISLIKES: "DISLIKES"
}

  const { store } = useContext(GlobalStoreContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    setAnchorEl(null);
    console.log("Sort By: " + event.target.textContent);
    switch (event.target.textContent) {
        case "Publish Date (Newest)":
        case "Update Date (Newest)":
          store.setSort(currentSortType.PUB_NEW);
          break;
        case "Publish Date (Oldest)":
        case "Update Date (Oldest)":
          store.setSort(currentSortType.PUB_OLD);
          break;
        case "Views":
          store.setSort(currentSortType.VIEWS);
          break;
        case "Likes":
          store.setSort(currentSortType.LIKES);
          break;
        case "Dislikes":
          store.setSort(currentSortType.DISLIKES);
          break;
        default:
          console.log("Sort menu closed");
          break;
    }
  };

  const handleKeyPress = (event) => {
    if (event.code === "Enter") {
        event.stopPropagation();
        event.preventDefault();
        // Pass off to the search handler.
        store.handleSearch(event.target.value);
    }
  }

  let pubUpdate = "Publish";
  if (store.currentView === CurrentViewType.COMMUNITY_LISTS) {
    pubUpdate = "Update";
  }

  let pubNewOption = (<MenuItem onClick={handleMenuClose}>{pubUpdate + " Date (Newest)"}</MenuItem>);
  let pubOldOption = (<MenuItem onClick={handleMenuClose}>{pubUpdate + " Date (Oldest)"}</MenuItem>);
  let viewsOption = (<MenuItem onClick={handleMenuClose}>Views</MenuItem>);
  let likesOption = (<MenuItem onClick={handleMenuClose}>Likes</MenuItem>);
  let dislikesOption = <MenuItem onClick={handleMenuClose}>Dislikes</MenuItem>;

  switch (store.currentSort) {
    case currentSortType.PUB_NEW:
      pubNewOption = (<MenuItem selected onClick={handleMenuClose}>{pubUpdate + " Date (Newest)"}</MenuItem>);
      break;
    case currentSortType.PUB_OLD:
      pubOldOption = (<MenuItem selected onClick={handleMenuClose}>{pubUpdate + " Date (Oldest)"}</MenuItem>);
      break;
    case currentSortType.VIEWS:
      viewsOption = (<MenuItem selected onClick={handleMenuClose}>Views</MenuItem>);
      break;
    case currentSortType.LIKES:
      likesOption = (<MenuItem selected onClick={handleMenuClose}>Likes</MenuItem>);
      break;
    case currentSortType.DISLIKES:
      dislikesOption = <MenuItem selected onClick={handleMenuClose}>Dislikes</MenuItem>;
      break;
    default:
      break;
}
  
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
      {pubNewOption}
      {pubOldOption}
      {viewsOption}
      {likesOption}
      {dislikesOption}
    </Menu>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#c4c4c4' }}>
        <Toolbar>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                    id="HOME_SCREEN"
                    onClick={store.homeView} 
                    size="large" 
                    sx={{ color: store.currentView === CurrentViewType.HOME_SCREEN ? "#0743e8" :"#6a6a6a"}}
                >
                <Badge>
                    <HouseIcon />
                </Badge>
                </IconButton>

                <IconButton 
                    id="ALL_LISTS"
                    onClick={store.allView} 
                    size="large" 
                    sx={{ color: store.currentView === CurrentViewType.ALL_LISTS ? "#0743e8" :"#6a6a6a"}}
                >
                <Badge>
                    <GroupsIcon />
                </Badge>
                </IconButton>

                <IconButton
                    id="USER_LISTS"
                    onClick={store.userView} 
                    size="large"
                    sx={{ color: store.currentView === CurrentViewType.USER_LISTS ? "#0743e8" :"#6a6a6a"}}
                >
                <Badge>
                    <PersonIcon />
                </Badge>
                </IconButton>

                <IconButton
                    id="COMMUNITY_LISTS"
                    onClick={store.communityView}
                    size="large"
                    sx={{ color: store.currentView === CurrentViewType.COMMUNITY_LISTS ? "#0743e8" :"#6a6a6a"}}
                >
                <Badge>
                    <FunctionsIcon />
                </Badge>
                </IconButton>
            </Box>

          
          <Search >
            
            <SearchIconWrapper >
              <SearchIcon color="inherit"/>
            </SearchIconWrapper>
            <StyledInputBase
                style={{
                  borderRadius: "10px",
                  borderStyle: "solid",
                  borderColor: "#6A6A6A"
              }}
              onKeyPress={handleKeyPress}
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