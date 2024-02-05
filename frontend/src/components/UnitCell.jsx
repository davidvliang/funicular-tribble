import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

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
    row,
    col,
    arraySize,
    iState,
    iVoltage,
    iDutyCycle,
    ...other
  } = props;
  const { register, setValue, getValues, watch } = useFormContext();

  const [cellState, setCellState] = useState(0);
  const [voltage, setVoltage] = useState([-10, 10]);
  const [dutyCycle, setDutyCycle] = useState(50);

  // useEffect(() => {
  //   console.log(row * arraySize + col, "VALS:", cellState, voltage, dutyCycle);
  // }, [cellState, voltage, dutyCycle]);

  // useEffect(() => {
  //   register({ name: `configuration.cell_${row * arraySize + col}.posVoltage`})
  //   register({ name: `configuration.cell_${row * arraySize + col}.negVoltage`})
  // }, [])

  const watchCellState = watch(
    `configuration.cell_${row * arraySize + col}.state`, 0
  );
  const watchVoltage = watch(
    `configuration.cell_${row * arraySize + col}.voltage`, [-10,10]
  );
  const watchDutyCycle = watch(
    `configuration.cell_${row * arraySize + col}.dutyCycle`, 50
  );

  // useEffect(() => {
  //   if (watchCellState !== undefined) {
  //     console.log(row * arraySize + col, "WATCH STATE", watchCellState);
  //     // setCellState()
  //   }
  // }, [watchCellState]);
  // useEffect(() => {
  //   if (watchVoltage !== undefined) {
  //     console.log(row * arraySize + col, "WATCH VOLTAGE", watchVoltage);
  //     // setVoltage(watchVoltage)
  //   }
  // }, [watchVoltage]);
  useEffect(() => {
    console.log(row * arraySize + col, "WATCH DUTY CYCLE", watchDutyCycle);
    if (watchDutyCycle !== undefined && watchDutyCycle !== null) {
      setDutyCycle(watchDutyCycle)
    }
  }, [watchDutyCycle]);

  // useEffect(() => {
  //   Array.from(Array(arraySize ** 2)).map((_, cell) => {
  //     register({ name: `configuration.cell_${cell}.posVoltage` });
  //     register({ name: `configuration.cell_${cell}.negVoltage` });
  //   });
  // }, [register, arraySize]);

  const handleStateChange = (e) => {
    setCellState(e.target.checked ? 1 : 0);
  };
  const handleVoltageChange = (e, val) => {
    setVoltage(val);
  };
  const handleDutyCycleChange = (e, val) => {
    setDutyCycle(val);
  };

  return (
    <Card
      sx={{
        width: 185,
        height: 155,
        px: 0,
        py: 0.25,
        display: "flex",
        justifyContent: "center",
        alignItems: "top",
      }}
      // style={{backgroundColor: "aliceblue"}}
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
            value={cellState}
            {...register(`configuration.cell_${row * arraySize + col}.state`)}
            onChange={handleStateChange}
            sx={{}}
          />
        </Stack>
        <Grid container sx={{ px: 2, py: 0 }}>
          <Typography variant="body2">Voltage</Typography>
          <Grid container spacing={2}>
            {/* <Grid item xs={2}>
              <Typography>{voltage[0]}</Typography>
            </Grid> */}
            <Grid item xs={8}>
              <Slider
                defaultValue={[-10, 10]}
                value={voltage}
                min={-10}
                max={10}
                step={1}
                // marks
                valueLabelDisplay="auto"
                size="small"
                {...register(
                  `configuration.cell_${row * arraySize + col}.voltage`
                )}
                onChange={handleVoltageChange}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography>
                {voltage[0]}/{voltage[1]}
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="body2">Duty Cycle</Typography>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Slider
                value={dutyCycle}
                min={0}
                max={100}
                step={5}
                valueLabelDisplay="auto"
                size="small"
                {...register(
                  `configuration.cell_${row * arraySize + col}.dutyCycle`
                )}
                onChange={handleDutyCycleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography>{dutyCycle}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
