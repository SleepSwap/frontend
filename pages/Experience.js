import React from "react";
import { Box, Grid, Stepper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: 28,
    fontWeight: 600,
    color: "white",
    marginTop: "3%",
    textAlign: "center",
  },
  para: {
    fontSize: 18,
    fontWeight: 400,
    color: "white",
    marginTop: "1%",
    textAlign: "center",
  },
  paraWrapper: {},
  workWrapper: {},
  gridItem: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    padding: 20,
    width: "100%",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 12,
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },
    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
    },
  },
  step: {
    marginBottom: "10%",
  },
  imageStep: {
    height: 70,
  },
}));
const cardsData = [
  {
    id: 1,
    image:
      "https://cdn3d.iconscout.com/3d/premium/thumb/trust-7264130-5966553.png",

    title: "Trust",
    description: "Trust in SleepSwap to make your trading dreams a reality!",
  },
  {
    id: 2,
    image:
      "https://cdn3d.iconscout.com/3d/premium/thumb/verified-security-4810447-4003150.png",
    title: "Security",
    description:
      "Invest with peace of mind - SleepSwap's security measures are top-notch!",
  },
  {
    id: 3,
    image:
      "https://cdn3d.iconscout.com/3d/premium/thumb/email-privacy-5983074-4946576.png",
    title: "Privacy",
    description:
      "SleepSwap: where your privacy is as important as your investments.",
  },
];

const Experience = () => {
  const classes = useStyles();
  return (
    <Box container className={classes.workWrapper}>
      <Box>
        <Typography className={classes.heading}>
          Experience the leading <br /> cryptocurrency trading platform
        </Typography>
        <Box className={classes.paraWrapper}>
          <Typography className={classes.para}>
            "Invest in your sleep, invest in your future with SleepSwap - the
            easiest way to trade while you snooze!"
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Grid
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
          spacing={5}
          p={3}
        >
          {cardsData.map((card, label) => (
            <Grid
              display={"flex"}
              justifyContent="center"
              alignItems="center"
              key={card.id}
              item
              md={3}
              className={classes.gridItem}
            >
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  src={card.image}
                  alt={card.title}
                  className={classes.imageStep}
                />
              </Box>

              <Box className={classes.card}>
                <Box className={classes.step}>
                  <Typography variant="small" lineHeight={1}>
                    {card.step}
                  </Typography>
                </Box>
                <div className="d-flex flex-column justify-content-around">
                  <div>
                    <Typography variant="h5" fontWeight={600} lineHeight={1}>
                      {card.title}{" "}
                    </Typography>
                    <Box style={{ width: "80%" }}>
                      <Typography variant="small" lineHeight={1}>
                        {card.description}
                      </Typography>
                    </Box>
                  </div>
                </div>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Experience;
