import React, { useState, useEffect } from "react";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import { useGetFluteRevenueOnGraphQuery } from "../../_store/api";

export default function BasicArea() {
  const [data, setData] = useState([]);
  const [dateFilter, setDateFilter] = useState("weekly");
  const { data: fetchData } = useGetFluteRevenueOnGraphQuery({ dateFilter });

  useEffect(() => {
    if (fetchData?.data) {
      setData(fetchData.data);
    }
  }, [fetchData]);

  // Extract labels and totals from API data
  const labels = data.map((item) => item.label);
  const totals = data.map((item) => item.total);

  const handleClickDateFilter = (e) => {
    setDateFilter(e.target.value);
  };

  console.log("data", data);

  return (
    <div style={{ padding: "0 0px", margin: "0px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Recharge</h2>
        <div>
          <div style={{ width: "auto" }}>
            <form
              className="simple-form"
              noValidate
              autoComplete="off"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="input-container">
                <select
                  id="status"
                  name="status"
                  className="userProfile-input-field"
                  aria-describedby="status-desc"
                  onClick={handleClickDateFilter}
                >
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
        className="dashboard-card-style"
        height={300}
        series={[
          {
            data: totals,
            label: "Flute Revenue",
            area: true,
            showMark: true,
            color: "#35ae1cff",
          },
        ]}
        // xAxis={[{ scaleType: "point", data: labels }]}}

        xAxis={[
          {
            scaleType: "point",
            data: labels,
            // tickLabelInterval: () => true,
          },
        ]}
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
