import React from "react";
import "../../cssfolder/Actions.css";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react"; 

const Actions = ({ data }) => {
  
  return (
    <>
      <Link to="/coach-profile">
        <ArrowRight className="secondIcon" />
      </Link>
    </>
  );
};

export default Actions;
