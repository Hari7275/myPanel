import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Select from "react-select";

import {
  useGetConsultantListQuery,
  useCreateAssigneConsultantNoticeMutation,
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

const AssigneNotice = ({ isOpen, onClose, selectedRow }) => {
  const [options, setOptions] = useState([]);
  const [selectedConsultants, setSelectedConsultants] = useState([]);

  const { data: fetchData } = useGetConsultantListQuery();
  const { data: assignedNotice } = useGetConsultantAssignedNoticeListQuery({
    notice_id: selectedRow?.id,
  });
  const [createData, { isLoading }] =
    useCreateAssigneConsultantNoticeMutation();

  useEffect(() => {
    if (fetchData?.data && assignedNotice?.data) {
      // Extract consultant ids from the assigned notice
      const assignedConsultantIds = assignedNotice.data.map(
        (item) => item.consultant_id
      );

      // Map data into a format suitable for react-select, excluding assigned consultants
      const formattedOptions = fetchData.data
        .filter((item) => !assignedConsultantIds.includes(item.id)) // Exclude assigned consultants
        .map((item) => ({
          value: item.id,
          label: `${item.id} - ${item.full_name || item.first_name || "N/A"}`,
        }));

      setOptions(formattedOptions);
    } else {
      setOptions([]);
    }
  }, [fetchData, assignedNotice]);

  const handleMultiSelectChange = (selectedOptions) => {
    setSelectedConsultants(selectedOptions || []);
  };

  const handleSubmit = async () => {
    const consultantIds = selectedConsultants.map(
      (consultant) => consultant.value
    );

    if (!Array.isArray(consultantIds) || consultantIds.length === 0) {
      alert("Please select at least one consultant.");
      return;
    }

    const payload = {
      notice_id: selectedRow.id,
      consultant_ids: consultantIds,
    };

    try {
      await createData(payload).unwrap();
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
        <label htmlFor="categories">Assign Consultant Notice</label>
        <Select
          isMulti
          options={options} // Show only available consultants who are not assigned
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

export default AssigneNotice;
