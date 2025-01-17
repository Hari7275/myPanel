import React, { useState, useEffect } from "react";
import {
  useCreateSubscriptionMutation,
  useGetSubscriptionListQuery,
} from "../../../_store/api";
import ReactModal from "react-modal";
import { UpdateInputField } from "../../../_components/ui/inputForm";

const AddSubscriptionPlan = ({ isOpen, onClose }) => {
  const [data, setData] = useState([]);

  const [formData, setFormData] = useState({
    display_name: "",
    description: "",
    currency: "INR",
    price: "",
    type: "",
    feature_id: "",
    productKey: "",
    status: "active",
  });

  const [createPlan, { isLoading }] = useCreateSubscriptionMutation();
  const { data: fetchData } = useGetSubscriptionListQuery();

  useEffect(() => {
    if (fetchData) {
      setData(fetchData.data);
    }
  }, [fetchData]);

  const handleChange = (event) => {
    const { name, value } = event?.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    const newPlan = {
      display_name: formData?.display_name,
      description: formData?.description,
      currency: formData?.currency,
      price: formData?.price,
      type: formData?.type,
      feature_id: formData?.feature_id,
      productKey: formData?.productKey,
      status: formData?.status,
    };
    console.log("Adding new subscription plan:", newPlan);

    try {
      await createPlan({ body: newPlan });

      onClose();
    } catch (error) {
      console.error("Failed to add the subscription plan", error);
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
          Add Dating plan
        </h2>

        <div style={{ display: "flex" }}>
          <UpdateInputField
            label="Display Name"
            type="text"
            name="display_name"
            id="display_name"
            value={formData?.display_name}
            onChange={handleChange}
            placeholder="Display Name"
          />
          <UpdateInputField
            label="Description"
            type="text"
            name="description"
            id="description"
            value={formData?.description}
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
            value={formData?.price}
            onChange={handleChange}
            placeholder="Price"
          />

          <UpdateInputField
            label="Product Key"
            type="text"
            name="productKey"
            id="productKey"
            value={formData?.productKey}
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
                borderRadius: "inherit",
              }}
            >
              <option value="">Select Feature Name</option>
              {data.map((item, index) => (
                <option key={index} value={item?.feature.id}>
                  {item.feature?.feature_name}
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
                borderRadius: "inherit",
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
            value={formData?.status}
            onChange={handleChange}
            className="info-input"
            style={{
              width: "100%",
              height: "56px",
              borderRadius: "inherit",
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

export default AddSubscriptionPlan;
