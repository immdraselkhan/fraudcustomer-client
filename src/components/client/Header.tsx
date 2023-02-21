"use client";
import { useContext, useState } from "react";
import { ThemeContext } from "@/src/contexts/ThemeProvider";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Drawer,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightModeOutlined";
import { NextLinkComposed } from "../common/MuiLink";
import { useAuth } from "@/src/contexts/AuthProvider";
import { useRouter } from "next/router";

const Header = () => {
  const { user, loading, userLogOut } = useAuth();

  const { colorMode, toggleColorMode } = useContext(ThemeContext);

  const [menuState, setMenuState] = useState(false);

  const router = useRouter();

  const handleLogOut = () => {
    userLogOut();
    router.push("/");
  };

  const renderMenu = (
    <Menu
      // @ts-ignore
      anchorEl={menuState}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={!menuState ? false : true}
      onClose={() => setMenuState(false)}
    >
      <MenuItem
        to="/profile"
        component={NextLinkComposed}
        onClick={() => setMenuState(false)}
      >
        My account
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleLogOut(), setMenuState(false);
        }}
      >
        Log out
      </MenuItem>
    </Menu>
  );

  const [drawerState, setDrawerState] = useState(false);

  const clientDrawer = () => (
    <Box role="presentation" width="fit-content" padding="25px">
      <Typography marginBottom={3}>Settings</Typography>
      <Box
        marginTop={1}
        onClick={() => setDrawerState(false)}
        onKeyDown={() => setDrawerState(false)}
      >
        <ToggleButtonGroup
          value={colorMode}
          exclusive
          onChange={toggleColorMode}
          aria-label="Platform"
        >
          <ToggleButton value="system" sx={{ textTransform: "none" }}>
            <SettingsBrightnessIcon sx={{ mr: 1 }} />
            System
          </ToggleButton>
          <ToggleButton value="dark" sx={{ textTransform: "none" }}>
            <DarkModeIcon sx={{ mr: 1 }} />
            Dark
          </ToggleButton>
          <ToggleButton value="light" sx={{ textTransform: "none" }}>
            <LightModeIcon sx={{ mr: 1 }} />
            Light
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Button
        to="/profile"
        component={NextLinkComposed}
        onClick={() => setDrawerState(false)}
      >
        Profile
      </Button>
    </Box>
  );
  // if (loading) {
  //   return <Typography>Loading...</Typography>;
  // }
  return (
    <Box sx={{ flexGrow: 1 }} component="header">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => setDrawerState(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={drawerState} onClose={() => setDrawerState(false)}>
            {clientDrawer()}
          </Drawer>
          <Button component={NextLinkComposed} to="/" variant="contained">
            FraudCustomer
          </Button>
          {loading ? (
            <CircularProgress sx={{ marginLeft: "auto" }} />
          ) : (
            <Box sx={{ marginLeft: "auto" }}>
              {!user?.uid ? (
                <Button to="/login" component={NextLinkComposed}>
                  Login
                </Button>
              ) : (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={(event) => setMenuState(event.currentTarget as any)}
                >
                  <AccountCircle />
                </IconButton>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
};

export default Header;
