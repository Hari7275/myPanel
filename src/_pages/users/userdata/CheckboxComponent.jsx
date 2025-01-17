import React, { useEffect } from "react";

const CheckboxComponent = ({ data, selectedPassions, setSelectedPassions }) => {
  
  // Update the checkbox state based on the selectedPassions prop
  useEffect(() => {
    setSelectedPassions((prev) => {
      // Ensure the selectedPassions reflect the latest data
      const updatedPassions = data.map((option) => option.id);
      return updatedPassions.filter((id) => prev.includes(id));
    });
  }, [data]);

  const handleCheckboxChange = (id) => {
    setSelectedPassions((prev) => {
      if (prev.includes(id)) {
        return prev.filter((passionId) => passionId !== id); // Remove passion if already selected
      } else {
        return [...prev, id]; // Add passion if not selected
      }
    });
  };

  return (
    <>
      <div className="col-12">
        <div className="ProfileData-checklist" style={{ fontSize: "10px" }}>
          {data.map((option) => {
            const isChecked = selectedPassions.includes(option.id); // Check if the passion is selected

            return (
              <div key={option.id}>
                <label className="input-group-options">
                  <input
                    className="input-group-radio"
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCheckboxChange(option.id)}
                  />
                  <span>{option.passion}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="divider"></div>
    </>
  );
};

export default CheckboxComponent;
