import { createTheme } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";

export default function DeviationSlider({
  baseValue = 0,
  label,
  units,
  min = -100,
  max = 100,
  value,
  onChange,
}) {
  const classes = useStyles;

  return (
    <>
      <InputLabel shrink>{label}</InputLabel>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            min={min}
            max={max}
            value={[
              value < baseValue ? value : baseValue,
              value > baseValue ? value : baseValue,
            ]}
            onChange={(e, value) => {
              onChange(value[0] !== baseValue ? value[0] : value[1]);
            }}
            marks={[
              {
                value: baseValue,
                label: baseValue + units,
              },
            ]}
            className={
              value < baseValue
                ? classes.sliderNegative
                : classes.sliderPositive
            }
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={(min < 0 && value > 0 ? "+" : "") + value}
            margin="dense"
            onChange={(e) => {
              let val = Number(e.target.value);
              if (Number.isNaN(val)) val = baseValue;
              if (val < min) val = min;
              if (val > max) val = max;
              onChange(val);
            }}
            inputProps={{
              min,
              max,
            }}
            endAdornment={
              <InputAdornment position="end">{units}</InputAdornment>
            }
          />
        </Grid>
      </Grid>
    </>
  );
}

const useStyles = createTheme((theme) => ({
  input: {
    width: 56,
  },
  sliderNegative: {
    "& .MuiSlider-thumb": {
      color: theme.palette.error.dark,
      "&+.MuiSlider-thumb": {
        display: "none",
      },
    },
    "& .MuiSlider-track": {
      color: theme.palette.error.dark,
    },
  },
  sliderPositive: {
    "& .MuiSlider-thumb": {
      display: "none",
      "&+.MuiSlider-thumb": {
        display: "flex",
        color: theme.palette.success.dark,
      },
    },
    "& +.MuiSlider-track": {
      color: theme.palette.success.dark,
    },
  },
}));
