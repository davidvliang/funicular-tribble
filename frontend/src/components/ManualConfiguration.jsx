import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { styled } from "@mui/material/styles";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";

import DownloadIcon from "@mui/icons-material/Download";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import UnitCell from "./UnitCell";
import HeaderCell from "./HeaderCell";

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

export default function ManualConfiguration({
  submitRef,
  isRunning,
  arraySize,
}) {
  const { register, handleSubmit, setValue, getValues, ...other } =
    useFormContext();

  const onSubmit = (data) => {
    console.log("SUBMIT DATA", data);
  };

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    //     {/* <Button ref={submitRef} type='submit' variant='contained' style={{ display: 'none' }} /> */}
    <Grid container>
      <Grid item xs={12} sx={{ mx: 5 }}>
        <Stack direction="row" spacing={2}>
          <Button
            component="label"
            variant="contained"
            startIcon={<FileUploadIcon />}
            disabled={isRunning}
          >
            Upload Configuration
            <VisuallyHiddenInput type="file" />
          </Button>
          <Button
            component="label"
            variant="contained"
            startIcon={<DownloadIcon />}
            style={{ marginBottom: "0px" }}
          >
            Download Configuration
          </Button>
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ mx: "auto" }}
        style={{ overflowX: "auto", whiteSpace: "nowrap" }}
      >
        <form
          name="cellArray"
          ref={submitRef}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Table
            padding="none"
            size="small"
            sx={{ mx: "auto", my: 2 }}
            style={{ width: "min-content" }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    verticalAlign: "top",
                    p: 1,
                    width: 1,
                  }}
                >
                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                    sx={{ boxShadow: 1 }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                      sx={{ p: 1 }}
                    />
                  </Accordion>
                </TableCell>

                {Array.from(Array(arraySize)).map((_, header) => (
                  <TableCell
                    key={`key-header-${header}`}
                    sx={{
                      borderBottom: "none",
                      p: 1,
                      width: 1,
                    }}
                  >
                    <Accordion
                      expanded={expanded === "panel1"}
                      sx={{ width: 175, boxShadow: 0 }}
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
                            Col {header}
                          </Typography>
                          <Switch sx={{}} />
                        </Stack>
                      </AccordionSummary>

                      <AccordionDetails sx={{ py: 0 }}>
                        <HeaderCell
                          row={0}
                          col={header}
                          arraySize={arraySize}
                        />
                      </AccordionDetails>
                    </Accordion>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {Array.from(Array(arraySize)).map((_, row) => (
                <TableRow key={`key-row-${row}`}>
                  <TableCell
                    key={`key-row-idx-${row}`}
                    sx={{
                      borderBottom: "none",
                      p: 1,
                      width: 1,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {row}
                  </TableCell>
                  {Array.from(Array(arraySize)).map((_, col) => (
                    <TableCell
                      key={`key-cell-${row * arraySize + col}`}
                      sx={{ borderBottom: "none", p: 1, width: 1 }}
                    >
                      <UnitCell
                        row={row}
                        col={col}
                        arraySize={arraySize}
                        // {...register("test")}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </form>
      </Grid>
    </Grid>
  );
}
