import { useState, useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = () => {
    console.log("dark mode", darkMode);
    if (darkMode) {
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
  };

  return (
    <Container>
      <DarkModeIcon onClick={handleDarkMode} />
    </Container>
  );
}
