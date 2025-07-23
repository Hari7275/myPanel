import * as React from "react";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";

export default function BasicArea() {
  const uData = [
    4000, 3000, 2000, 2780, 1890, 2390, 3490, 6000, 2000, 4000, 5000, 5000,
  ];
  const xLabels = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <div style={{ padding: "0 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Revenue</h2>
        <div>
          <div style={{ width: "290px" }}>
            <form
              className="simple-form"
              noValidate
              autoComplete="off"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="input-container">
                {/* <label htmlFor="status">Status</label> */}
                <select
                  id="status"
                  name="status"
                  className="userProfile-input-field"
                  aria-describedby="status-desc"
                >
                  {/* <option value="">Select Status</option> */}
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>

      <LineChart
        height={320}
        series={[
          {
            data: uData,
            label: "graph for flute revenue",
            area: true,
            showMark: true,
            color: "#DBA5FF",
            // areaColor: "#000",
          },

          // {
          //   data: uData,
          //   label: "graph for flute revenue",
          //   area: true,
          //   showMark: true,
          //   color: "#4CAF50",
          //   areaColor: "rgba(76, 175, 80, 0.3)",
          // },
        ]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
        sx={{
          [`& .${lineElementClasses.root}`]: {
            display: "none",
          },
          width: "100%",
        }}
      />
    </div>
  );
}
