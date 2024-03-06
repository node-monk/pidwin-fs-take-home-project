import React, { useState, useEffect } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Avatar,
  Button,
  Chip,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { styles } from "./styles";
import { logout as logoutAction } from "../../actions/login";
import { refreshRewards } from "../../actions/rewards";
import { LogoutSharp, PasswordSharp } from "@mui/icons-material";

const Navbar = () => {
  const [user, setUser] = useState(
    localStorage.getItem("profile")
      ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
      : "null"
  );

  const dispatch = useDispatch();
  let location = useLocation();
  const history = useNavigate();

  const rewards = useSelector((state) => {
    return state.rewards;
  });

  const logout = () => {
    dispatch(logoutAction());
    history("/auth");
    setUser("null");
  };

  useEffect(() => {
    if (user !== "null" && user !== null) {
      if (user.exp * 1000 < new Date().getTime()) logout();
    }

    const profile = localStorage.getItem("profile");
    setUser(profile ? jwtDecode(JSON.parse(profile).token) : "null");

    if (profile) {
      dispatch(refreshRewards());
    }
  }, [location]);

  return (
    <AppBar sx={styles.appBar} position="static" color="inherit">
      <div sx={styles.brandContainer}>
        <Typography
          component={Link}
          to="/"
          sx={styles.heading}
          variant="h5"
          align="center"
        >
          CoinToss
        </Typography>
      </div>
      <Toolbar sx={styles.toolbar}>
        {user !== "null" && user !== null ? (
          <div sx={styles.profile}>
            <Typography sx={styles.userName} variant="h6">
              <span>{user.name}</span>
              <Chip
                avatar={<Avatar alt="tokens" src="/token25x25.png" />}
                label={rewards.tokens}
                variant="outlined"
                sx={{ float: "right" }}
              />
            </Typography>
            <Button
              variant="text"
              sx={styles.logout}
              color="primary"
              onClick={logout}
              size="small"
              startIcon={<LogoutSharp />}
            >
              Logout
            </Button>
            <Button
              variant="text"
              color="primary"
              size="small"
              onClick={() => {
                history("/password");
              }}
              startIcon={<PasswordSharp />}
            >
              Set Password
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
            size="small"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
