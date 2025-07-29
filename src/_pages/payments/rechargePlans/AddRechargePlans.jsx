import React, { useState, useEffect } from "react";
import {
  useCreateRechargeMutation,
  useGetCouponsListQuery,
} from "../../../_store/api";
import ReactModal from "react-modal";
import { UpdateInputField } from "../../../_components/ui/inputForm";

const AddRechargePlans = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    plan_name: "",
    discount: "",
    currency: "INR",
    price: "",
    status: "active",
    // coupon_id: "",
    code: "",
    id: "",

    promotional_heading: "",
  });

  const [data, setData] = useState([]);

  const [createRecharge, { isLoading }] = useCreateRechargeMutation();
  const { data: fetchData, error } = useGetCouponsListQuery();

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data);
    }
  }, [fetchData]);

  console.log("data", data);

  const handleChange = (event) => {
    const { name, value } = event?.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    const newRecharge = {
      plan_name: formData?.plan_name,
      discount: formData?.discount,
      currency: formData?.currency,
      price: formData?.price,
      status: formData?.status,
      // coupon_id: Number(formData?.coupon_id),
      coupon_id: formData?.id,
      promotional_heading: formData?.promotional_heading,
    };

    console.log("new recharge", newRecharge);
    try {
      await createRecharge({ body: newRecharge });

      onClose();
    } catch (error) {
      console.error("Failed to add recharge", error);
    }
  };

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div>
        <h2
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "block",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
          }}
        >
          Add Recharge plan
        </h2>

        <UpdateInputField
          label="Add Recharge"
          type="text"
          name="plan_name"
          value={formData?.plan_name}
          onChange={handleChange}
          placeholder="Plan Name"
        />

        <UpdateInputField
          label="Discount"
          type="number"
          name="discount"
          value={formData?.discount}
          onChange={handleChange}
          placeholder="Discount"
        />

        <UpdateInputField
          label=" Add Price"
          type="number"
          name="price"
          value={formData?.price}
          onChange={handleChange}
          placeholder="Price"
        />

        {/* <UpdateInputField
          label="Add coupon id"
          type="text"
          name="coupon_id"
          value={formData?.coupon_id}
          onChange={handleChange}
          placeholder="coupon id"
        /> */}

        <div className="input-container">
          <label htmlFor="gender">Add coupon id</label>
          <select
            id="id"
            name="id"
            value={formData?.id}
            onChange={handleChange}
            className="info-input"
            style={{
              width: "100%",
              height: "56px",
              borderRadius: "inherit",
            }}
          >
            {data.map((item) => (
              <option key={item?.id} value={item?.id}>
                {item?.code}
              </option>
            ))}
          </select>
        </div>

        <UpdateInputField
          label="Add promotional heading"
          type="text"
          name="promotional_heading"
          value={formData?.promotional_heading}
          onChange={handleChange}
          placeholder="promotional heading"
        />

        <div className="input-container">
          <label htmlFor="gender">Status</label>
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

        <div style={{ marginTop: "30px", display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <button
            className="fifthButton"
            style={{ marginRight: "10px", backgroundColor: "green" }}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          <button
            className="fifthButton"
            style={{}}
            onClick={onClose}
          >
            Back
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default AddRechargePlans;
