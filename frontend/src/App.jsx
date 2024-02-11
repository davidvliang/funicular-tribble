import { useState, useEffect, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { io } from "socket.io-client";

import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import SendIcon from '@mui/icons-material/Send';
import RefreshIcon from "@mui/icons-material/Refresh";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import CustomTabPanel from "./components/CustomTabPanel";
import AntennaPattern from "./components/AntennaPattern";
import ManualConfiguration from "./components/ManualConfiguration";
import AutoConfiguration from "./components/AutoConfiguration";
import Settings from "./components/Settings";

const SERVER_URL = "http://192.168.50.51:8000";
// const socket = io(SERVER_URL, { path: "/sockets" });

export default function App() {
  const methods = useForm();

  const [isConnected, setIsConnected] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const [selectedTab, setSelectedTab] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState("");

  const [arraySize, setArraySize] = useState(2);
  const [frequency, setFrequency] = useState(50);
  const [bitness, setBitness] = useState("1");

  const submitRef = useRef();

  const newStatus = {
    data: count + 1,
  };

  methods.register("bitness", { value: bitness })


  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("connected");
  //     setIsConnected(socket.connected);
  //   });
  //   socket.on("disconnect", () => {
  //     console.log("disconnected");
  //     setIsConnected(socket.connected);
  //   });

  //   socket.on("join", (data) => {
  //     console.log("JOIN", data);
  //   });
  // }, []);

  const fetchStatus = async () => {
    const response = await fetch(SERVER_URL);
    const status = await response.text();
    setStatus(status);
    console.log("here", status);
  };

  const fetchStartProgram = async () => {
    const response = await fetch(SERVER_URL+"/daq")
    const status = await response.text()
    
  }

  const fetchAntennaPattern = async (data = {}) => {
    const response = await fetch(SERVER_URL + "/daq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    const status = response.json()
    console.log(status);
  }

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleClick = () => {
    fetch(SERVER_URL + "/daq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStatus),
    }).then(fetchStatus);
    console.log("");
  };

  const handleTabChange = (event, val) => {
    setSelectedTab(val);
  };

  const handleStartButton = (event) => {
    console.log("start button pressed.");
    setIsRunning(true);
    submitRef.current.requestSubmit()
    const result = methods.getValues()
    console.log("getValues", result)
  };

  const handleStopButton = () => {
    console.log("stop button pressed.");
    setIsRunning(false);
  };

  const handleResetButton = () => {
    console.log("reset button pressed.");
    setIsReset(isReset ? false : true)
  };

  const handleArraySizeChange = (e) => {
    setArraySize(e.target.value);
    setIsReset(isReset ? false : true)
    setIsReset(isReset ? false : true)
  };

  const handleFrequencyChange = (e) => {
    setFrequency(e.target.value);
  };

  const handleBitnessChange = (e, val) => {
    if (val !== null) {
      console.log("bitness", val)
      methods.setValue("bitness", val)
      setBitness(val);
    }
  };

  return (
    <>
      <AppBar
        color="navigation"
        position="sticky"
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Avatar variant="rounded" src="/uhm-coe.png" sx={{ mx: { sm: 2 } }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
            display={{ xs: "none", md: "block" }}
          >
            IRS Control System
          </Typography>
          <Stack spacing={2} direction="row" sx={{ justifyContent: "end" }}>
            <Button variant="contained" onClick={handleClick}>
              AH {status}
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={handleStopButton}
              disabled={!isRunning}
            >
              Stop Program
            </Button>
            <Button
              color="primary"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleStartButton}
              disabled={isRunning}
            >
              Start
            </Button>
            <Button
              color="grey"
              variant="contained"
              onClick={handleResetButton}
              disabled={isRunning}
            >
              <RefreshIcon />
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <FormProvider {...methods}>
        <Container>
          <Paper style={{ margin: "25px", padding: "25px" }}>
            <Grid
              container
              spacing={3}
              // columns={{ xs: 1, md: 2 }}
              direction="row"
              justify="center"
              alignItems="stretch"
            >
              <Grid item xs={6}>
                <Grid style={{ height: "100%" }}>
                  <Stack spacing={0} sx={{ m: 0 }}>
                    <Typography variant="button">Status: {isConnected ? "Connected" : "Disconnected"}</Typography>
                    {/* <AntennaPattern isReset={isReset} /> */}
                  </Stack>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="column" spacing={3}>
                  <Grid item xs={12}>
                    <FormControl style={{ width: "100%" }}>
                      <InputLabel>Array Size</InputLabel>
                      <Select
                        value={arraySize}
                        label="Array Size"
                        {...methods.register("arrayDimension")}
                        onChange={(e) => handleArraySizeChange(e)}
                        disabled={isRunning}
                      // size="small"
                      >
                        {Array.from(Array(8)).map((_, val) => (
                          <MenuItem
                            key={`arraySize-menu-item-${val + 1}`}
                            value={val + 1}
                          >
                            {val + 1}x{val + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl style={{ width: "100%" }}>
                      <TextField
                        value={frequency}
                        label="Frequency"
                        {...methods.register("frequency")}
                        onChange={(e) => handleFrequencyChange(e)}
                        disabled={isRunning}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">Hz</InputAdornment>
                          ),
                        }}
                      // size="small"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <ToggleButtonGroup
                      value={bitness}
                      exclusive
                      size="small"
                      onChange={handleBitnessChange}
                      disabled={isRunning}
                    >
                      <ToggleButton value="1">1-Bit</ToggleButton>
                      <ToggleButton value="2">2-Bit</ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Container>

        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="Auto" />
          <Tab label="Manual" />
          <Tab label={<SettingsIcon sx={{ fontSize: "medium" }} />} />
        </Tabs>
        <CustomTabPanel value={selectedTab} index={0}>
          <AutoConfiguration isRunning={isRunning} isReset={isReset} />
          {/* <div style={{display: {selectedTab = 0 ? "" : ""}}}> */}

          {/* </div> */}
        </CustomTabPanel>
        <CustomTabPanel value={selectedTab} index={1}>
          <ManualConfiguration
            submitRef={submitRef}
            isRunning={isRunning}
            isReset={isReset}
            arraySize={arraySize}
          />
        </CustomTabPanel>
        <CustomTabPanel value={selectedTab} index={2}>
          <Settings />
        </CustomTabPanel>
      </FormProvider>
    </>
  );
}
