import { AppBar, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  header: {
    fontSize: 20,
    fontWeight: 400,
    color: "#66DDBA",
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "10%",
  },
  mainHeading: {
    fontSize: 50,
    fontWeight: 700,
    color: "#FFFFFF",
    display: "flex",
    justifyContent: "flex-start",
    textAlign: "left",
  },

  headerWrapper: {
    height: "78vh",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: "5%",
  },
  para: {
    fontSize: 18,
    fontWeight: 600,
    color: "#FFFFFF",
    textAlign: "left",
    display: "flex",
    justifyContent: "flex-start",
  },
  navButton: {
    background: `#844ccb`,
    border: "none",
    borderRadius: "100px",
    boxShadow: "rgba(0, 0, 0, .1) 0 2px 4px 0",
    boxSizing: "border-box",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    outline: "none",
    padding: "7px 30px",
    transform: "translateY(0)",
    transition: "transform 150ms, box-shadow 150ms",
    userSelect: "none",
    WebkitUserSelect: "none",
    touchAction: "manipulation",
    textAlign: "left",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  mainImageTop: {
    width: "auto",
  },
  imageContainer: {
    overflow: "hidden",
    display: "",
  },
  colWrapper: {
    width: "null",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  paraWrapper: {
    width: "90%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  wrapper: {
    marginTop: "3%",
    paddingTop: "8%",
    paddingLeft: "3%",
    paddingRight: "3%",
  },
  sleepPara: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 600,
    color: "#FFFFFF",
    textAlign: "left",
    display: "flex",
    justifyContent: "flex-start",
    width: "80%",
  },
}));

const TopHeader = () => {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        display={"flex"}
        justifyContent="center"
        pt={4}
        className={classes.wrapper}
      >
        <Grid item md={6}>
          <div className={classes.colWrapper}>
            <div className={classes.header}>SLEEP . TRADE . REPEAT</div>
            <div className={classes.mainHeading}>
              Revolutionise your
              <br />
              investments
            </div>
            <div className={classes.paraWrapper}>
              <div className={classes.paraWrapper}>
                <div className={classes.para}>
                  SleepSwap: Trade while you sleep with your custom strategy.
                </div>
              </div>
            </div>
            <div className={classes.sleepPara}>
              {/* <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/zzz-5796814-4863002.png"
                style={{ height: 40 }}
              /> */}
              "Sleep tight, trade right with SleepSwap - the ultimate platform
              for automated trading!"
              <span></span>
            </div>
            <div className={classes.buttonWrapper}>
              <a href="#borrow-now" style={{ textDecoration: "none" }}>
                <Button className={classes.navButton}>Borrow Now</Button>
              </a>
            </div>
          </div>
        </Grid>
        <Grid item md={6}>
          <div className={classes.imageContainer}>
            <div className="d-flex end">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/trading-cryptocurrencies-5142095-4290450.png"
                className={classes.mainImageTop}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default TopHeader;
