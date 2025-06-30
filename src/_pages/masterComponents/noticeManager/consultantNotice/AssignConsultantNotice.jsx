import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Select, { components } from "react-select";
import { toast } from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  useGetConsultantListQuery,
  useGetNoticeListQuery,
  useCreateAssigneConsultantNoticeMutation,
  useGetConsultantAssignedNoticeListQuery,
} from "../../../../_store/api";

const consultantTypes = [
  { label: "All", value: 0 },
  { label: "Astrologer", value: 1 },
  { label: "Coach", value: 2 },
  { label: "Listener", value: 3 },
];

const AssignConsultantNotice = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState(0);
  const [selectedConsultants, setSelectedConsultants] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [options, setOptions] = useState([]);
  const [noticeListData, setNoticeListData] = useState([]);

  const { data: fetchData } = useGetConsultantListQuery({ type: selectedType });
  const { data: noticeList } = useGetNoticeListQuery();
  const { data: assignedNotice } = useGetConsultantAssignedNoticeListQuery({});
  const [createData, { isLoading }] =
    useCreateAssigneConsultantNoticeMutation();

  const [formData, setFormData] = useState({
    description: "",
  });

  // Custom Option Component with Checkbox
  const CustomOption = ({
    innerProps,
    label,
    isSelected,
    innerRef,
    ...rest
  }) => {
    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          backgroundColor: isSelected ? "#f0f0f0" : "white",
          ":hover": {
            backgroundColor: "#f0f0f0",
          },
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
  };

  // Custom Menu with Select All option
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
          style={{
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            backgroundColor: "#f0f0f0",
            fontWeight: "bold",
            borderBottom: "1px solid #e0e0e0",
          }}
          onClick={handleSelectAll}
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

  const handleDescriptionChange = (html) => {
    setFormData((prevData) => ({ ...prevData, description: html }));
  };

  useEffect(() => {
    if (noticeList && noticeList?.data) {
      setNoticeListData(noticeList?.data);
      const notice = noticeList.data; // Default to first notice
      if (notice) {
        setSelectedNotice({
          value: notice.id,
          label: notice.title,
        });
        setFormData({ description: notice.description });
      }
    }
  }, [noticeList]);

  useEffect(() => {
    console.log("fetchData?.data", fetchData?.data);
    if (fetchData?.data) {
      const filtered = fetchData.data.map((item) => ({
        value: item.id,
        label: `${item.id} - ${item.full_name || item.first_name || "N/A"}`,
      }));
      setOptions(filtered);

      console.log("filtered", filtered);
    }
  }, [fetchData, assignedNotice, selectedType]);

  const handleNoticeChange = (selectedOption) => {
    setSelectedNotice(selectedOption);
    if (selectedOption) {
      const notice = noticeListData.find(
        (item) => item.id === selectedOption.value
      );
      if (notice) {
        setFormData({ description: notice.description });
      }
    }
  };

  const handleSubmit = async () => {
    const consultantIds = selectedConsultants.map((c) => c.value);
    if (!consultantIds.length || !selectedNotice) {
      toast.error("Please fill all required fields");
      return;
    }

    const payload = {
      notice_id: selectedNotice.value,
      consultant_ids: consultantIds,
      description: formData.description,
      type: selectedType,
    };

    try {
      const response = await createData(payload).unwrap();

      if (response.status) {
        toast.success(response.message);
        onClose();
      } else {
        toast.error(response.message);
        return;
      }
    } catch (error) {
      toast.error(error?.data?.message || "Submission failed");
    }
  };

  // Quill modules and formats configuration
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "script",
    "indent",
    "direction",
    "color",
    "background",
    "font",
    "align",
    "link",
    "image",
    "video",
  ];

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
          Send Notice
        </h2>

        {/* Consultant Type Filter */}
        <div className="ProfileData-checklist">
          {consultantTypes.map((type) => (
            <label key={type.value} className="input-group-options">
              <input
                type="radio"
                checked={selectedType === type.value}
                onChange={() => setSelectedType(type.value)}
                className="input-group-radio"
              />
              {type.label}
            </label>
          ))}
        </div>

        {/* Consultant Select */}
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
            // MultiValue: () => null,
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
        />

        {/* Notice Select */}
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
        />

        {/* Description */}
        <div
          className="input-container"
          style={{ width: "unset", marginTop: "20px" }}
        >
          <label>Description</label>
          <ReactQuill
            theme="snow"
            value={formData.description}
            onChange={handleDescriptionChange}
            modules={quillModules}
            formats={quillFormats}
            style={{ minHeight: "400px", marginBottom: "50px" }}
            placeholder="Enter Notice Description here..."
          />
        </div>

        {/* Submit Button */}
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button
            className="fifthButton"
            style={{ marginRight: "10px" }}
            onClick={onClose}
          >
            Back
          </button>
          <button
            className="fifthButton"
            style={{ backgroundColor: "green" }}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default AssignConsultantNotice;
