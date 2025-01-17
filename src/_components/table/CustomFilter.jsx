import React from "react";

const CustomFilter = () => {
  return (
    <div style={{ width: "100%", height: "35px" }}>
      <input
        className="inputBox"
        placeholder="Search by Name"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
      />
      <input
        className="inputBox"
        placeholder="Search by Phone No."
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
      />
      <input
        className="inputBox"
        placeholder="Search by Email"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
      />
    </div>
  );
};

export default CustomFilter;
