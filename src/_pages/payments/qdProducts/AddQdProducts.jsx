import React, { useState, useEffect } from "react";
import {
  useCreateQdProductsMutation,
  useGetDatingListQuery,
} from "../../../_store/api";
import ReactModal from "react-modal";
import { UpdateInputField } from "../../../_components/ui/inputForm";
import toast from "react-hot-toast";

const AddQdProducts = ({ isOpen, onClose }) => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    currency: "INR",
    price: "",
    device_type: null,
    product_key: "",
    status: "active",
  });
  const { data: fetchData } = useGetDatingListQuery();
  const [createProducts, { isLoading }] = useCreateQdProductsMutation();

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data);
    }
  }, [fetchData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    const newProduct = {
      name: formData?.name,
      description: formData?.description,
      currency: formData?.currency,
      price: formData?.price,
      device_type: Number(formData.device_type),
      product_key: String(formData?.product_key),

      status: formData?.status,
    };
    try {
      const response = await createProducts({ body: newProduct });
      console.log("response", response);

      if (response.data.status == true) {
        toast.success(response.data.message);
        onClose();
      } else {
        toast.error(response.data.message);
        return;
      }
    } catch (error) {
      console.log("failed to add products ", error);
    }
  };

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div style={{ width: "500px" }}>
        <h2
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "block",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
          }}
        >
          Add QD Product
        </h2>
        <div style={{ display: "flex" }}>
          <UpdateInputField
            label="Feature Name"
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <UpdateInputField
            label="Description"
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
        </div>

        <div style={{ display: "flex" }}>
          <UpdateInputField
            label="Price"
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
          />

          <UpdateInputField
            label="Product key"
            type="text"
            name="product_key"
            id="product_key"
            value={formData.product_key}
            onChange={handleChange}
            placeholder="product_key"
          />
        </div>

        <div style={{ display: "flex" }}>
          <div className="input-container" style={{ marginRight: "20px" }}>
            <label htmlFor="currency">currency</label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="info-input"
              style={{
                width: "100%",
                height: "56px",
                borderRadius: "6px",
              }}
            >
              <option value="">Select currency</option>
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </div>

          <div className="input-container" style={{ marginRight: "20px" }}>
            <label htmlFor="device_type">Device Type</label>
            <select
              id="device_type"
              name="device_type"
              value={formData.device_type}
              onChange={handleChange}
              className="info-input"
              style={{
                width: "100%",
                height: "56px",
                borderRadius: "6px",
              }}
            >
              <option value="">Select device type</option>
              <option value={1}>Andriod</option>
              <option value={2}>IOS</option>
            </select>
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="info-input"
            style={{
              width: "100%",
              height: "56px",
              borderRadius: "6px",
            }}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
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

export default AddQdProducts;
