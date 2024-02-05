import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Slider from "@mui/material/Slider";

export default function UnitCell(props) {
  const { children, row, col, arraySize, ...other } = props;

  return (
    <Card
      sx={{
        width: 175,
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
          <Switch sx={{}} />
        </Stack>
        <Grid container sx={{ px: 2, py: 0 }}>
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
      </CardContent>
    </Card>
  );
}
