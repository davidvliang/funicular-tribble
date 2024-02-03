import { useState, useEffect, useRef } from 'react'
import './App.css'

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import RefreshIcon from '@mui/icons-material/Refresh';

import AntennaPattern from './components/AntennaPattern';
import CellArray from './components/CellArray'

export default function App() {
  const [selectedTab, setSelectedTab] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState("")

  const submitRef = useRef()

  const newStatus = {
    "data": count + 1,
  }

  const fetchStatus = async () => {
    const response = await fetch("http://localhost:5001/")
    const status = await response.text()
    setStatus(status)
    console.log("here", status)
  }

  useEffect(() => {
    fetchStatus()
  }, [])

  const handleClick = () => {
    fetch("http://localhost:5001/daq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStatus)
    }).then(fetchStatus)
    console.log("")
  }

  const handleStartButton = (event) => {
    console.log("start button pressed.")
    setIsRunning(true)
    submitRef.current.requestSubmit()
  }

  const handleStopButton = () => {
    console.log("stop button pressed.")
    setIsRunning(false)
  }

  const handleResetButton = () => {
    console.log("reset button pressed.")
  }

  return (
    <>
      <AppBar position="static" style={{ position: "sticky", position: "-webkit-sticky" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Avatar variant="rounded" src="public/uhm-coe.png" sx={{ mx: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }} display={{ xs: "none", sm: "block" }}>
            IRS Control System
          </Typography>
          <Stack spacing={2} direction="row" sx={{ justifyContent: "end" }}>
            <Button color="error" variant="contained" onClick={handleStopButton} disabled={!isRunning}>Stop Program</Button>
            <Button color="success" variant="contained" onClick={handleStartButton} disabled={isRunning}>Start</Button>
            <Button color="grey" variant="contained" onClick={handleResetButton} disabled={isRunning}><RefreshIcon /></Button>
          </Stack>
        </Toolbar>
      </AppBar>
      {/* <Tabs value={selectedTab} onChange={(e) => setSelectedTab(e.target.value)}>
        <Tab label="Main" />
        <Tab label="Cell Configuration" />
        <Tab label="Settings" />
      </Tabs> */}

      <Container maxWidth="lg" style={{ width: "100%", my: 5 }}>




        <Stack spacing={2} direction="row" sx={{ m: 2 }}>
          <Button variant="contained" onClick={handleClick}>Contained {status}</Button>
        </Stack>
        {/* <AntennaPattern /> */}
        <CellArray submitRef={submitRef} />
      </Container>
    </>
  )
}

