import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Slider from "@mui/material/Slider";

export default function HeaderCell(props) {
  const { children, row, col, arraySize, ...other } = props;

  return (
    <Grid container sx={{ px: 0, py: 0 }}>
      <Typography variant="body2">Voltage</Typography>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Slider
            defaultValue={[-10, 10]}
            min={-10}
            max={10}
            step={1}
            // marks
            valueLabelDisplay="auto"
            size="small"
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
            defaultValue={50}
            step={5}
            // marks
            valueLabelDisplay="auto"
            size="small"
          />
        </Grid>
        <Grid item xs={2}>
          %
        </Grid>
      </Grid>
    </Grid>
  );
}
