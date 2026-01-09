import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Select, { components } from "react-select";
import { toast } from "react-hot-toast";

import {
  useGetNoticeListQuery,
  useCreateAssigneConsultantNoticeMutation,
  useGetConsultantListAssignedNoticeQuery,
  useDeleteAssigneConsultantNoticeMutation,
} from "../../../../_store/api";

const UnAssignConsultantNotice = ({ isOpen, onClose }) => {
  const [selectedConsultants, setSelectedConsultants] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [options, setOptions] = useState([]);
  const [noticeListData, setNoticeListData] = useState([]);
  const [formData, setFormData] = useState({ description: "" });

  const { data: noticeList } = useGetNoticeListQuery();
  const { data: consultantList } = useGetConsultantListAssignedNoticeQuery(
    { noticeId: selectedNotice?.value },
    { skip: !selectedNotice } //
  );

  const [createData, { isLoading }] =
    useCreateAssigneConsultantNoticeMutation();

  const [deleteData, { isLoading: isDeleting }] =
    useDeleteAssigneConsultantNoticeMutation();

  // Custom Option Component with Checkbox
  const CustomOption = ({ innerRef, innerProps, label, isSelected }) => (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        padding: "8px 12px",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: isSelected ? "#f0f0f0" : "white",
      }}
    >
      <input
        type="checkbox"
        checked={isSelected}
        readOnly
        style={{ marginRight: "8px" }}
      />
      {label}
    </div>
  );

  // Custom Menu with Select All/Deselect All
  const CustomMenu = ({ children, ...props }) => {
    const allSelected =
      selectedConsultants.length === options.length && options.length > 0;

    const handleSelectAll = () => {
      if (allSelected) {
        setSelectedConsultants([]);
      } else {
        setSelectedConsultants(options);
      }
    };

    return (
      <components.Menu {...props}>
        <div
          onClick={handleSelectAll}
          style={{
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            backgroundColor: "#f0f0f0",
            fontWeight: "bold",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <input
            type="checkbox"
            checked={allSelected}
            readOnly
            style={{ marginRight: "8px" }}
          />
          {allSelected ? "Deselect All" : "Select All"}
        </div>
        {children}
      </components.Menu>
    );
  };

  // Load notice list
  useEffect(() => {
    if (noticeList?.data) {
      setNoticeListData(noticeList.data);
    }
  }, [noticeList]);

  // Load consultants based on selected notice and auto-select
  useEffect(() => {
    if (consultantList?.data) {
      const consultantOptions = consultantList.data.map((item) => ({
        value: item.id,
        label: `${item.ConsultantProfile.id} - ${
          item?.ConsultantProfile?.full_name ||
          item?.ConsultantProfile?.first_name ||
          "N/A"
        }`,
      }));
      setOptions(consultantOptions);
      setSelectedConsultants(consultantOptions); // ✅ auto-select all
    } else {
      setOptions([]);
      setSelectedConsultants([]);
    }
  }, [consultantList]);

  // Handle Notice Change
  const handleNoticeChange = (selectedOption) => {
    setSelectedNotice(selectedOption);
    const notice = noticeListData.find(
      (item) => item.id === selectedOption?.value
    );
    if (notice) {
      setFormData({ description: notice.description });
    } else {
      setFormData({ description: "" });
    }
  };


  const handleSubmit = async () => {
    // Extract assign_id values from selected consultants
    // All consultant IDs
    const allIds = options.map((consultant) => consultant.value);

    // Selected consultant IDs
    const selectedIds = selectedConsultants.map(
      (consultant) => consultant.value
    );

    // Find deselected IDs
    const deselectedIds = allIds.filter((id) => !selectedIds.includes(id));

    if (!Array.isArray(deselectedIds) || deselectedIds.length === 0) {
      alert("Please deselect at least one consultant.");
      return;
    }

    const payload = {
      id: deselectedIds, // 👈 ab ye unselected/deselected IDs jayengi
    };

    try {
      const response = await deleteData(payload).unwrap();
  
      if (response.status) {
        toast.success(response.message);
        onClose();
      } else {
        toast.error(response.message);
        return;
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      if (error?.data?.message) {
        alert(`Submission failed: ${error.data.message}`);
      }
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
      ariaHideApp={false}
    >
      <div style={{ minWidth: "500px", padding: "20px" }}>
        <h2
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "block",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
            padding: "10px 0",
          }}
        >
          Remove Notice
        </h2>

        {/* Notice Dropdown */}
        <label
          style={{
            fontSize: "20px",
            margin: "20px 0px 6px",
            display: "block",
            fontWeight: "bolder",
          }}
        >
          Select Notice
        </label>
        <Select
          options={noticeListData.map((notice) => ({
            value: notice.id,
            label: notice.title,
          }))}
          value={selectedNotice}
          onChange={handleNoticeChange}
          placeholder="Select Notice"
          className="mb-4"
          isClearable
        />

        {/* Consultant Dropdown */}
        <label
          style={{
            fontSize: "20px",
            marginBottom: "6px",
            display: "block",
            fontWeight: "bolder",
          }}
        >
          Select Consultants
        </label>
        <Select
          isMulti
          options={options}
          value={selectedConsultants}
          onChange={setSelectedConsultants}
          placeholder="Select Consultants"
          components={{
            Option: CustomOption,
            Menu: CustomMenu,
          }}
          hideSelectedOptions={false}
          closeMenuOnSelect={false}
          styles={{
            control: (provided) => ({
              ...provided,
              minHeight: "44px",
            }),
            menu: (provided) => ({
              ...provided,
              zIndex: 9999,
            }),
          }}
          isClearable={false}
          isDisabled={!selectedNotice} // 🚫 disable if no notice selected
        />

        {/* Submit & Back */}
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button
            className="fifthButton"
            style={{ marginRight: "10px", backgroundColor: "green" }}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          <button className="fifthButton" style={{}} onClick={onClose}>
            Back
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default UnAssignConsultantNotice;
