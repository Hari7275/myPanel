import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Select from "react-select";

import {
  useDeleteAssigneConsultantNoticeMutation,
  useGetConsultantAssignedNoticeListQuery,
} from "../../../../_store/api";

import { toast } from "react-hot-toast";

// Custom Option with Checkbox
const CustomOption = (props) => {
  const { data, isSelected, innerRef, innerProps } = props;

  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{ display: "flex", alignItems: "center", padding: "10px" }}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => null} // react-select handles selection
        style={{ marginRight: "10px" }}
      />
      <label>{data?.label}</label>
    </div>
  );
};

const UnAssignNotice = ({ isOpen, onClose, selectedRow }) => {
  const [options, setOptions] = useState([]);
  const [selectedConsultants, setSelectedConsultants] = useState([]);

  const { data: assignedNotice } = useGetConsultantAssignedNoticeListQuery({
    notice_id: selectedRow?.id,
  });
  const [deleteData, { isLoading }] =
    useDeleteAssigneConsultantNoticeMutation();

  useEffect(() => {
    if (assignedNotice?.data) {
      // Extract assign_id, consultant_id, and first_name for the dropdown
      const assignedConsultantIds = assignedNotice?.data?.map((item) => ({
        value: item?.id, // assign_id
        label: `${item?.ConsultantProfile?.first_name} (ID: ${item?.ConsultantProfile?.id})`,
        assign_id: item?.id,
      }));

      setOptions(assignedConsultantIds);
    } else {
      setOptions([]);
    }
  }, [assignedNotice]);

  const handleMultiSelectChange = (selectedOptions) => {
    setSelectedConsultants(selectedOptions || []);
  };

  const handleSubmit = async () => {
    // Extract assign_id values from selected consultants
    const assignIds = selectedConsultants.map(
      (consultant) => consultant?.assign_id
    );

    if (!Array.isArray(assignIds) || assignIds.length === 0) {
      alert("Please select at least one consultant.");
      return;
    }

    const payload = {
      id: assignIds, // Pass the array of assign_id values
    };

    try {
      await deleteData(payload).unwrap();
      toast.success("Data submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting data:", error);
      if (error?.data?.message) {
        alert(`Submission failed: ${error.data.message}`);
      }
    }
  };

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div style={{ minWidth: "500px", minHeight: "500px" }}>
        <label htmlFor="categories">Unassign Consultant Notice</label>
        <Select
          isMulti
          options={options}
          onChange={handleMultiSelectChange}
          placeholder="Select consultants"
          components={{ Option: CustomOption, MultiValue: () => null }}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          isClearable={false}
          value={selectedConsultants}
        />
      </div>

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <button
          className="fifthButton"
          style={{ backgroundColor: "green" }}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </ReactModal>
  );
};

export default UnAssignNotice;
