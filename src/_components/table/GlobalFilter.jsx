import React from "react";
// import InputField from "../ui/InputField";

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
