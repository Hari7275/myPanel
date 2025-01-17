import React, { useState, useEffect } from "react";
import {
  useCreateDatingMutation,
  useGetDatingListQuery,
} from "../../../_store/api";
import ReactModal from "react-modal";
import { UpdateInputField } from "../../../_components/ui/inputForm";

const AddDatingProducts = ({ isOpen, onClose }) => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    currency: "INR",
    price: "",
    type: "",
    feature_id: "",
    productKey: "",
    productKey: "",
    status: "active",
  });
  const { data: fetchData } = useGetDatingListQuery();
  const [createProducts, { isLoading }] = useCreateDatingMutation();

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
      type: formData.type,
      feature_id: Number(formData?.feature_id),
      productKey: formData?.productKey,
      status: formData?.status,
    };
    try {
      await createProducts({ body: newProduct });
      onClose();
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
          Add Dating Product
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
            label="Product Key"
            type="text"
            name="productKey"
            id="productKey"
            value={formData.productKey}
            onChange={handleChange}
            placeholder="Product Key"
          />
        </div>

        <div style={{ display: "flex" }}>
          <div className="input-container" style={{ marginRight: "20px" }}>
            <label htmlFor="feature_id">Feature Name</label>
            <select
              id="feature_id"
              name="feature_id"
              value={formData?.feature_id}
              onChange={handleChange}
              className="info-input"
              style={{
                width: "100%",
                height: "56px",
                borderRadius: "6px",
              }}
            >
              <option value="">Select Feature Name</option>
              {data
                ?.filter((item) => item?.feature) // Filter out items where item?.feature is null or undefined
                .map((item, index) => (
                  <option key={index} value={item?.feature?.id}>
                    {`${item?.feature?.feature_key}  `}
                  </option>
                ))}
            </select>
          </div>
          <div className="input-container" style={{ marginRight: "20px" }}>
            <label htmlFor="type">Product Duration</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="info-input"
              style={{
                width: "100%",
                height: "56px",
                borderRadius: "6px",
              }}
            >
              <option value="">Select Product Duration</option>
              <option value="yearly">Yearly</option>
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
              <option value="oneday">OneDay</option>
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

export default AddDatingProducts;
