import React, { useState, useEffect } from "react";

import { UpdateInputField } from "../../../src/_components/ui/inputForm";
import { useGetProfileReviewDetailsQuery } from "../../_store/api";

const AdminUpdateDetails = ({ consultantId }) => {
  const { data: fetchData } = useGetProfileReviewDetailsQuery({
    id: consultantId,
  });

  const consultantData = fetchData?.data?.consultant_submitted_data || {};

  // Initialize state with consultant data
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (consultantData) {
      setFormData(consultantData);
    }
  }, [consultantData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value || "",
    }));
  };

  return (
    <div className="main-container sub-container">
      <div className="RewardsTxn-container">
        <label
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "block",
            backgroundColor: "#f0f0f0",
          }}
        >
          Update Info
        </label>

        <form className="simple-form" noValidate autoComplete="off">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {Object.entries(formData)
              .filter(([_, value]) => value !== null)
              .map(([key, value], index, array) => {
                return index % 2 === 0 ? (
                  <div key={key} style={{ display: "flex", width: "100%" }}>
                    {key === "description" ? (
                      <textarea
                        id={key}
                        name={key}
                        value={value}
                        onChange={handleChange}
                        style={{
                          flex: 1,
                          marginRight: "10px",
                          height: "80px",
                          width: "50%",

                          border: "2px solidrgb(186, 186, 186)",
                          borderRadius: "5px", // Rounded corners
                          padding: "10px", // Inner spacing
                          fontSize: "16px", // Font size
                          fontFamily: "Arial, sans-serif", // Font family
                          backgroundColor: "#F8F9FA", // Light background color
                        }}
                        placeholder="Enter description"
                      />
                    ) : (
                      <UpdateInputField
                        label={key.replace(/_/g, " ")}
                        type="text"
                        id={key}
                        name={key}
                        value={value}
                        onChange={handleChange}
                        style={{ flex: 1, marginRight: "10px" }}
                      />
                    )}

                    {array[index + 1] &&
                      array[index + 1][0] !== "description" && (
                        <UpdateInputField
                          label={array[index + 1][0].replace(/_/g, " ")}
                          type="text"
                          id={array[index + 1][0]}
                          name={array[index + 1][0]}
                          value={array[index + 1][1]}
                          onChange={handleChange}
                          style={{ flex: 1 }}
                        />
                      )}
                  </div>
                ) : null;
              })}

            {/* <UpdateInputField
              label={"Admin Comment"}
              type="text"
              id={key}
              name={key}
              value={value}
              onChange={handleChange}
              style={{ flex: 1, marginRight: "10px" }}
            /> */}
          </div>

          <div
            style={{
              marginTop: "20px",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <button
              type="button"
              className="fifthButton"
              style={{ marginRight: "10px" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="fifthButton"
              style={{ backgroundColor: "green" }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUpdateDetails;
