import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import logo from "../../images/logo.png";
import profil from "../../images/Profile.png";
import DrawerComp from "./Drawer";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const HeaderMovie = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  let history = useNavigate();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  const onLogout = () => {
    Cookies.remove("token");
    setTimeout(() => {
      window.location.reload();
    }, 500);
    history.replace("/");
  };
  return (
    <React.Fragment>
      <AppBar sx={{ background: "#063970" }}>
        <Toolbar>
          <img src={logo} alt="Logo" className="logo-header" />
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
                MOVIE
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab label="Home" to="/" component={Link} />
                <Tab label="Series" />
                <Tab label="Movies" />
                <Tab label="New and Populer" />
                <Tab label="My List" />
              </Tabs>
              <SearchOutlinedIcon
                sx={{ marginLeft: "auto" }}
                variant="contained"
                className="icon-movie"
              />
              <Typography sx={{ fontSize: "1rem", paddingLeft: "1%" }}>
                {Cookies.get("name")}
              </Typography>
              <CardGiftcardOutlinedIcon
                sx={{ marginLeft: "10px" }}
                variant="contained"
                className="icon-movie"
              />
              <NotificationsNoneOutlinedIcon
                sx={{ marginLeft: "10px" }}
                variant="contained"
                className="icon-movie"
              />
              <img src={profil} alt="profil" className="logo-header" />
              <ArrowDropDownOutlinedIcon
                sx={{ marginLeft: "10px" }}
                variant="contained"
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                className="icon-movie"
              />
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem onClick={handleClose}>Profile</MenuItem>
                          <MenuItem onClick={onLogout}>Logout</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default HeaderMovie;
