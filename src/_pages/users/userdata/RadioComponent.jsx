import React, { useState, useEffect } from "react";

const RadioComponent = ({ data, interestType, setSelectedInterests }) => {
  const [selectedValue, setSelectedValue] = useState(interestType);

  useEffect(() => {
    setSelectedValue(interestType);
  }, [interestType]);

  const handleValueChange = (id) => {
    setSelectedValue(id);
    setSelectedInterests((prev) => {
      const existing = prev.find(
        (interest) => interest?.profile_feature === data?.profile_feature
      );
      if (existing) {
        return prev.map((interest) =>
          interest?.profile_feature === data?.profile_feature
            ? { ...interest, selected_value: id }
            : interest
        );
      } else {
        return [
          ...prev,
          { profile_feature: data?.profile_feature, selected_value: id },
        ];
      }
    });
  };

  return (
    <>
      <div className="col-12">
        <div className="ProfileData-options">{data.profile_value}</div>
        <div className="ProfileData-checklist">
          {data.options.map((option) => (
            <div key={option.id} className="input-group">
              <div>
                <label className="input-group-options">
                  <input
                    className="input-group-radio"
                    type="radio"
                    name={data.profile_value}
                    checked={option.id === selectedValue}
                    onChange={() => handleValueChange(option.id)}
                  />
                  <span>{option.meta_state}</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="divider"></div>
    </>
  );
};

export default RadioComponent;
