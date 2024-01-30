import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function App() {
  const [count, setCount] = useState(0)

  const [status, setStatus] = useState("")

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

  return (
    <>
      Here
      {status}
      <Stack spacing={2} direction="row">
        <Button variant="text">Text</Button>
        <Button variant="contained" onClick={handleClick}>Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
