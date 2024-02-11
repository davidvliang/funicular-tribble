import { useState, useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { LineChart } from "@mui/x-charts/LineChart";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { Line } from 'react-chartjs-2';


const SERVER_URL = "http://192.168.50.51:8000";

const fetchAntennaPattern = async (data = {}) => {
  const response = await fetch(SERVER_URL + "/pattern", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // body: JSON.stringify({ name: "resultTEset"}),
    body: JSON.stringify(data),
  })
  const pattern = await response.json()
  return pattern
}


export default function AntennaPattern(props) {
  const {
    isReset,
    ...other
  } = props;

  const { register, handleSubmit, setValue, getValues } = useFormContext();

  const watchConfiguration = useWatch();

  const [patternData, setPatternaData] = useState([0, 0, 0, 0, 0, 0])
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const currentConfiguration = getValues()
    console.log("currentConfiguration", currentConfiguration)
    setPatternaData(Array.from(Array(181)).map((_, i) => 0))
    fetchAntennaPattern(currentConfiguration)
      .then((pattern) => setPatternaData(pattern))
      .then(() => setIsLoading(false))
  }, [watchConfiguration])

  useEffect(() => {
    console.log("PATTERN DATA CHANGED", patternData)
  }, [patternData])

  return (
    <>
      {
        !Array.isArray(patternData) ?
          <></>
          :
          <LineChart
            // xAxis={[{ data: [-75, -50, -25, 0, 25, 50, 75] }]}
            series={[
              {
                // data: [0,0,0,0,0,0],
                data: patternData,
                showMark: false,
              },
            ]}
            // skipAnimation={false}
            // width={500}
            height={200}
          />
      }
    </>
  );
}
