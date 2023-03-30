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
    height: 20,
  },
}));

const cardsData = [
  {
    id: 1,
    image:
      "https://www.citypng.com/public/uploads/small/11641513659o8rq1i7qqs4jhzb21zu4pl6hwfecjzhs3ri07dz2qz2auocebzska5shezfxxzn4xnt2fj2sm0tzw7pd3b63e4sksaw0cje9l5oj.png",
    step: "Step 1",
    title: "Connect Wallet",
    description: "Connect your wallet with Matamask or any another wallet",
  },
  {
    id: 2,
    image:
      "https://www.citypng.com/public/uploads/small/11641513659o8rq1i7qqs4jhzb21zu4pl6hwfecjzhs3ri07dz2qz2auocebzska5shezfxxzn4xnt2fj2sm0tzw7pd3b63e4sksaw0cje9l5oj.png",
    step: "Step 2",
    title: "Set Trade",
    description: "Multiple strategies will be here to choose and place orders.",
  },
  {
    id: 3,
    image:
      "https://www.citypng.com/public/uploads/small/11641513659o8rq1i7qqs4jhzb21zu4pl6hwfecjzhs3ri07dz2qz2auocebzska5shezfxxzn4xnt2fj2sm0tzw7pd3b63e4sksaw0cje9l5oj.png",
    step: "Step 3",
    title: "Start Trading",
    description:
      "Orders will be executed automatically by meeting certain conditions.",
  },
  {
    id: 4,
    image:
      "https://www.citypng.com/public/uploads/small/11641513659o8rq1i7qqs4jhzb21zu4pl6hwfecjzhs3ri07dz2qz2auocebzska5shezfxxzn4xnt2fj2sm0tzw7pd3b63e4sksaw0cje9l5oj.png",
    step: "Step 4",
    title: "Earn Money",
    description:
      "Trade while you sleep with your custom strategy. Earn like a pro with SleepSwap",
  },
];

const Working = () => {
  const classes = useStyles();

  return (
    <>
      <Box container className={classes.workWrapper}>
        <Typography className={classes.heading}>How it works</Typography>
        <Box className={classes.paraWrapper}>
          <Typography className={classes.para}>
            Multiple strategies will be here to choose and place orders.
          </Typography>
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
                key={card.id}
                item
                md={3}
                className={classes.gridItem}
              >
                <Box></Box>

                <Box className={classes.card}>
                  <Box className={classes.step}>
                    <Typography variant="small" lineHeight={1}>
                      {card.step}
                    </Typography>
                  </Box>
                  <div className="d-flex flex-column justify-content-around">
                    <div>
                      <Typography variant="h5" fontWeight={600} lineHeight={1}>
                        <img
                          src={card.image}
                          alt={card.title}
                          className={classes.imageStep}
                        />
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
    </>
  );
};

export default Working;
