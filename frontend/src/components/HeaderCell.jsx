import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Slider from "@mui/material/Slider";

export default function HeaderCell(props) {
  const { children, row, col, arraySize, ...other } = props;
  const { register, setValue } = useFormContext();

  const [cellState, setCellState] = useState(0);
  const [voltage, setVoltage] = useState([-10, 10]);
  const [dutyCycle, setDutyCycle] = useState(50);

  return (
    <Grid container sx={{ px: 0, py: 0 }}>
      <Typography variant="body2">Voltage</Typography>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Slider
            value={voltage}
            min={-10}
            max={10}
            step={1}
            // marks
            valueLabelDisplay="auto"
            size="small"
            onChange={(e,val) => {
              console.log("voltage", val)
              Array.from(Array(arraySize)).map((_,i) => {
                setValue(`configuration.cell_${i * arraySize + col}.voltage`, val[0])
              })
              setVoltage(val)
            }}
          />
        </Grid>
        <Grid item xs={2}>
          V
        </Grid>
      </Grid>

      <Typography variant="body2">Duty Cycle</Typography>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Slider
            value={dutyCycle}
            min={0}
            max={100}
            step={5}
            valueLabelDisplay="auto"
            size="small"
            onChange={(e,val) => {
              Array.from(Array(arraySize)).map((_,i) => {
                setValue(`configuration.cell_${i * arraySize + col}.dutyCycle`, val)
              })
              setDutyCycle(val)
            }}
          />
        </Grid>
        <Grid item xs={2}>
          %
        </Grid>
      </Grid>
    </Grid>
  );
}
