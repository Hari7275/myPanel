// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useGetFluteConsultantTrafficQuery } from "../../_store/api";

// export const CategoryCard = ({ label, segments }) => {
//   const size = 200;
//   const radius = 70;
//   const strokeWidth = 30;
//   const circumference = 2 * Math.PI * radius;
//   const gapSize = 15; // Gap between segments in pixels
//   const center = size / 2; // cx and cy for SVG
//   const n = segments.length; // Number of segments
//   // Calculate gap angle in degrees
//   const gapAngle = (gapSize / circumference) * 360;
//   // Total angle for segments after accounting for gaps
//   const totalSegmentAngle = 360 - n * gapAngle;
//   const sum = segments.reduce(
//     (total, segment) => total + segment.percentage,
//     0
//   );

//   // Segment data with start and end angles
//   let accumulatedAngle = 0;
//   const segmentData = segments.map((segment) => {
//     const segmentAngle = (segment.percentage / sum) * totalSegmentAngle;
//     const startAngle = accumulatedAngle;
//     const endAngle = startAngle + segmentAngle;
//     accumulatedAngle = endAngle + gapAngle; // Add gap after each segment
//     return { ...segment, startAngle, endAngle };
//   });

//   // Function to calculate points
//   const getPoint = (angle, rad) => {
//     const radian = (angle * Math.PI) / 180;
//     return {
//       x: center + rad * Math.cos(radian),
//       y: center + rad * Math.sin(radian),
//     };
//   };

//   // Generate path for each segment
//   const generatePath = (startAngle, endAngle) => {
//     const r_out = radius + strokeWidth / 2;
//     const r_in = radius - strokeWidth / 2;
//     const delta = 19; // Adjust for bulge/curve size

//     const startArc = getPoint(startAngle, r_out);
//     const endArc = getPoint(endAngle, r_out);
//     const startIn = getPoint(startAngle, r_in);
//     const endIn = getPoint(endAngle, r_in);
//     // Control points for outward bulge at start
//     const controlStartOut = getPoint(startAngle - 10, r_out + delta);
//     const controlStartIn = getPoint(startAngle - 10, r_in + delta);

//     // Control points for inward curve at end
//     const controlEndOut = getPoint(endAngle - 10, r_out - delta);
//     const controlEndIn = getPoint(endAngle - 10, r_in + delta);

//     return `
//     M ${startArc.x},${startArc.y}
//     A ${r_out},${r_out} 0 0 1 ${endArc.x},${endArc.y}
//     Q ${controlEndIn.x},${controlEndIn.y} ${endIn.x},${endIn.y}
//     A ${r_in},${r_in} 0 0 0 ${startIn.x},${startIn.y}
//     Q ${controlStartIn.x},${controlStartIn.y} ${startArc.x},${startArc.y}
//     Z
//   `;
//   };

//   const items = [
//     {
//       id: 1,
//       colorClass: "color-astrologers",
//       text: "Astrologers",
//       percentage: "38.6%",
//     },
//     {
//       id: 2,
//       colorClass: "color-coach",
//       text: "Dating Coach",
//       percentage: "22.4%",
//     },
//     {
//       id: 3,
//       colorClass: "color-psychic",
//       text: "Pet Psychic",
//       percentage: "17.2%",
//     },
//     { id: 4, colorClass: "color-other", text: "Other", percentage: "21.8%" },
//   ];

//   return (
//     <div className="dashboard-card-style" style={{ height: "320px" }}>
//       <div style={{ margin: "0px 0px 20px 20px" }}>
//         <span style={{ fontSize: "20px", fontWeight: "600" }}>{label}</span>
//       </div>
//       <div
//         style={{
//           boxShadow: "none",
//           display: "flex",
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-evenly",
//           // border: "1px solid blue",
//         }}
//       >
//         {/* Concentric Circle */}
//         <div style={{ position: "relative", width: size, height: size }}>
//           <svg
//             width={size}
//             height={size}
//             style={{ transform: "rotate(-90deg)" }}
//           >
//             {/* Background circle */}
//             <circle
//               cx={center}
//               cy={center}
//               r={radius}
//               fill="none"
//               stroke="#ffffffff"
//               strokeWidth={strokeWidth}
//             />

//             {/* Colored segments */}
//             {segmentData.map((segment, index) => (
//               <path
//                 key={index}
//                 d={generatePath(segment.startAngle, segment.endAngle)}
//                 fill={segment.color}
//               />
//             ))}
//           </svg>
//         </div>
//         {/* Text content */}
//         <div className="list-container">
//           {items.map((item) => (
//             <div key={item.id} className="list-item">
//               <span className={`color-circle ${item.colorClass}`}></span>
//               <span className="item-text">{item.text}</span>
//               <span className="item-percentage">{item.percentage}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const TrafficConsultant = () => {
//   const [data, setdata] = useState([]);
//   const { data: fetchData, isLoading } = useGetFluteConsultantTrafficQuery();

//   useEffect(() => {
//     if (fetchData) {
//       setdata(fetchData.data);
//     }
//   }, [fetchData]);

//   console.log("data...", data);
//   const overviewItems = [
//     {
//       name: "Traffic - Consultants",
//       link: "/coach-category_metadata",
//       permissions: "view_coach_categories_list",
//       price: "₹3781",
//       bgcolor: "#ffFfFF",
//     },
//   ];
//   return (
//     <>
//       <div className="traffic-consultants" style={{ padding: "25px 0px" }}>
//         <div className="" style={{ width: "100%" }}>
//           {overviewItems.map((item) => (
//             <CategoryCard
//               key={item.name}
//               label={item.name}
//               price={item.price}
//               bgcolor={item.bgcolor}
//               segments={[
//                 { percentage: 38.6, color: "#000000ff" },
//                 { percentage: 22.5, color: "#BAEDBD" },
//                 { percentage: 30.8, color: "#95A4FC" },
//                 { percentage: 8.1, color: "#B1E3FF" },
//               ]}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default TrafficConsultant;






import React, { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useGetFluteConsultantTrafficQuery } from "../../_store/api";

const TrafficConsultant = () => {
  const [data, setData] = useState([]);
  const { data: fetchData, isLoading } = useGetFluteConsultantTrafficQuery();

  useEffect(() => {
    if (fetchData && fetchData.data) {
      // Transform API data to match PieChart format
      const transformedData = fetchData.data.map((item) => ({
        title: item.name,
        value: parseFloat(item.value),
        color: item.color,
      }));
      setData(transformedData);
    }
  }, [fetchData]);

  

  return (
    <div className="dashboard-card-style" style={{ height: "320px", padding: "20px" }}>
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
            <div key={index} className="list-item" style={{ 
              display: "flex", 
              alignItems: "center", 
              marginBottom: "10px",
              gap: "10px"
            }}>
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
              <span className="item-text" style={{ flex: 1 }}>{item.title}</span>
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