import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { UpdateInputField } from "../../_components/ui/inputForm";
import {
  useUpdateConsultantNewPriceChangeRequestMutation,
  useGetConsultantsNewPriceQuery,
} from "../../_store/api";
import { useParams, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const EditPriceStatus = ({ isOpen, onClose, selectedRow }) => {
  const { consultantId } = useParams();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const consultantCateg = params.get("currency_category");

  // Fetch all price data to get all category prices
  const { data: allPricesData } = useGetConsultantsNewPriceQuery(consultantId);

  const [statusFormData, setStatusFormData] = useState("");
  const [priceFormData, setPriceFormData] = useState({
    price_category_a: "",
    price_category_b: "",
    price_category_c: "",
    price_category_d: "",
    price_category_e: "",
    price_category_f: "",
    consultant_category: "",
  });

  const [updatePriceStatus, { isLoading: isUpdating, error: updateError }] =
    useUpdateConsultantNewPriceChangeRequestMutation();

  // Category order for comparison
  const categoryOrder = ["A", "B", "C", "D", "E", "F"];

  // Populate the form data when the modal opens
  useEffect(() => {
    if (isOpen && selectedRow) {
      setStatusFormData(selectedRow.status);

      // Initialize price form data using base_price_per_minute from selectedRow
      if (consultantCateg) {
        const currentCategoryIndex = categoryOrder.indexOf(
          consultantCateg.toUpperCase()
        );

        // Get the requested price from selectedRow
        const requestedPrice = Number(selectedRow.base_price_per_minute) || "";

        // Initialize form data with existing prices from allPricesData
        const initialData = {
          price_category_a: "",
          price_category_b: "",
          price_category_c: "",
          price_category_d: "",
          price_category_e: "",
          price_category_f: "",
          consultant_category: consultantCateg.toUpperCase(),
        };

        // If we have allPricesData, populate existing prices for categories after current
        if (allPricesData?.data) {
          allPricesData.data.forEach((item) => {
            if (item.service_type === selectedRow.service_type) {
              const categoryKey = `price_category_${item.user_category.toLowerCase()}`;
              const itemCategoryIndex = categoryOrder.indexOf(
                item.user_category.toUpperCase()
              );

              // Only populate prices for categories after the consultant's category
              if (itemCategoryIndex > currentCategoryIndex) {
                initialData[categoryKey] =
                  Number(item.discount_price) ||
                  Number(item.price_per_minute) ||
                  "";
              }
            }
          });
        }

        // Set the current category and all previous categories to the requested price
        for (let i = 0; i <= currentCategoryIndex; i++) {
          const categoryKey = `price_category_${categoryOrder[i].toLowerCase()}`;
          initialData[categoryKey] = requestedPrice;
        }

        setPriceFormData(initialData);
      }
    }
  }, [isOpen, selectedRow, allPricesData, consultantCateg]);

  const handleStatusChange = (e) => {
    setStatusFormData(e.target.value);
  };

  const handlePriceChange = (event) => {
    const { name, value } = event?.target;

    // If changing the current category, auto-update previous categories
    const currentCategoryKey = `price_category_${consultantCateg.toLowerCase()}`;
    if (name === currentCategoryKey) {
      const currentCategoryIndex = categoryOrder.indexOf(
        consultantCateg.toUpperCase()
      );
      const updatedData = { ...priceFormData, [name]: value };

      // Auto-update all previous categories (including A to current) to match current category
      for (let i = 0; i < currentCategoryIndex; i++) {
        const categoryKey = `price_category_${categoryOrder[i].toLowerCase()}`;
        updatedData[categoryKey] = value;
      }

      setPriceFormData(updatedData);
    } else {
      // For other categories (after current), allow manual editing
      setPriceFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Validate prices within the same currency zone
  const validatePrices = () => {
    const currentCategoryIndex = categoryOrder.indexOf(
      consultantCateg.toUpperCase()
    );
    const currentCategoryPrice = Number(
      priceFormData[`price_category_${consultantCateg.toLowerCase()}`]
    );

    // Validate that categories after the current category are greater or equal
    for (let i = currentCategoryIndex + 1; i < categoryOrder.length; i++) {
      const categoryKey = `price_category_${categoryOrder[i].toLowerCase()}`;
      const categoryPrice = Number(priceFormData[categoryKey]);

      if (categoryPrice && categoryPrice < currentCategoryPrice) {
        toast.error(
          `Category ${categoryOrder[i]} price cannot be less than current category ${consultantCateg.toUpperCase()} price`
        );
        return false;
      }
    }

    return true;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!statusFormData || statusFormData === "") {
      toast.error("Please select a status");
      return;
    }

    const isApproved = Number(statusFormData) === 5;

    // Validate prices if status is approved
    if (isApproved && !validatePrices()) {
      return;
    }

    try {
      let payload = {
        status: Number(statusFormData),
        id: selectedRow?.id,
      };

      // Add price data to payload body only if status is approved
      if (isApproved) {
        payload.body = {
          price_category_a: Number(priceFormData?.price_category_a) || 0,
          price_category_b: Number(priceFormData?.price_category_b) || 0,
          price_category_c: Number(priceFormData?.price_category_c) || 0,
          price_category_d: Number(priceFormData?.price_category_d) || 0,
          price_category_e: Number(priceFormData?.price_category_e) || 0,
          price_category_f: Number(priceFormData?.price_category_f) || 0,
          consultant_category: priceFormData?.consultant_category,
        };
      }

      const response = await updatePriceStatus(payload).unwrap();

      console.log("response", response);

      // Show success or error message from response
      if (response.status === true || response.status === "true") {
        toast.success(response.message || "Status updated successfully");
        setStatusFormData("");
        setPriceFormData({
          price_category_a: "",
          price_category_b: "",
          price_category_c: "",
          price_category_d: "",
          price_category_e: "",
          price_category_f: "",
          consultant_category: "",
        });
        onClose();
      } else {
        toast.error(response.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      // Show error message from API response if available
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to update status. Please try again.";
      toast.error(errorMessage);
    }
  };

  // Helper function to get currency symbol
  const getCurrencySymbol = (category) => {
    return category === "A" ? "₹" : "$";
  };

  // Helper function to check if field should be auto-synced (disabled)
  const isFieldAutoSynced = (category) => {
    const currentCategoryIndex = categoryOrder.indexOf(
      consultantCateg?.toUpperCase()
    );
    const fieldCategoryIndex = categoryOrder.indexOf(category);

    // All categories before the consultant's current category are auto-synced (disabled)
    return fieldCategoryIndex < currentCategoryIndex;
  };

  const isApproved = Number(statusFormData) === 5;

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
            padding: "10px",
          }}
        >
          Edit Price Status
          {isApproved && consultantCateg && (
            <>
              <div
                style={{
                  fontSize: "14px",
                  marginTop: "5px",
                  fontWeight: "normal",
                }}
              >
                Current Consultant Category:{" "}
                <strong>{consultantCateg?.toUpperCase()}</strong>
              </div>
              <div
                style={{
                  fontSize: "12px",
                  marginTop: "3px",
                  fontWeight: "normal",
                  color: "#666",
                }}
              >
                Categories A to {consultantCateg?.toUpperCase()} will auto-sync with requested price. Categories after {consultantCateg?.toUpperCase()} are manually editable.
              </div>
            </>
          )}
        </h2>

        <form
          className="simple-form"
          noValidate
          autoComplete="off"
          onSubmit={handleSave}
        >
          <div className="input-container">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={statusFormData}
              onChange={handleStatusChange}
              className="userProfile-input-field"
              aria-describedby="status-desc"
            >
              <option value="">Select Status</option>
              <option value="3">Rejected</option>
              <option value="5">Approved</option>
            </select>
            <p style={{ marginTop: "10px" }}>Select a status for the User.</p>
          </div>

          {/* Show price fields only when Approved is selected */}
          {isApproved && (
            <div style={{ marginTop: "20px" }}>
              <h3 style={{ marginBottom: "15px", fontSize: "16px" }}>
                Update Price Categories
              </h3>

              <UpdateInputField
                label={`Category A Price (${getCurrencySymbol("A")}) ${
                  isFieldAutoSynced("A") ? "(Auto-synced)" : ""
                }`}
                type="number"
                name="price_category_a"
                value={priceFormData?.price_category_a}
                onChange={handlePriceChange}
                placeholder="Category A Price"
                disabled={isFieldAutoSynced("A")}
              />

              <UpdateInputField
                label={`Category B Price (${getCurrencySymbol("B")}) ${
                  isFieldAutoSynced("B") ? "(Auto-synced)" : ""
                }`}
                type="number"
                name="price_category_b"
                value={priceFormData?.price_category_b}
                onChange={handlePriceChange}
                placeholder="Category B Price"
                disabled={isFieldAutoSynced("B")}
              />

              <UpdateInputField
                label={`Category C Price (${getCurrencySymbol("C")}) ${
                  isFieldAutoSynced("C") ? "(Auto-synced)" : ""
                }`}
                type="number"
                name="price_category_c"
                value={priceFormData?.price_category_c}
                onChange={handlePriceChange}
                placeholder="Category C Price"
                disabled={isFieldAutoSynced("C")}
              />

              <UpdateInputField
                label={`Category D Price (${getCurrencySymbol("D")}) ${
                  consultantCateg?.toUpperCase() === "D"
                    ? "(Current)"
                    : isFieldAutoSynced("D")
                    ? "(Auto-synced)"
                    : ""
                }`}
                type="number"
                name="price_category_d"
                value={priceFormData?.price_category_d}
                onChange={handlePriceChange}
                placeholder="Category D Price"
                disabled={isFieldAutoSynced("D")}
              />

              <UpdateInputField
                label={`Category E Price (${getCurrencySymbol("E")}) ${
                  consultantCateg?.toUpperCase() === "E"
                    ? "(Current)"
                    : isFieldAutoSynced("E")
                    ? "(Auto-synced)"
                    : ""
                }`}
                type="number"
                name="price_category_e"
                value={priceFormData?.price_category_e}
                onChange={handlePriceChange}
                placeholder="Category E Price"
                disabled={isFieldAutoSynced("E")}
              />

              <UpdateInputField
                label={`Category F Price (${getCurrencySymbol("F")}) ${
                  consultantCateg?.toUpperCase() === "F"
                    ? "(Current)"
                    : isFieldAutoSynced("F")
                    ? "(Auto-synced)"
                    : ""
                }`}
                type="number"
                name="price_category_f"
                value={priceFormData?.price_category_f}
                onChange={handlePriceChange}
                placeholder="Category F Price"
                disabled={isFieldAutoSynced("F")}
              />
            </div>
          )}

          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              type="submit"
              className="fifthButton"
              style={{ marginRight: "10px" }}
              disabled={isUpdating}
              aria-label="Save changes"
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="fifthButton"
              style={{ background: "red", marginLeft: "10px" }}
              onClick={() => {
                setStatusFormData("");
                setPriceFormData({
                  price_category_a: "",
                  price_category_b: "",
                  price_category_c: "",
                  price_category_d: "",
                  price_category_e: "",
                  price_category_f: "",
                  consultant_category: "",
                });
                onClose();
              }}
              disabled={isUpdating}
              aria-label="Cancel changes"
            >
              Cancel
            </button>
          </div>
        </form>
        {updateError && (
          <p style={{ color: "red" }}>
            {updateError.data?.message || "Failed to update status."}
          </p>
        )}
      </div>
    </ReactModal>
  );
};

export default EditPriceStatus;
