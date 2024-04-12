import React, { useState, useEffect } from 'react';
import './Navbar.css';
// import Modal from '../../utils/Modal'
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';
import CategoryIcon from '@mui/icons-material/Category';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import ListItemIcon from '@mui/material/ListItemIcon';
import { checkToken } from '../../utils/auth';
import axios from 'axios';

const settings = ['Profile', 'Settings', 'Logout'];
const categories = ['Fiction', 'Romance', 'Biography', 'Psychology', 'Self Growth', 'Horror', 'Historical', 'Kids', 'Spiritual'];
const helpItems = [
  { text: 'Your Account', icon: <PersonIcon /> },
  { text: 'Customer Support', icon: <HelpIcon /> },
  { text: 'Settings', icon: <SettingsIcon /> }
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCategories, setShowCategories] = React.useState(false);
  const [showHelp, setShowHelp] = React.useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setCartCount(0);
    const loggedIn = checkToken();
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      const userId = localStorage.getItem('userId');
      axios.get(`https://bookbazaar-cart-service.onrender.com/cart/cartCount?userId=${userId}`)
        .then(response => {
          setCartCount(response.data);
        })
        .catch(error => {
          console.error('Error fetching cart count:', error);
        });
    } else {
      setCartCount(0);
    }
  }, [isLoggedIn]);

  const handleOpenUserMenu = () => {
    setAnchorElUser(!anchorElUser);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = (newOpen, path) => () => {
    setOpen(newOpen);
    if (path) {
      setOpen(false);
      navigate(path);
    }
  };

  const loadBooksByCategory = (category) => {
    setSelectedCategory(category);
    navigate(`/categorizedBooks?category=${category}`);
    setOpen(false);
  };

  const toggleCategories = (event) => {
    event.stopPropagation();
    setShowCategories(!showCategories);
    setShowHelp(false);
  };

  const toggleHelp = (event) => {
    event.stopPropagation();
    setShowHelp(!showHelp);
    setShowCategories(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    navigate('/');
  };

  const DrawerList = (
    <div
      role="presentation"
      onClick={(event) => {
        event.stopPropagation();
      }}
      onKeyDown={(event) => {
        event.stopPropagation();
      }}
    >
      <List>
        {[
          { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
          { text: 'New Releases', icon: <NewReleasesIcon /> },
          { text: 'Trending', icon: <TrendingUpIcon /> },
          { text: 'Popular', icon: <StarIcon />, path: '/popularBooks' },
          {
            text: 'Shop By Category',
            icon: <CategoryIcon />,
            onClick: toggleCategories,
          },
          { text: 'Settings', icon: <SettingsIcon /> },
          { text: 'Help', icon: <HelpIcon />, onClick: toggleHelp },
        ].map(({ text, icon, onClick, path }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={onClick ? onClick : toggleDrawer(true, path)}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {showCategories && (
          <div>
            {categories.map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => loadBooksByCategory(text)}>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </div>
        )}
        {showHelp && (
          <div>
            {helpItems.map(({ text, icon }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </div>
        )}
      </List>
    </div>
  );

  return (
    <Stack direction="column" alignItems="stretch" spacing={0}>
      <AppBar position="static" className="navbar">
        <Toolbar>
          {/* Logo */}
          <Typography variant="h6" className="logo">
            <Link to="/" className="link">
              BOOKBAZARHUB
            </Link>
          </Typography>

          {/* Search Bar */}
          <div className="search-container">
            <div className="search-bar">
              <IconButton size="small" className="search-icon-btn">
                <SearchIcon />
              </IconButton>
              <InputBase
                placeholder="Search..."
                className="search-input"
              />
            </div>
          </div>

          {/* Cart Icon */}
          <IconButton color="inherit" className="cart-icon" style={{marginRight:'30px', marginTop:'20px'}}>
            <Link to="/cart" className="link">
              <Tooltip title="View Cart">
                <ShoppingCartIcon style={{fontSize:'35px', color:'blue'}}/>
              </Tooltip>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          </IconButton>

          {/* Sell Book Button */}
          <Button component={Link} to="/SellBook" color="inherit" className="sell-book-btn">
            Sell Book
          </Button>
        </Toolbar>
      </AppBar>

      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              className="menu-icon"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
              <IconButton onClick={toggleDrawer(false)} edge="start" color="inherit">
                <CloseIcon />
              </IconButton>
              {DrawerList}
            </Drawer>


            {/* Links to other pages */}
            <Link to="/" className="link">Home</Link>
            <Link to="/browseBooks" className="link">Browse Books</Link>
            <Link to="/wishlist" className="link">Wishlist</Link>
            <Link to="/popularBooks" className="link">Popular</Link>

            {/* User Avatar and Settings */}
            <Box sx={{ flexGrow: 1 }}></Box>

            <Box sx={{ flexGrow: 0 }}>
              {isLoggedIn ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="User Avatar" src="/static/images/avatar.jpg" className="avatar" />
                    </IconButton>
                  </Tooltip>
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
                    {settings.map((setting) => (
                      setting === 'Logout' ? (
                        <MenuItem key={setting} onClick={handleLogout}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      ) : (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Link to={`/${setting.toLowerCase()}`} className="link">
                            <Typography textAlign="center">{setting}</Typography>
                          </Link>
                        </MenuItem>
                      )
                    ))}
                  </Menu>
                </>
              ) : (
                <Button component={Link} to="/login" color="inherit" className='login-btn'>
                  Login
                </Button>
              )}
            </Box>

          </Toolbar>
        </Container>
      </AppBar>
    </Stack>
  );
};

export default Navbar;
