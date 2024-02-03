import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createTheme, ThemeProvider, styled, useTheme } from '@mui/material/styles'
import { grey, green, orange } from '@mui/material/colors';

const themeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#fafafa',
    },
    secondary: {
      main: '#37856d',
    },
    grey: {
      main: grey[600],
      dark: grey[900],
      contrastText: '#fff',
    }
  },
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={themeOptions}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
