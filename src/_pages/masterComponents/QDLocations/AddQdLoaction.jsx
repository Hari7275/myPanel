import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { UpdateInputField } from "../../../_components/ui/inputForm";
import {
  useCreateqdLoactionListMutation,
  useGetCityLoactionListQuery,
} from "../../../_store/api";
import Select from "react-select";

const AddQdLoaction = ({ isOpen, onClose }) => {
  const [data, setData] = useState([]);
  const [cityName, setCityName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [formData, setFormData] = useState({
    location_id: "",
    location_name: "",
    image: null,
  });
  const [showError, setError] = useState("");

  const [createCard, { isLoading }] = useCreateqdLoactionListMutation();
  const { data: fetchData } = useGetCityLoactionListQuery({
    keyword: locationName,
  });

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data || []);
    }
  }, [fetchData]);

  const cityOptions = data.map((city) => ({
    label: city?.city_name,
    value: city?.id,
  }));

  const handleChangeCityName = (e) => {
    const value = e.target.value;
    setCityName(value);
    if (value.length >= 3) {
      setLocationName(value);
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "image") {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0],
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleCitySelect = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      location_id: selectedOption?.value || "",
      location_name: selectedOption?.label || "",
    }));
  };

  const handleSubmit = async () => {
    if (!formData.location_id || !formData.location_name) {
      setError("Please select a valid city and location.");
      return;
    }

    const form = new FormData();
    form.append("location_id", formData.location_id);
    form.append("location_name", formData.location_name);

    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      const response = await createCard(form);

      if (response?.error) {
        setError(response?.error?.data?.message || "An error occurred.");
      } else if (response?.data?.status === false) {
        setError(response?.data?.message);
      } else {
        setError("");
        onClose();
      }
    } catch (error) {
      setError("Failed to add new location.");
    }
  };

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div style={{ width: "400px" }}>
        <h2
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "block",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
          }}
        >
          Add Trip Location
        </h2>

        <UpdateInputField
          label="City Name"
          type="text"
          name="location_name"
          placeholder="City Name"
          value={cityName}
          onChange={handleChangeCityName}
        />

        <div>
          <label htmlFor="categories">City</label>
          <Select options={cityOptions} onChange={handleCitySelect} />
        </div>

        <UpdateInputField
          label="Location Id"
          type="text"
          id="location_id"
          name="location_id"
          placeholder="Location Id"
          value={formData.location_id}
          readOnly
          disabled
        />

        <UpdateInputField
          label="Location Name"
          type="text"
          id="location_name"
          name="location_name"
          placeholder="Location Name"
          value={formData.location_name}
          readOnly
          disabled
        />

        <UpdateInputField
          label="Image"
          type="file"
          id="image"
          name="image"
          onChange={handleChange}
        />

        {showError && <p style={{ color: "red" }}>{showError}</p>}

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

export default AddQdLoaction;
