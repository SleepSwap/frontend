import {
  AppBar,
  Link,
  Toolbar,
  IconButton,
  Drawer,
  MenuItem,
  Typography,
  Button,
  Avatar,
  // Stepper,
  ImageList,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#1b1b1b",
    color: "#000",
    padding: "0 16px",
    [theme.breakpoints.up("md")]: {
      padding: "0 32px",
    },
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    color: "#000",
    "& i": {
      marginLeft: "5px",
    },
  },
  navbar: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  navLinks: {
    display: "flex",
    listStyle: "none",
    margin: "0",
    padding: "0",
  },
  navItem: {
    margin: "0 16px",
    [theme.breakpoints.up("md")]: {
      margin: "0 24px",
    },
  },
  activeLink: {
    color: "white",
    textDecoration: "none",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  drawerContainer: {
    padding: "20px 30px",
  },
  navButton: {
    backgroundColor: "#844CCB",
    borderRadius: 10,
    padding: 10,
    textDecoration: "none",
  },
}));

const Navbar = () => {
  const classes = useStyles();

  const [mobileView, setMobileView] = useState(false);

  const displayDesktop = () => {
    return (
      <Toolbar className={classes.toolbar}>
        <Link exact to="/" className={classes.logo}>
          <Box py={2}>
            <Typography variant="body2" pb={1} style={{ color: "white" }}>
              <img
                src="https://cdn3d.iconscout.com/3d/free/thumb/squigly-globe-3494833-2926648@0.png"
                height="40px"
              />{" "}
              SleepSwap
            </Typography>
          </Box>
        </Link>
        <div className={classes.navbar}>
          <ul className={classes.navLinks}>
            <li className={classes.navItem}>
              <Link exact to="/" className={classes.activeLink}>
                Home
              </Link>
            </li>
            <li className={classes.navItem}>
              <Link exact to="/about" className={classes.activeLink}>
                Exchange
              </Link>
            </li>
            <li className={classes.navItem}>
              <Link exact to="/blog" className={classes.activeLink}>
                Market
              </Link>
            </li>
            <li className={classes.navItem}>
              <Link exact to="/contact" className={classes.activeLink}>
                Discover
              </Link>
            </li>
            <li className={classes.navItem}>
              <Link exact to="/launch-app" className={classes.navButton}>
                <Button style={{ color: "white" }}>Launch App</Button>
              </Link>
            </li>
          </ul>
        </div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleDrawerOpen = () => setDrawerOpen(true);
    const handleDrawerClose = () => setDrawerOpen(false);

    return (
      <Toolbar className={classes.toolbar}>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",

            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={classes.drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <Link exact to="/" className={classes.logo}>
          CodeBucks
          <i className="fa fa-code"></i>
        </Link>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return (
      <div>
        <Link exact to="/" activeClassName={classes.activeLink}>
          <MenuItem style={{ color: "white" }}>Home</MenuItem>
        </Link>
        <Link exact to="/about" activeClassName={classes.activeLink}>
          <MenuItem>About</MenuItem>
        </Link>
        <Link exact to="/blog" activeClassName={classes.activeLink}>
          <MenuItem>Blog</MenuItem>
        </Link>
        <Link exact to="/contact" activeClassName={classes.activeLink}>
          <MenuItem>Contact Us</MenuItem>
        </Link>

        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </div>
    );
  };

  return (
    <AppBar className={classes.root}>
      {mobileView ? displayMobile() : displayDesktop()}
    </AppBar>
  );
};

export default Navbar;
