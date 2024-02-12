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

export default function ManualConfiguration(props) {
  const { submitRef, isRunning, isReset, arraySize, ...other } = props;

  const { register, handleSubmit, setValue, getValues } = useFormContext();

  const onSubmit = (data) => {
    console.log("SUBMIT DATA", data);
  };

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleFileDownload = () => {
    const name = "configuration.json";
    const data = getValues();
    const blobData = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blobData);
    const link = document.createElement("a");
    link.download = name;
    link.href = url;
    link.click();
  };

  // Runs when the file is selected for upload
  const handleFileUpload = async (e) => {
    e.preventDefault()
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = () => {
      const data = JSON.parse(reader.result)
      console.log("Upload", data)
      setValue("bitness", data.bitness)
      setValue("arrayDimension", data.arrayDimension)
      setValue("frequency", data.frequency)
      setValue("configuration", data.configuration)
    };
    reader.onerror = () => {
      console.log("[ERROR]", reader.error);
    };
  };

  return (
    //     {/* <Button ref={submitRef} type='submit' variant='contained' style={{ display: 'none' }} /> */}
    <Grid container justifyContent="center">
      <Grid item xs={8} sx={{ mx: 5 }}>
        <Grid container spacing={2} justifyContent="end" xs={12} sx={{ mb: 2 }}>
          <Grid item>
            <Button
              component="label"
              variant="outlined"
              startIcon={<FileUploadIcon />}
              disabled={isRunning}
            >
              Upload
              <VisuallyHiddenInput type="file" onChange={handleFileUpload}/>
            </Button>
          </Grid>
          <Grid item>
            <Button
              component="label"
              variant="outlined"
              startIcon={<DownloadIcon />}
              style={{ marginBottom: "0px" }}
              onClick={handleFileDownload}
            >
              Download
            </Button>
          </Grid>
        </Grid>
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
                    <HeaderCell
                      isRunning={isRunning}
                      isReset={isReset}
                      expanded={expanded}
                      col={header}
                      arraySize={arraySize}
                    />
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
                        isReset={isReset}
                        isRunning={isRunning}
                        row={row}
                        col={col}
                        arraySize={arraySize}
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
