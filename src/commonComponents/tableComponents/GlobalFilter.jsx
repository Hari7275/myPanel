import React from "react";

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <>
      <input
        type="text"
        className="inputBox"
        placeholder="Search"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
      
    </>
  );
};

export default GlobalFilter;
