import React, { useState } from "react";
import "../cssfolder/subscriptionPackage.css";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Select from "react-select";

const GoodVibes = ({ selectedOption, handleChange, options }) => {
  
  return (
    <div className="sub-second-section">
      <div>
        <label className="sub-label">Good Vibes Enable</label>
        <div className="second-section-checkbox">
          <input type="checkbox" />
          <div>Yes</div>
        </div>
      </div>

      <div>
        <label className="sub-label">Good vibes</label>
        <div className="inner-section left">
          <div className="">
            <span className="button-icon">
              <PersonOutlineIcon />
            </span>
          </div>
          <input type="number" className="input-field" />
        </div>
      </div>

      <div>
        <label className="sub-label">Renew Good Vibes</label>
        <Select
          className="userProfile-input-fiel"
          options={options}
          value={selectedOption}
          onChange={handleChange}
          placeholder="Select Location"
        />
      </div>
    </div>
  );
};

const SubscriptionComponent = () => {
  
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { value: "location1", label: "Location 1" },
    { value: "location2", label: "Location 2" },
    { value: "location3", label: "Location 3" },
  ];

  const handleChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="sub-card-main-container">
      <div className="sub-card-container">
        <div className="package-name">
          <label className="sub-label">Package Name </label>
          <div className="inner-section left place" style={{ height: "40px" }}>
            <div className="">
              <span className="button-icon">
                <PersonOutlineIcon />
              </span>
            </div>
            <input
              type="text"
              className="input-field"
              placeholder="Free"
              disabled
            />
          </div>
        </div>

        <div className="dividerm"></div>

        <div className="sub-first-section">
          <div>
            <label className="sub-label">Likes</label>
            <div className="inner-section left">
              <div className="">
                <span className="button-icon">
                  <PersonOutlineIcon />
                </span>
              </div>
              <input type="number" className="input-field" />
            </div>
          </div>

          <div>
            <label className="sub-label">Likes</label>
            <div className="inner-section left">
              <div className="">
                <span className="button-icon">
                  <AcUnitIcon />
                </span>
              </div>
              <input type="number" className="input-field" />
            </div>
          </div>
        </div>
        <div className="dividerm"></div>

        <GoodVibes
          selectedOption={selectedOption}
          handleChange={handleChange}
          options={options}
        />
        <div className="dividerm"></div>
        <GoodVibes
          selectedOption={selectedOption}
          handleChange={handleChange}
          options={options}
        />
        <div className="dividerm"></div>

        <GoodVibes
          selectedOption={selectedOption}
          handleChange={handleChange}
          options={options}
        />
        <div className="dividerm"></div>

        <GoodVibes
          selectedOption={selectedOption}
          handleChange={handleChange}
          options={options}
        />
        <div className="dividerm"></div>

        <GoodVibes
          selectedOption={selectedOption}
          handleChange={handleChange}
          options={options}
        />
        <div className="dividerm"></div>

        <GoodVibes
          selectedOption={selectedOption}
          handleChange={handleChange}
          options={options}
        />
        <div className="dividerm"></div>

        <div className="sub-third-section">
          <div>
            <label className="sub-label">Good Vibes Enable</label>
            <div className="second-section-checkbox">
              <input type="checkbox" />
              <div>Yes</div>
            </div>
          </div>
          <div>
            <label className="sub-label">Good Vibes Enable</label>
            <div className="second-section-checkbox">
              <input type="checkbox" />
              <div>Yes</div>
            </div>
          </div>
          <div>
            <label className="sub-label">Good Vibes Enable</label>
            <div className="second-section-checkbox">
              <input type="checkbox" />
              <div>Yes</div>
            </div>
          </div>
          <div>
            <label className="sub-label">Good Vibes Enable</label>
            <div className="second-section-checkbox">
              <input type="checkbox" />
              <div>Yes</div>
            </div>
          </div>
        </div>

        <button className="fifthButton">Update Package</button>
      </div>
    </div>
  );
};

export default SubscriptionComponent;
