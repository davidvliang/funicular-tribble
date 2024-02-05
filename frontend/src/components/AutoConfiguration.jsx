import { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import VolumeUp from "@mui/icons-material/VolumeUp";
import MuiInput from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import DeviationSlider from "./DeviationSlider";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function AutoConfiguration({ isRunning }) {
  const [value, setValue] = useState([0, -10]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event, newValue) => {
    // setValue(event.target.value === "" ? 0 : Number(event.target.value));
    setValue(newValue);
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <Container sx={{ width: "60%" }}>
      <Typography variant="h6" gutterBottom>
        Table Lookup
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ my: 2 }}
      >
        <TextField
          value={value[0] + value[1]}
          size="small"
          // type="number"
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={isRunning}
          sx={{ width: 60 }}
        />
      </Grid>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Slider
            // value={typeof value === "number" ? value : 0}
            value={value}
            defaultValue={[0, 10]}
            min={-45}
            max={45}
            step={5}
            onChange={handleSliderChange}
            disabled={isRunning}
            // track={false}
            // marks
            // sx={{
            //   "& .MuiSlider-thumb": {
            //     display: "none",
            //   },
            // }}
          />
          {/* <DeviationSlider /> */}
        </Grid>
      </Grid>
    </Container>
  );
}
