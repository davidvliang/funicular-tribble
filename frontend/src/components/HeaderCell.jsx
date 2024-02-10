import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Slider from "@mui/material/Slider";

export default function HeaderCell(props) {
  const { children, isRunning, isReset, expanded, col, arraySize, ...other } = props;
  const { register, setValue } = useFormContext();

  const [cellState, setCellState] = useState(false);
  const [voltage, setVoltage] = useState([-10, 10]);
  const [dutyCycle, setDutyCycle] = useState(50);

  useEffect(() => {
    setCellState(false)
    setVoltage([-10, 10])
    setDutyCycle(50)
  }, [isReset])


  return (
    <Accordion
      expanded={expanded === "panel1"}
      sx={{ width: 220, boxShadow: 0, backgroundColor: "transparent" }}
    >
      <AccordionSummary
        id="panel1bh-header"
        sx={{ m: 0, pr: 0, height: 10 }}
      >
        <Stack
          spacing={0}
          direction="row"
          sx={{
            px: 0,
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Col {col}
          </Typography>
          <Switch
            checked={cellState}
            onChange={(e, val) => {
              Array.from(Array(arraySize)).map((_, i) => {
                setValue(`configuration.cell_${i * arraySize + col}.state`, val)
              })
              setCellState(val)
            }}
            sx={{}}
            disabled={isRunning}
          />
        </Stack>
      </AccordionSummary>

      <AccordionDetails sx={{ py: 0 }}>
        <Grid container sx={{ px: 0, py: 0 }}>
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
                // marks
                valueLabelDisplay="auto"
                size="small"
                onChange={(e, val) => {
                  console.log("voltage", val)
                  Array.from(Array(arraySize)).map((_, i) => {
                    setValue(`configuration.cell_${i * arraySize + col}.posVoltage`, val[1])
                    setValue(`configuration.cell_${i * arraySize + col}.negVoltage`, val[0])
                  })
                  setVoltage(val)
                }}
                disabled={isRunning}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography>
                {voltage[0]}/{voltage[1]}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
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
                onChange={(e, val) => {
                  Array.from(Array(arraySize)).map((_, i) => {
                    setValue(`configuration.cell_${i * arraySize + col}.dutyCycle`, val)
                  })
                  setDutyCycle(val)
                }}
                disabled={isRunning}
              />
            </Grid>
            <Grid item xs={3} sx={{textAlign: "center"}}>
              <Typography>{dutyCycle}</Typography>
            </Grid>
          </Grid>
        </Grid>

      </AccordionDetails>
    </Accordion>

  );
}
