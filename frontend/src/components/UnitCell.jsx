import { useState, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Slider from "@mui/material/Slider";

export default function UnitCell(props) {
  const {
    children,
    isRunning,
    isReset,
    row,
    col,
    arraySize,
    ...other
  } = props;
  
  const { register, setValue, getValues, reset } = useFormContext();

  const [cellState, setCellState] = useState(false);
  const [voltage, setVoltage] = useState([-10, 10]);
  const [dutyCycle, setDutyCycle] = useState(50);

  useEffect(() => {
    console.log("RESET BUTTON", row * arraySize + col)
    setCellState(false)
    setVoltage([-10, 10])
    setDutyCycle(50)
    reset()
  }, [isReset])

  // useEffect(() => {
  //   console.log(row * arraySize + col, "VALS:", cellState, voltage, dutyCycle);
  // }, [cellState, voltage, dutyCycle]);

  register(`configuration.cell_${row * arraySize + col}.posVoltage`, { value: voltage[1] })
  register(`configuration.cell_${row * arraySize + col}.negVoltage`, { value: voltage[0] })
  register(`configuration.cell_${row * arraySize + col}.dutyCycle`, { value: dutyCycle })
  register(`configuration.cell_${row * arraySize + col}.state`, { value: cellState })


  const watchCellState = useWatch(
    {
      name: `configuration.cell_${row * arraySize + col}.state`
    });
  const watchPosVoltage = useWatch(
    {
      name: `configuration.cell_${row * arraySize + col}.posVoltage`, defaultValue: 10
    });
  const watchNegVoltage = useWatch(
    {
      name: `configuration.cell_${row * arraySize + col}.negVoltage`, defaultValue: -10
    });
  const watchDutyCycle = useWatch(
    {
      name: `configuration.cell_${row * arraySize + col}.dutyCycle`
    });

  useEffect(() => {
    if (watchCellState !== undefined) {
      console.log(row * arraySize + col, "WATCH STATE", watchCellState, watchCellState);
      setCellState(watchCellState)
    }
  }, [watchCellState]);
  useEffect(() => {
    if (watchPosVoltage !== undefined) {
      console.log(row * arraySize + col, "WATCH POS VOLTAGE", watchPosVoltage);
      setVoltage([voltage[0], watchPosVoltage])
    }
  }, [watchPosVoltage]);
  useEffect(() => {
    if (watchNegVoltage !== undefined) {
      console.log(row * arraySize + col, "WATCH NEG VOLTAGE", watchNegVoltage);
      setVoltage([watchNegVoltage, voltage[1]])
    }
  }, [watchNegVoltage]);
  useEffect(() => {
    console.log(row * arraySize + col, "WATCH DUTY CYCLE", watchDutyCycle);
    if (watchDutyCycle !== undefined && watchDutyCycle !== null) {
      setDutyCycle(Number(watchDutyCycle))
    }
  }, [watchDutyCycle]);


  const handleStateChange = (e) => {
    setValue(`configuration.cell_${row * arraySize + col}.state`, e.target.checked)
    setCellState(e.target.checked);
  };
  const handleVoltageChange = (e, val) => {
    setValue(`configuration.cell_${row * arraySize + col}.posVoltage`, val[1])
    setValue(`configuration.cell_${row * arraySize + col}.negVoltage`, val[0])
    setVoltage(val);
  };
  const handleDutyCycleChange = (e, val) => {
    setValue(`configuration.cell_${row * arraySize + col}.dutyCycle`, val)
    setDutyCycle(val);
  };

  return (
    <Card
      sx={{
        width: 220,
        height: 120,
        px: 0,
        py: 0.25,
        display: "flex",
        justifyContent: "center",
        alignItems: "top",
        boxShadow: 3
      }}
      style={{ backgroundColor: cellState === 1 ? "aliceblue" : null }}
    >
      <CardContent sx={{ px: 0, py: 0, width: "100%" }}>
        <Stack
          spacing={0}
          direction="row"
          sx={{
            pl: 2,
            pr: 0,
            pb: 0.5,
            alignItems: "center",
            justifyContent: "space-between",
            fontWeight: "bold",
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {row * arraySize + col}
          </Typography>
          <Switch
            checked={cellState}
            onChange={handleStateChange}
            disabled={isRunning}
            sx={{}}
          />
        </Stack>
        <Grid container sx={{ px: 2, py: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={2.5}>
              <Typography>Vpp</Typography>
            </Grid>
            <Grid item xs={6}>
              <Slider
                value={voltage}
                min={-10}
                max={10}
                step={1}
                valueLabelDisplay="auto"
                size="small"
                onChange={handleVoltageChange}
                disabled={isRunning}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography>
                {voltage[0]}/{voltage[1]}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} >
            <Grid item xs={2.5} sx={{textAlign: "center"}}>
              <Typography>%</Typography>
            </Grid>
            <Grid item xs={6}>
              <Slider
                value={dutyCycle}
                min={0}
                max={100}
                step={5}
                valueLabelDisplay="auto"
                size="small"
                onChange={handleDutyCycleChange}
                disabled={isRunning}
              />
            </Grid>
            <Grid item xs={3} sx={{textAlign: "center"}}>
              <Typography>{dutyCycle}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
