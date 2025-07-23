import React from 'react'
import { Link } from "react-router-dom";
import "./CategoriesList.css";

export const CategoryCard =
  ({
    link,
    label,
    price,
    bgcolor,
    segments
  }) => {
    // Calculate total size and radius
    const size = 200;
    const radius = 70;
    const strokeWidth = 30;
    const circumference = 2 * Math.PI * radius;
    const gapSize = 4; // Increased gap size for better visibility
    // Calculate segments with gaps
    let accumulatedOffset = 0;
    const segmentData = segments?.map((segment) => {
      const segmentLength = (segment.percentage / 100) * circumference;

      // Create dash pattern: [visible segment, gap]
      const dashArray = [segmentLength - gapSize / 2, gapSize];

      const segmentInfo = {
        ...segment,
        dashArray: dashArray.join(' '),
        offset: accumulatedOffset
      };

      accumulatedOffset += segmentLength;
      return segmentInfo;
    }) || [];

    return (
      <div>
        <div
          className="dashboard-card-style"
          style={{
            backgroundColor: bgcolor,
            boxShadow: "none",
            height: "320px",
            display: "flex",
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Concentric Circle */}
          <div style={{ position: 'relative', width: size, height: size }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
              {/* Background circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#e0e0e0"
                strokeWidth={strokeWidth}
              />

              {/* Colored segments */}
              {segmentData.map((segment, index) => (
                <circle
                  key={index}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${segment.dashArray} ${circumference}`}
                  strokeDashoffset={-segment.offset}
                  strokeLinecap="round"
                />
              ))}
            </svg>
          </div>
          {/* Text content */}
          <div style={{
            position: 'relative',
            textAlign: 'center',
            zIndex: 2,
            width: '320px'
          }}>
            <span style={{ fontSize: "20px", fontWeight: "600", display: 'block' }}>
              {label}
            </span>
            <span style={{ fontSize: "24px", fontWeight: "700", display: 'block', marginTop: '8px' }}>
              {price}
            </span>
          </div>
        </div>
      </div>
    );
  }

const TrafficConsultant = () => {
  const overviewItems = [
    {
      name: "Traffic - Consultants",
      link: "/coach-category_metadata",
      permissions: "view_coach_categories_list",
      price: "₹3781",
      bgcolor: "#ffFfFF"
    },
  ];
  return (
    <>
      <div className='traffic-consultants' style={{ margin: "0px 25px" }}>
        <div className="" style={{ width: "100%", height: "300px" }}>
          {overviewItems.map((item) => (
            <CategoryCard
              key={item.name}
              label={item.name}
              price={item.price}
              bgcolor={item.bgcolor}
              segments={[
                { percentage: 38.6, color: "#000000ff" },
                { percentage: 22.5, color: "#BAEDBD" },
                { percentage: 30.8, color: "#95A4FC" },
                { percentage: 8.1, color: "#B1E3FF" }
              ]}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default TrafficConsultant