import { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
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


export default function AutoConfiguration(props) {
  const {
    isRunning,
    isReset,
    ...other
  } = props;

  const { register, setValue, getValues, reset } = useFormContext();

  const [angle, setAngle] = useState([0, 0]);

  useEffect(() => {
    console.log("RESET BUTTON AUTO", angle)
    setAngle([0, 0])
  }, [isReset])


  const handleSliderChange = (event, newValue) => {
    setAngle(newValue);
  };

  const handleInputChange = (event, newValue) => {
    setAngle(newValue);
  };

  const handleBlur = () => {
    if (angle < 0) {
      setValue(0);
    } else if (angle > 100) {
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
          value={angle[0] + angle[1]}
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
            value={angle}
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
