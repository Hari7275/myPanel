import React, { useState } from "react";
import ConsultantObservation from "./consultantObservation/ConsultantObservation";
import UserObservation from "./userObservation/UserObservation";
import { Button } from "@mui/material";
import { Eye, UserSearch } from "lucide-react";
import "./ObservingList.css";

const ObservingList = () => {
  const [activeTab, setActiveTab] = useState("consultant");

  return (
    <div className="obs-page">
      {/* Tab Buttons */}
      <div className="obs-actions">
        <Button
          variant={activeTab === "consultant" ? "contained" : "outlined"}
          onClick={() => setActiveTab("consultant")}
          startIcon={<Eye size={16} />}
          size="small"
          sx={{ textTransform: "none", borderRadius: "8px", fontWeight: 600 }}
        >
          Consultant Observation
        </Button>
        <Button
          variant={activeTab === "user" ? "contained" : "outlined"}
          onClick={() => setActiveTab("user")}
          startIcon={<UserSearch size={16} />}
          size="small"
          sx={{ textTransform: "none", borderRadius: "8px", fontWeight: 600 }}
        >
          User Observation
        </Button>
      </div>

      {/* Tab Content */}
      <div className="obs-content">
        {activeTab === "consultant" && <ConsultantObservation />}
        {activeTab === "user" && <UserObservation />}
      </div>
    </div>
  );
};

export default ObservingList;
