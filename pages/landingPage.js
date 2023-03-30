import React from "react";
import NavbarLanding from "./NavbarLanding";
import TopHeader from "./TopHeader";
import Working from "./working";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import Trader from "./Trader";
import Experience from "./Experience";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    // paddingTop: "8%",
    paddingLeft: "3%",
    paddingRight: "3%",
    [theme.breakpoints.down("md")]: {
      paddingTop: "10%",
      paddingLeft: 15,
      paddingRight: 15,
    },
  },
}));

const landingPage = () => {
  const classes = useStyles();
  return (
    <>
      <Box style={{ backgroundColor: "black" }}>
        <div>
          <NavbarLanding />
          <TopHeader />
          <Working />
          <Trader />
          <Experience />
        </div>
      </Box>
    </>
  );
};

export default landingPage;
