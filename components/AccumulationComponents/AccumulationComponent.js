import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  Grid,
  Typography,
  useTheme,
  Input,
  Slider,
  Container,
  CircularProgress,
} from "@mui/material";
import {
  checkUSDTApproved,
  getUserUSDTBalance,
} from "../../actions/smartActions";
import { useWeb3Auth } from "../../hooks/useWeb3Auth";
import TxPopup from "../../common/TxPopup";
import ethersServiceProvider from "../../services/ethersServiceProvider";
import { accumulationInstance, tokenInstance } from "../../contracts";
import web3 from "../../web3";
import {
  AccountBalance,
  ArrowDropDown,
  CurrencyExchange,
  Dataset,
  DocumentScanner,
  Feed,
  Inventory,
  NoteAdd,
} from "@mui/icons-material";
import Web3 from "web3";
import { getTokenPriceStats } from "../../actions/serverActions";
import { useSelector, useDispatch } from "react-redux";
import {
  GetAllOrdersOfUser,
  GetPoolDataById,
  GetPoolUserActivityQuery,
  GetPoolUserDataByAddress,
} from "../../queries/graphQueries";
import { useLazyQuery } from "@apollo/client";
import LineChart from "../../common/Charts/LineChart";
import TimeAgo from "timeago-react";
import { setUsdtBalanceOfUser } from "../../reducers/UiReducer";
import constants from "../../utils/constants";
import PoolActivities from "../resuableComponents/PoolActivities";
import { SelectTokenDialog } from "../resuableComponents/SelectToken";
import Link from "next/link";
import { fromWei } from "../../utils/helper";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const useStyles = makeStyles((theme) => ({
  background: {
    // backgroundImage: 'url("images/network.png")',
    backgroundPosition: "center center,center center",
    backgroundRepeat: "no-repeat,no-repeat",
    backgroundSize: "cover,contain",
    height: "100%",
    width: "100%",
    paddingTop: "2%",
    paddingLeft: "3%",
    paddingRight: "3%",
    [theme.breakpoints.down("md")]: {
      paddingTop: "10%",
      paddingLeft: 15,
      paddingRight: 15,
    },
  },
  pageTitle: {
    fontWeight: 600,
    color: "#e5e5e5",
    textAlign: "left",
  },

  pageSubtitle: {
    color: "#bdbdbd",
    textAlign: "left",
  },
  card: {
    padding: 20,
    width: "100%",
    border: "1px solid #2d2d32",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 30,
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },
    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
    },
  },
  statsCard: {
    padding: 10,
    width: "100%",
    border: "1px solid #2d2d32",
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
  statsCardHeading: {
    fontWeight: 600,
    color: "#e5e5e5",
    textAlign: "left",
  },
  statsCardPara: {
    textAlign: "left",
    fontSize: 13,
    fontWeight: 300,
  },

  title: {
    fontWeight: 600,
    fontSize: 32,
    color: "#e5e5e5",
    textAlign: "left",
  },
  heading: {
    fontWeight: 600,
    color: "#e5e5e5",
    textAlign: "left",
  },
  inputWrapper: {
    border: "1px solid #2d2d32",
    padding: "2px 20px 2px 20px",
    borderRadius: 10,
    backgroundColor: "rgba(106, 85, 234,0.03)",
  },

  actionButton: {
    borderRadius: 14,
    background: "rgba(130, 71, 229, 0.7)",
    padding: "12px 20px 12px 20px",
    color: "white",
    width: "100%",
    marginTop: 20,
    fontWeight: 600,
    fontSize: 16,
    "&:hover": {
      background: "rgba(130, 71, 229, 0.9)",
    },
  },
}));

export default function AccumulationComponent() {
  const classes = useStyles();
  const theme = useTheme();
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const { accountSC } = useWeb3Auth();

  const { usdtBalance } = store.ui;

  const [amount, setAmount] = useState(1000);
  const [percent, setPercent] = useState(10);
  const [grids, setGrids] = useState(4);
  const [stakeCase, setStakeCase] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const [resetFlag, setResetFlag] = useState(0);
  const [orderPrices, setOrderPrices] = useState([]);
  const [orderTokenReceived, setOrderTokenReceived] = useState([]);
  const [tokenPriceData, setTokenPriceData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [poolGraphData, setPoolGraphData] = useState(null);
  const [poolUserGraphData, setPoolUserGraphData] = useState(null);
  const [selectTokenPopup, setSelectTokenPopup] = useState(false);
  // const [selectedToken, setSelectedToken] = useState({
  //   name: "Polkabridge",
  //   symbol: "PBR",
  //   id: "polkabridge",
  //   address: "0x298d492e8c1d909D3F63Bc4A36C66c64ACB3d695",
  //   decimals: 18,
  //   logoURI:
  //     "https://assets.coingecko.com/coins/images/13744/small/symbol-whitebg200x200.png?1611377553",
  // });

  const [selectedToken, setSelectedToken] = useState({
    name: "Sleep Token",
    symbol: "SLEEPT",
    id: "polkabridge",
    address: "0xb94d207a3fBdb312cef2e5dBEb7C22A76516BE37",
    decimals: 18,
    logoURI:
      "https://cdn3d.iconscout.com/3d/free/thumb/squigly-globe-3494833-2926648@0.png",
  });

  const [getPoolDataQuery, { data, loading, error }] =
    useLazyQuery(GetPoolDataById);

  const [getPoolUserDataQuery, { data: poolUserData }] = useLazyQuery(
    GetPoolUserDataByAddress
  );

  useEffect(() => {
    if (accountSC) {
      getPoolUserDataQuery({
        variables: { user: accountSC, type: "ACCUMULATION" },
        // pollInterval: 5000,
      });
    }
  }, [resetFlag, accountSC, getPoolUserDataQuery]);

  // Get Pool Graph Data
  useEffect(() => {
    getPoolDataQuery({
      variables: { type: "ACCUMULATION" },
      // pollInterval: 5000,
    });
  }, [resetFlag, getPoolDataQuery]);

  // Get Pool User Graph Data

  // Get USDT Balance in account
  useEffect(() => {
    if (accountSC) {
      async function asyncFn() {
        let res = await getUserUSDTBalance(accountSC);
        await dispatch(setUsdtBalanceOfUser(res));
      }
      asyncFn();
    }
  }, [accountSC, dispatch]);

  // Get pool data
  useEffect(() => {
    if (data && data.pools.length > 0) {
      let poolData = data.pools[0];
      setPoolGraphData(poolData);
      setLoaded(true);
    }
  }, [data]);

  // Get pool user data
  useEffect(() => {
    if (poolUserData && poolUserData.poolUsers.length > 0) {
      console.log(poolUserData.poolUsers[0]);
      setPoolUserGraphData(poolUserData.poolUsers[0]);
    }
  }, [poolUserData]);

  // Check price of token
  useEffect(() => {
    async function asyncFn() {
      let res = await getTokenPriceStats(selectedToken.id);
      if (res) {
        let tempData = {
          usd: 1,
        };
        // setTokenPriceData(res[selectedToken.id.toLowerCase()]);
        setTokenPriceData(tempData);
        console.log(res);
      }
    }
    asyncFn();
  }, [resetFlag, accountSC, selectedToken]);

  // Check isApproved
  useEffect(() => {
    if (accountSC) {
      async function asyncFn() {
        let accumulation_contract = constants.contracts.accumulation;
        let res = await checkUSDTApproved(accountSC, accumulation_contract);

        setIsApproved(parseInt(res) > 0);
      }
      asyncFn();
    }
  }, [accountSC, resetFlag]);

  const calculateOrdersData = useMemo(async () => {
    if (tokenPriceData) {
      let priceInWei = Web3.utils.toWei(tokenPriceData.usd.toString(), "ether");
      console.log(priceInWei);
      console.log(tokenPriceData);
      let pricesArr = [];
      let tokenReceiveArr = [];
      let selectedTokenAddress = selectedToken.address;

      if (amount > 0 && percent > 0 && grids > 0) {
        let fiatAmount = await Web3.utils.toWei(amount.toString(), "ether");
        let orderPriceForBuy = priceInWei;

        let buyOrders = [...Array(grids)].map((ele, index) => {
          orderPriceForBuy = (orderPriceForBuy * (100 - percent)) / 100;
          console.log(orderPriceForBuy);
          let orderPriceInUsd = parseFloat(
            Web3.utils.fromWei(orderPriceForBuy.toString(), "ether")
          ).toFixed(3);
          console.log(orderPriceForBuy);
          console.log(orderPriceInUsd);
          pricesArr.push(orderPriceInUsd);
          tokenReceiveArr.push((amount / grids / orderPriceInUsd).toFixed(2));
          return Web3.utils.toWei(orderPriceForBuy.toString(), "ether");
        });

        let orderObj = {
          buyOrders,
          fiatAmount,
          selectedTokenAddress,
        };

        setOrderPrices(pricesArr);
        setOrderTokenReceived(tokenReceiveArr);
        console.log(pricesArr);
        console.log(tokenReceiveArr);
        console.log(orderObj);
        return orderObj;
      }
    }
  }, [amount, grids, percent, resetFlag, loaded, tokenPriceData]);

  const handlePercentage = (event) => {
    let { value } = event.target;
    let min = 0;
    let max = 50;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));

    setPercent(value);
  };

  // Approve token
  const handleApprove = async () => {
    setStakeCase(1);

    let userAddress = accountSC;
    let accumulation_contract = constants.contracts.accumulation;
    let provider = ethersServiceProvider.web3AuthInstance;

    let tokenContract = tokenInstance(provider.provider);
    try {
      let estimateGas = await tokenContract.methods
        .approve(accumulation_contract, "100000000000000000000000000")
        .estimateGas({ from: userAddress });

      let estimateGasPrice = await web3.eth.getGasPrice();
      const response = await tokenContract.methods
        .approve(accumulation_contract, "100000000000000000000000000")
        .send(
          {
            from: userAddress,
            maxPriorityFeePerGas: "50000000000",
            gasPrice: parseInt(
              (parseInt(estimateGasPrice) * 10) / 9
            ).toString(),
            gas: parseInt((parseInt(estimateGas) * 10) / 9).toString(),
          },
          async function (error, transactionHash) {
            if (transactionHash) {
              setStakeCase(2);
            } else {
              setStakeCase(4);
            }
          }
        )
        .on("receipt", async function (receipt) {
          setStakeCase(3);
          setResetFlag(resetFlag + 1);
        })
        .on("error", async function (error) {
          if (error?.code === 4001) {
            setStakeCase(4);
          } else {
            setStakeCase(4);
          }
        });
    } catch (err) {
      console.log(err);
      setStakeCase(4);
    }
  };

  // Write functions
  const handleStake = async () => {
    let price = tokenPriceData ? parseFloat(tokenPriceData.usd) * 100000000 : 0; // Making it 8 decimal price
    if (amount > 0 && percent > 0 && grids > 0) {
      let ordersData = await calculateOrdersData;
      console.log(ordersData);
      console.log(price);
      setStakeCase(1);
      let userAddress = accountSC;
      let provider = ethersServiceProvider.web3AuthInstance;

      let accumulateContract = accumulationInstance(provider.provider);
      if (ordersData) {
        try {
          let estimateGas = await accumulateContract.methods
            .invest(
              ordersData.fiatAmount,
              grids,
              percent,
              price,
              ordersData.selectedTokenAddress
            )
            .estimateGas({ from: userAddress });

          let estimateGasPrice = await web3.eth.getGasPrice();
          const response = await accumulateContract.methods
            .invest(
              ordersData.fiatAmount,
              grids,
              percent,
              price,
              ordersData.selectedTokenAddress
            )
            .send(
              {
                from: userAddress,
                maxPriorityFeePerGas: "50000000000",
                gasPrice: parseInt(
                  (parseInt(estimateGasPrice) * 10) / 9
                ).toString(),
                gas: parseInt((parseInt(estimateGas) * 10) / 9).toString(),
              },
              async function (error, transactionHash) {
                if (transactionHash) {
                  setStakeCase(2);
                } else {
                  setStakeCase(4);
                }
              }
            )
            .on("receipt", async function (receipt) {
              setStakeCase(3);
              setResetFlag(resetFlag + 1);
            })
            .on("error", async function (error) {
              if (error?.code === 4001) {
                setStakeCase(4);
              } else {
                setStakeCase(4);
              }
            });
        } catch (err) {
          console.log(err);
          setStakeCase(4);
        }
      }
    }
  };

  const handleClosePopup = () => {
    setStakeCase(0);
  };

  const getFiatSpent = () => {
    let deposit = Web3.utils.fromWei(poolGraphData.deposit, "ether");
    let currentBalance = Web3.utils.fromWei(poolGraphData.fiatBalance, "ether");
    let spent = parseInt(deposit) - parseInt(currentBalance);
    return spent;
  };

  const handleClose = () => {
    console.log("hitting");
    setSelectTokenPopup(false);
  };
  return (
    <Box className={classes.background}>
      <TxPopup txCase={stakeCase} resetPopup={handleClosePopup} />
      <SelectTokenDialog
        selectTokenPopup={selectTokenPopup}
        handleClose={handleClose}
        setSelectedToken={setSelectedToken}
      />

      <Container>
        <Typography variant="h3" className={classes.pageTitle}>
          Accumulate - Eat The Dip
        </Typography>
        <Typography variant="small" className={classes.pageSubtitle}>
          Start the strategy and eat every dip automatically without hassle
        </Typography>

        <Grid
          container
          display={"flex"}
          justifyContent="space-between"
          spacing={3}
          pt={3}
        >
          <Grid item md={3.5}>
            {poolUserGraphData && (
              <Box
                style={{
                  border: "1px solid #2d2d32",
                  height: "100%",
                  width: "100%",
                  padding: 20,
                  borderRadius: 30,
                  background: `linear-gradient(0deg, rgba(0, 0, 0, 0.91), rgba(3, 3, 3, 0.8) ),url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq6kTUrTHYiI8JsOsLJZFoZwhQHg5DSdEVoQ&usqp=CAU")`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                display="flex"
                flexDirection={"column"}
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  display="flex"
                  flexDirection={"column"}
                  justifyContent="center"
                  alignItems="center"
                >
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/008/851/072/original/3d-rocket-business-illustration-png.png"
                    height="150px"
                  />
                </Box>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  textAlign={"center"}
                  lineHeight={1.3}
                >
                  There are no strategy <br />
                  created yet
                </Typography>
                <Typography
                  variant="body3"
                  fontWeight={400}
                  py={1}
                  color={"#bdbdbd"}
                >
                  You can create your strategy
                </Typography>
                <div className="text-center">
                  <Button
                    className={classes.actionButton}
                    onClick={isApproved ? handleStake : handleApprove}
                  >
                    + Create Strategy
                  </Button>
                </div>
              </Box>
            )}
            {/* <Box className={classes.card}>
              <div className="d-flex flex-column justify-content-around">
                <div>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    lineHeight={1}
                    style={{ color: "#e5e5e5" }}
                  >
                    <NoteAdd style={{ color: "#e5e5e5" }} /> Create strategy
                  </Typography>
                </div>

                <Box
                  mt={2}
                  display="flex"
                  flexDirection={"row"}
                  justifyContent="space-between"
                  alignItems="center"
                  style={{
                    border: "1px solid #2d2d32",
                    padding: "10px 10px 10px 10px",
                    borderRadius: 10,
                  }}
                  onClick={() => setSelectTokenPopup(true)}
                >
                  <Box
                    display="flex"
                    flexDirection={"row"}
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <img
                      src={selectedToken.logoURI}
                      alt={"TokenLogo"}
                      height="28px"
                    />
                    <Box ml={1}>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color={"#e5e5e5"}
                        lineHeight={1}
                        padding={0}
                        noWrap
                        margin={0}
                        spacing={0}
                        gutterBottom={0}
                      >
                        {selectedToken.symbol}{" "}
                        {tokenPriceData && (
                          <small
                            className="blink_me"
                            style={{ color: "green", fontSize: 11 }}
                          >
                            ${tokenPriceData.usd.toFixed(3)}
                          </small>
                        )}
                      </Typography>
                      <Typography
                        variant="small"
                        lineHeight={1}
                        noWrap
                        style={{ fontSize: 10 }}
                      >
                        {selectedToken.name}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <ArrowDropDown style={{ color: "white" }} />
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  mt={1}
                  className={classes.inputWrapper}
                >
                  <Box>
                    <Typography
                      variant="small"
                      textAlign={"left"}
                      lineHeight={1}
                    >
                      Amount:
                    </Typography>
                    <Input
                      value={amount}
                      onInput={(event) => setAmount(event.target.value)}
                      fullWidth
                      placeholder="0"
                      disableUnderline
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        color: "#e5e5e5",
                      }}
                      type="number"
                    />
                  </Box>
                  <Box
                    display={"flex"}
                    flexDirection="column"
                    alignItems="flex-end"
                    justifyContent={"center"}
                  >
                    <Typography
                      variant="small"
                      textAlign={"right"}
                      style={{
                        width: 200,
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      Available: {usdtBalance}
                    </Typography>
                    <Box
                      display="flex"
                      flexDirection={"row"}
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <Box
                        display="flex"
                        flexDirection={"row"}
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <img
                          src="https://cdn3d.iconscout.com/3d/premium/thumb/usdt-coin-4999518-4160019.png"
                          alt="USDT"
                          height="28px"
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        className={classes.para}
                        fontSize={16}
                        textAlign="left"
                        fontWeight={600}
                      >
                        USDT
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box mt={1} className={classes.inputWrapper}>
                  <Typography variant="small" textAlign={"left"} lineHeight={1}>
                    No of orders:
                  </Typography>
                  <Input
                    value={grids}
                    type="number"
                    onInput={(event) => setGrids(parseInt(event.target.value))}
                    fullWidth
                    placeholder="Enter grid count here"
                    disableUnderline
                    style={{ fontSize: 20, fontWeight: 600 }}
                  />
                </Box>

                <Box mt={1} className={classes.inputWrapper}>
                  <Typography variant="small" textAlign={"left"} lineHeight={1}>
                    Trigger Percent:
                  </Typography>
                  <Input
                    type="number"
                    disableUnderline
                    value={percent}
                    fullWidth
                    placeholder="10"
                    onChange={(e) => handlePercentage(e)}
                    style={{ fontSize: 20, fontWeight: 600 }}
                  />
                </Box>

                <div className="text-center">
                  <Button
                    className={classes.actionButton}
                    onClick={isApproved ? handleStake : handleApprove}
                  >
                    {isApproved ? "Create Strategy" : "Approve Strategy"}
                  </Button>
                </div>
              </div>
            </Box> */}
          </Grid>
          <Grid item md={8.5}>
            <Box
              display={"flex"}
              justifyContent="space-between"
              className={classes.card}
              style={{ backgroundColor: "#000000" }}
            >
              <Box width={"65%"}>
                {poolGraphData && (
                  <div className="d-flex flex-column justify-content-around w-100">
                    <div>
                      <Typography variant="h6" fontWeight={600} lineHeight={1}>
                        <Inventory /> Pool overview
                      </Typography>
                    </div>

                    <Box
                      mt={4}
                      display="flex"
                      flexDirection={"row"}
                      justifyContent="space-around"
                      alignItems="center"
                    >
                      <Box
                        style={{
                          border: "1px solid #2d2d32",
                          minHeight: 100,
                          minWidth: 120,
                          padding: 20,
                          borderRadius: 10,
                          backgroundColor: "#0C0D10",
                        }}
                        display="flex"
                        flexDirection={"column"}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box
                          display="flex"
                          flexDirection={"column"}
                          justifyContent="center"
                          alignItems="center"
                          style={{
                            border: "1px solid #2d2d32",
                            padding: 14,
                            borderRadius: "50%",
                          }}
                        >
                          <AccountBalance style={{ color: "#bdbdbd" }} />
                        </Box>
                        <Typography variant="body2" fontWeight={300} py={1}>
                          Invested($)
                        </Typography>
                        <Typography variant="h5" fontWeight={600}>
                          ${fromWei(poolUserGraphData.deposit)}
                        </Typography>
                      </Box>
                      <Box
                        style={{
                          border: "1px solid #2d2d32",
                          minHeight: 100,
                          minWidth: 120,
                          padding: 20,
                          borderRadius: 10,
                          backgroundColor: "#0C0D10",
                        }}
                        display="flex"
                        flexDirection={"column"}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box
                          display="flex"
                          flexDirection={"column"}
                          justifyContent="center"
                          alignItems="center"
                          style={{
                            border: "1px solid #2d2d32",
                            padding: 14,
                            borderRadius: "50%",
                          }}
                        >
                          <CurrencyExchange style={{ color: "#bdbdbd" }} />
                        </Box>
                        <Typography variant="body2" fontWeight={300} py={1}>
                          In Order($)
                        </Typography>
                        <Typography variant="h5" fontWeight={600}>
                          ${fromWei(poolUserGraphData.fiatBalance)}
                        </Typography>
                      </Box>
                      <Box
                        style={{
                          border: "1px solid #2d2d32",
                          minHeight: 100,
                          minWidth: 120,
                          padding: 20,
                          borderRadius: 10,
                          backgroundColor: "#0C0D10",
                        }}
                        display="flex"
                        flexDirection={"column"}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box
                          display="flex"
                          flexDirection={"column"}
                          justifyContent="center"
                          alignItems="center"
                          style={{
                            border: "1px solid #2d2d32",

                            padding: 14,
                            borderRadius: "50%",
                          }}
                        >
                          <Dataset style={{ color: "#bdbdbd" }} />
                        </Box>
                        <Typography variant="body2" fontWeight={300} py={1}>
                          Orders
                        </Typography>
                        <Typography variant="h5" fontWeight={600}>
                          {poolUserGraphData.ordersCount}
                        </Typography>
                      </Box>
                    </Box>
                  </div>
                )}
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mt={3}
                  pr={2}
                >
                  <Typography variant="h6" fontWeight={600}>
                    Daily orders executions:
                  </Typography>
                  <Box
                    display={"flex"}
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                  >
                    <Typography variant="h3" fontWeight={600}>
                      32
                    </Typography>
                    <div
                      style={{
                        borderRadius: 14,
                        background: "rgba(130, 71, 229, 0.7)",
                        padding: "6px 10px 6px 10px",
                        color: "white",
                        width: "fit-content",
                        marginLeft: 7,
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      2.3%
                    </div>
                  </Box>
                </Box>
              </Box>
              <Box
                style={{
                  borderLeft: "1px solid #414141",
                  paddingLeft: 20,
                  width: "35%",
                }}
              >
                {poolUserGraphData && (
                  <div className="d-flex flex-column justify-content-around w-100">
                    <div>
                      <Typography variant="h6" fontWeight={600} lineHeight={1}>
                        <Feed /> My investment
                      </Typography>
                    </div>

                    <Box mt={2}>
                      <Typography
                        variant="body2"
                        fontWeight={400}
                        py={1}
                        textAlign={"left"}
                      >
                        Invested($)
                      </Typography>
                      <Typography variant="h5" fontWeight={600}>
                        ${fromWei(poolUserGraphData.deposit)}
                      </Typography>
                    </Box>
                    <Box mt={2}>
                      <Typography
                        variant="body2"
                        fontWeight={400}
                        py={1}
                        textAlign={"left"}
                      >
                        In order($)
                      </Typography>
                      <Typography variant="h5" fontWeight={600}>
                        ${fromWei(poolUserGraphData.fiatBalance)}
                      </Typography>
                    </Box>
                    <Box
                      mt={2}
                      style={{
                        border: "1px solid #2d2d32",

                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingTop: 10,
                        paddingBottom: 10,
                        borderRadius: 20,
                        backgroundColor: "#0C0D10",
                      }}
                      display="flex"
                      flexDirection={"row"}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography variant="body2" fontWeight={300} pb={1}>
                          Progress
                        </Typography>
                        <Typography variant="h5" fontWeight={600}>
                          4/9
                        </Typography>
                      </Box>
                      <Box style={{ width: 200, height: 70 }}></Box>
                      <CircularProgressbar
                        value={40}
                        text={`40%`}
                        styles={buildStyles({
                          // Rotation of path and trail, in number of turns (0-1)
                          rotation: 0,

                          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                          strokeLinecap: "butt",

                          // Text size
                          textSize: "16px",

                          // How long animation takes to go from one percentage to another, in seconds
                          pathTransitionDuration: 0.5,

                          // Can specify path transition in more detail, or remove it entirely
                          // pathTransition: 'none',

                          // Colors
                          pathColor: `rgba(130, 71, 229, ${40 / 100})`,
                          textColor: "white",
                          trailColor: "#d6d6d6",
                          backgroundColor: "#3e98c7",
                        })}
                      />
                      ;
                    </Box>
                  </div>
                )}
              </Box>
            </Box>
            {/* <Box className={classes.card}>
              <div>
                <Typography variant="h6" fontWeight={600} noWrap>
                  Orders chart
                </Typography>
                <Typography variant="small" noWrap>
                  Visualise your orders in real-time
                </Typography>
              </div>
              <LineChart
                xaxis={orderPrices}
                yaxis={orderTokenReceived}
                yaxisMax={parseFloat(orderPrices[0]) * 1.2}
                selectedToken={selectedToken}
              />
            </Box> */}
          </Grid>
        </Grid>
        <Box mt={3}>
          <Button style={{ textDecoration: "none", textTransform: "none" }}>
            <Typography variant="small" className={classes.pageSubtitle}>
              For test tokens{" "}
              <Link
                href="https://mumbai.polygonscan.com/address/0xE118429D095de1a93951c67D04B523fE5cbAB62c#writeContract"
                passHref={true}
                target="_blank"
              >
                click here{" "}
              </Link>{" "}
              and hit claimFaucet function.
            </Typography>
          </Button>
        </Box>
        <Box mt={5}>
          <div>
            <Typography
              variant="h6"
              className={classes.heading}
              fontWeight={700}
            >
              My Orders
            </Typography>
            <PoolActivities poolType={"ACCUMULATION"} />
          </div>
        </Box>
      </Container>
    </Box>
  );
}
