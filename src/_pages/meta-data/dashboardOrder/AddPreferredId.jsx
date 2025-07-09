import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Select from "react-select";

import {
  useGetConsultantListQuery,
  useGetConsultantListDashboardOrderQuery,
  useUpdateDashboardOrderListMutation,
} from "../../../_store/api";

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

const AddPreferredId = ({ isOpen, onClose, selectedRow }) => {
  const [options, setOptions] = useState([]);
  const [selectedConsultants, setSelectedConsultants] = useState([]);

  // const { data: fetchData } = useGetConsultantListQuery();
  const { data: fetchData } = useGetConsultantListDashboardOrderQuery({});

  const [createData, { isLoading }] = useUpdateDashboardOrderListMutation();

  // console.log("selectedRow", selectedRow.preferred_ids);
  // console.log("selectedRow", fetchData);

  useEffect(() => {
    if (fetchData?.data) {
      const preferredIds = selectedRow?.preferred_ids || [];

      const formattedOptions = fetchData?.data?.map((item) => ({
        value: item?.id,
        label: `${item?.id} - ${item?.full_name || item?.first_name || "N/A"}`,
      }));

      // Pre-select options if they match preferred_ids
      const preSelected = formattedOptions.filter((opt) =>
        preferredIds.includes(opt.value)
      );

      setOptions(formattedOptions);
      setSelectedConsultants(preSelected);
    } else {
      setOptions([]);
      setSelectedConsultants([]);
    }
  }, [fetchData, selectedRow]);

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
      preferred_ids: consultantIds,
    };

    try {
      const result = await createData({
        body: payload,
        id: selectedRow.id,
      }).unwrap();
      console.log("selectedRow.id", result);
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
        <label htmlFor="categories">Assign Consultant</label>
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

export default AddPreferredId;
