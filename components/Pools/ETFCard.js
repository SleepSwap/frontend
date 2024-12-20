import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useLazyQuery } from "@apollo/client";
import { GetPoolUserDataByAddress } from "../../queries/graphQueries";
import Web3 from "web3";
import { useWeb3Auth } from "../../hooks/useWeb3Auth";
import { usePoolInfo } from "../../hooks/usePoolInfo";
import { constants, STRATEGY_TYPE_ENUM } from "../../utils/constants";
import { Info, TrendingUp } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: constants.baseColorLight,
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
    border: "1px solid #414141",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 14,
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },

    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
      marginTop: 10,
      marginBottom: 10,
      paddingTop: 14,
      paddingBottom: 14,
      paddingLeft: 14,
      paddingRight: 14,
    },
  },
  title: {
    fontWeight: 600,
    color: "#f9f9f9",
    textAlign: "left",
    fontSize: 17,
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
    textAlign: "center",
  },
  value: {
    fontWeight: 600,
    color: "#f9f9f9",
    textAlign: "center",
    lineHeight: 1.5,
    paddingTop: 3,
  },
  infoCard: {
    borderRadius: 10,
    padding: "4%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tokenDescription: {
    fontWeight: 400,
    fontSize: 12,
    color: "#bdbdbd",
    textAlign: "left",
  },
}));

export default function ETFCard({ poolStaticData, index }) {
  const classes = useStyles();
  const theme = useTheme();
  const { accountSC } = useWeb3Auth();
  const [poolUserGraphData, setPoolUserGraphData] = useState(null);

  // Graph calls
  const { poolInfo: poolGraphData, loading } = usePoolInfo(poolStaticData.type);

  const [getPoolUserDataByAddress, { data: userPoolData }] = useLazyQuery(
    GetPoolUserDataByAddress
  );

  // Functions to fetch user pool data
  useEffect(() => {
    if (poolStaticData && accountSC) {
      getPoolUserDataByAddress({
        variables: {
          user: accountSC,
          type: poolStaticData.type,
        },
        // pollInterval: 5000,
      });
    }
  }, [poolStaticData, accountSC]);

  // Functions to update user pool data
  useEffect(() => {
    if (userPoolData) {
      let userPoolGraphData = userPoolData.poolUsers;
      if (userPoolGraphData.length > 0) {
        setPoolUserGraphData(userPoolGraphData[0]);
      }
    }
  }, [userPoolData]);

  return (
    <Box pt={0} className={classes.card}>
      <Box
        display="flex"
        flexDirection={"row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          display="flex"
          flexDirection={"row"}
          justifyContent="flex-start"
          alignItems="center"
        >
          <img src={poolStaticData.icon} alt="Grid" height="32px" />
          <Box ml={1}>
            <Typography variant="h6" className={classes.title}>
              {poolStaticData.title}
              <Tooltip title={poolStaticData.description}>
                <IconButton>
                  <Info style={{ color: "white", fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection={"row"}
        justifyContent="space-between"
        alignItems="center"
        gap={1}
        py={2}
        mt={2}
        style={{
          backgroundColor: "#000000",
          borderRadius: 10,
          padding: "6%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body3" className={classes.field}>
            Total Invested($)
          </Typography>
          <Typography variant="body2" className={classes.value} fontSize={15}>
            $12,746
          </Typography>
        </Box>

        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body3" className={classes.field}>
            Total Users
          </Typography>
          <Typography variant="body2" className={classes.value} fontSize={15}>
            32
          </Typography>
        </Box>
      </Box>
      <Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mt={3}
          style={{
            border: "1px solid rgba(106, 85, 234,0.1)",
            padding: "8px 8px 8px 8px",
            borderRadius: 10,
            backgroundColor: "rgba(106, 85, 234,0.03)",
          }}
        >
          <Typography
            variant="body2"
            className={classes.field}
            ml={1}
            fontSize={13}
          >
            Your invested
          </Typography>
          <Typography
            variant="body2"
            className={classes.value}
            textAlign="center"
            fontWeight={700}
            mr={1}
          >
            $0
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection={"row"}
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        py={2}
      >
        <Box className={classes.infoCard}>
          <Typography variant="body2" color="white" fontSize={12}>
            <TrendingUp style={{ fontSize: 18, color: "yellow" }} /> Popular
            tokens
          </Typography>
          <Typography variant="small" className={classes.value}>
            <img
              src={"https://cryptologos.cc/logos/decentraland-mana-logo.png"}
              alt={"TokenLogo"}
              height="28px"
              style={{ marginRight: -5 }}
            />
            <img
              src={
                "https://altcoinsbox.com/wp-content/uploads/2023/01/dogecoin-logo.png"
              }
              alt={"TokenLogo"}
              height="28px"
              style={{ marginRight: -5 }}
            />
            <img
              src={
                "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3516739/ethereum-logo-icon-md.png"
              }
              alt={"TokenLogo"}
              height="28px"
            />{" "}
            +7 more
          </Typography>
        </Box>
      </Box>
      <Box className="text-center">
        {poolStaticData.active && (
          <Link href={poolStaticData.url} style={{ textDecoration: "none" }}>
            <Button
              style={{
                borderRadius: 10,
                background: "rgba(130, 71, 229, 0.3)",
                padding: "12px 20px 12px 20px",
                color: "white",
                width: "100%",
              }}
            >
              Start Strategy
            </Button>
          </Link>
        )}
        {!poolStaticData.active && (
          <Button
            style={{
              borderRadius: 10,
              background: "rgba(130, 71, 229, 0.3)",
              padding: "12px 20px 12px 20px",
              color: "white",
              width: "100%",
            }}
          >
            Coming soon
          </Button>
        )}
      </Box>
    </Box>
  );
}
