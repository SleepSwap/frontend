import React from "react";
import { Box, Button, Grid, Link, Step, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#17191A",
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
    border: "1px solid #414141",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 10,
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },

    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
    },
  },
  title: {
    fontWeight: 600,
    color: "#f9f9f9",
    textAlign: "left",
  },
  description: {
    fontWeight: 400,
    color: "#bdbdbd",
    textAlign: "left",
    lineHeight: 1.5,
    paddingTop: 5,
  },
  field: {
    fontWeight: 400,
    color: "#bdbdbd",
    textAlign: "left",
    fontSize: 18,
  },
  value: {
    fontWeight: 600,
    color: "#f9f9f9",
    textAlign: "left",
    lineHeight: 1.5,
    paddingTop: 5,
  },
  infoCard: {
    backgroundColor: "rgba(130, 71, 229, 0.1)",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: "4%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  tokenDescription: {
    fontWeight: 400,
    fontSize: 12,
    color: "#bdbdbd",
    textAlign: "left",
  },
}));
function Trader() {
  const classes = useStyles();
  return (
    <>
      <Box container className={classes.workWrapper}>
        <Box pt={0} className={classes.card}>
          <Box
            display="flex"
            flexDirection={"row"}
            justifyContent="space-between"
            alignItems="center"
            gap={2}
            py={2}
          >
            <Box className={classes.infoCard}>
              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/bitcoin-in-bucket-5168160-4323633.png"
                alt="card1"
                height="80px"
              />
              <Typography variant="small" className={classes.field}>
                Manage your Portfolio
              </Typography>
              <Typography variant="body1" className={classes.value}>
                Connect all your exchanges accounts and manage them with our
                trading terminal. Free of charge!
              </Typography>
            </Box>
            <Box className={classes.infoCard}>
              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/businessman-analyzing-data-5355152-4487268.png"
                alt="card1"
                height="100px"
              />
              <Typography variant="small" className={classes.field}>
                Trailing features
              </Typography>
              <Typography variant="body1" className={classes.value}>
                Follow the price movement and sell/buy automatically when the
                price goes in another direction.
              </Typography>
            </Box>
            <Box className={classes.infoCard}>
              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/strategy-6248696-5115838.png"
                alt="card1"
                height="80px"
              />
              <Typography variant="small" className={classes.field}>
                Strategies
              </Typography>
              <Typography variant="body1" className={classes.value}>
                Define your Strategies. Our platform use your strategies for
                suitable buy and sell crypto asset from yuor funds.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Trader;
