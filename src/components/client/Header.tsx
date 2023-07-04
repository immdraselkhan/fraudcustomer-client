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
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightModeOutlined";
import { NextLinkComposed } from "../common/MuiLink";
import { useAuth } from "@/src/contexts/AuthProvider";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useTheme } from "@mui/material/styles";

const Header = () => {
  // Get user information
  const { user, loading, userLogOut } = useAuth();

  const { colorMode, toggleColorMode } = useContext(ThemeContext);

  const [menuState, setMenuState] = useState<boolean>(false);

  // Next router hook
  const router = useRouter();

  // Mui theme hook
  const theme = useTheme();

  // user logout handler
  const handleLogOut = () => {
    userLogOut();
    toast.success("User logged out!");
    router.push("/login");
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
        My Account
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
            <CircularProgress color="primary" sx={{ marginLeft: "auto" }} />
          ) : (
            <Box sx={{ marginLeft: "auto" }}>
              {!user?.uid ? (
                <Box sx={{ display: "flex", gap: "15px" }}>
                  <Button
                    to="/signup"
                    component={NextLinkComposed}
                    variant={
                      theme.palette.mode === "dark" ? "outlined" : "contained"
                    }
                  >
                    Sign up
                  </Button>
                  <Button
                    to="/login"
                    component={NextLinkComposed}
                    variant="contained"
                  >
                    Login
                  </Button>
                </Box>
              ) : (
                <Box
                  aria-label="account of current user"
                  color="inherit"
                  onClick={(event: any) =>
                    void setMenuState(event.currentTarget)
                  }
                >
                  {user?.photoURL ? (
                    <Avatar alt={user?.displayName} src={user?.photoURL} />
                  ) : (
                    <AccountCircle />
                  )}
                </Box>
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
