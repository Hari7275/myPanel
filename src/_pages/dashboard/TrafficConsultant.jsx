import React, { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useGetFluteConsultantTrafficQuery } from "../../_store/api";
import { useTheme } from "../../_context/ThemeContext";

const isDarkColor = (hex) => {
  const color = hex.replace("#", "");
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 60;
};

const TrafficConsultant = () => {
  const { isDarkMode } = useTheme();
  const [data, setData] = useState([]);
  const { data: fetchData, isLoading } = useGetFluteConsultantTrafficQuery();

  useEffect(() => {
    if (fetchData && fetchData.data) {
      const transformedData = fetchData.data.map((item) => ({
        title: item.name,
        value: parseFloat(item.value),
        color: isDarkMode && isDarkColor(item.color) ? "#f5a623" : item.color,
      }));
      setData(transformedData);
    }
  }, [fetchData, isDarkMode]);

  return (
    <div
      className="dashboard-card-style"
      style={{ height: "100%", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center" }}
    >
      <div style={{ marginBottom: "20px" }}>
        <span style={{ fontSize: "20px", fontWeight: "600" }}>
          Traffic - Consultants
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {/* Pie Chart */}
        <div style={{ width: 200, height: 200 }}>
          <PieChart
            data={data}
            lineWidth={30} // Equivalent to strokeWidth
            radius={42} // Adjust radius to match your design
            segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
            segmentsShift={(index) => (index === 0 ? 0 : 0.5)} // Creates gap effect
            animate
            animationDuration={500}
            animationEasing="ease-out"
            startAngle={-110} // Start from top like your custom implementation
            paddingAngle={5} // Gap between segments
            label={({ dataEntry }) => ""} // No labels on chart
            labelPosition={50}
            style={{
              fontSize: "5px",
            }}
          />
        </div>

        {/* Legend */}
        <div className="list-container">
          {data.map((item, index) => (
            <div
              key={index}
              className="list-item"
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                gap: "10px",
              }}
            >
              <span
                className="color-circle"
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: item.color,
                  display: "inline-block",
                }}
              ></span>
              <span className="item-text" style={{ flex: 1 }}>
                {item.title}
              </span>
              <span className="item-percentage" style={{ fontWeight: "600" }}>
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrafficConsultant;
