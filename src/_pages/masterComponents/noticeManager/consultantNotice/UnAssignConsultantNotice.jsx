import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Select from "react-select";
import { toast } from "react-hot-toast";

import {
  useGetConsultantListQuery,
  useGetNoticeListQuery,
  useCreateAssigneConsultantNoticeMutation,
  useGetConsultantAssignedNoticeListQuery,
} from "../../../../_store/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const consultantTypes = [
  { label: "All", value: "all" },
  { label: "Astrologer", value: "astrologer" },
  { label: "Coach", value: "coach" },
  { label: "Listener", value: "listener" },
];

const UnAssignConsultantNotice = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedConsultants, setSelectedConsultants] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const [options, setOptions] = useState([]);
  const [noticeListData, setNoticeListData] = useState([]);
  const { data: fetchData } = useGetConsultantListQuery();
  const { data: noticeList } = useGetNoticeListQuery();
  const { data: assignedNotice } = useGetConsultantAssignedNoticeListQuery({});
  const [createData, { isLoading }] =
    useCreateAssigneConsultantNoticeMutation();

  const [formData, setFormData] = useState({
    description: "",
  });

  const handleDescriptionChange = (html) => {
    setFormData((prevData) => ({ ...prevData, description: html }));
  };

  useEffect(() => {
    if (noticeList && noticeList?.data) {
      setNoticeListData(noticeList?.data);
      // Set the initial selected notice to the passed selectedRow

      const notice = noticeList.data;
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
    if (fetchData?.data && assignedNotice?.data) {
      const assignedIds = assignedNotice.data.map((item) => item.consultant_id);
      const filtered = fetchData.data
        .filter((item) => !assignedIds.includes(item.id))
        .filter((item) =>
          selectedType === "all"
            ? true
            : item?.type?.toLowerCase() === selectedType
        )
        .map((item) => ({
          value: item.id,
          label: `${item.id} - ${item.full_name || item.first_name || "N/A"}`,
        }));
      setOptions(filtered);
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
    };

    try {
      await createData(payload).unwrap();
      toast.success("Assigned successfully!");
      onClose();
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
          placeholder="Select"
        />

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

export default UnAssignConsultantNotice;
