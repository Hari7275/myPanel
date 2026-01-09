import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ReactModal from "react-modal";
import { UpdateInputField } from "../../_components/ui/inputForm";
import {
  useUpdateConsultantPriceChartMutation,
  useGetConsultantsNewPriceQuery,
} from "../../_store/api";

import { useUpdateConsultantNewPriceChartMutation } from "../../_store/api";
import toast from "react-hot-toast";

const EditconsultantPrice = ({ isOpen, onClose, selectedRow }) => {
  const { consultantId } = useParams();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const consultantCateg = params.get("currency_category");

  // Fetch all price data to get all category prices
  const { data: allPricesData } = useGetConsultantsNewPriceQuery(consultantId);

  const [formData, setFormData] = useState({
    price_category_a: "",
    price_category_b: "",
    price_category_c: "",
    price_category_d: "",
    price_category_e: "",
    price_category_f: "",
    consultant_category: "",
    id: null,
  });

  // Category order for comparison
  const categoryOrder = ["A", "B", "C", "D", "E", "F"];

  // Prefill formData with all category prices
  useEffect(() => {
    if (allPricesData?.data && consultantCateg && selectedRow) {
      const currentCategoryIndex = categoryOrder.indexOf(
        consultantCateg.toUpperCase()
      );

      // Extract prices for each category from the data array
      const categoryPrices = {};
      allPricesData.data.forEach((item) => {
        if (item.service_type === selectedRow.service_type) {
          const categoryKey = `price_category_${item.user_category.toLowerCase()}`;
          categoryPrices[categoryKey] =
            Number(item.discount_price) || Number(item.price_per_minute) || "";
        }
      });

      // Get the current category price
      const currentCategoryKey = `price_category_${consultantCateg.toLowerCase()}`;
      const currentCategoryPrice = categoryPrices[currentCategoryKey] || "";

      // Initialize form data with existing prices
      const initialData = {
        price_category_a: categoryPrices.price_category_a || "",
        price_category_b: categoryPrices.price_category_b || "",
        price_category_c: categoryPrices.price_category_c || "",
        price_category_d: categoryPrices.price_category_d || "",
        price_category_e: categoryPrices.price_category_e || "",
        price_category_f: categoryPrices.price_category_f || "",
        consultant_category: consultantCateg.toUpperCase(),
        id: selectedRow?.id,
      };

      // Set previous categories equal to current category price (only within same currency)
      for (let i = 0; i < currentCategoryIndex; i++) {
        const categoryKey = `price_category_${categoryOrder[i].toLowerCase()}`;
        initialData[categoryKey] = currentCategoryPrice;
      }

      setFormData(initialData);
    }
  }, [allPricesData, selectedRow, consultantCateg]);

  const [UpdatePricePlan, { isLoading }] =
    useUpdateConsultantNewPriceChartMutation();

  const handleChange = (event) => {
    const { name, value } = event?.target;

    // If changing the current category, auto-update previous categories
    const currentCategoryKey = `price_category_${consultantCateg.toLowerCase()}`;
    if (name === currentCategoryKey) {
      const currentCategoryIndex = categoryOrder.indexOf(
        consultantCateg.toUpperCase()
      );
      const updatedData = { ...formData, [name]: value };

      // Auto-update all previous categories (including A to current) to match current category
      for (let i = 0; i < currentCategoryIndex; i++) {
        const categoryKey = `price_category_${categoryOrder[i].toLowerCase()}`;
        updatedData[categoryKey] = value;
      }

      setFormData(updatedData);
    } else {
      // For other categories (after current), allow manual editing
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Validate prices within the same currency zone
  const validatePrices = () => {
    const currentCategoryIndex = categoryOrder.indexOf(
      consultantCateg.toUpperCase()
    );
    const currentCategoryPrice = Number(
      formData[`price_category_${consultantCateg.toLowerCase()}`]
    );

    // Validate that categories after the current category are greater or equal
    for (let i = currentCategoryIndex + 1; i < categoryOrder.length; i++) {
      const categoryKey = `price_category_${categoryOrder[i].toLowerCase()}`;
      const categoryPrice = Number(formData[categoryKey]);

      if (categoryPrice && categoryPrice < currentCategoryPrice) {
        toast.error(
          `Category ${
            categoryOrder[i]
          } price cannot be less than current category ${consultantCateg.toUpperCase()} price`
        );
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    // Validate prices before submission
    if (!validatePrices()) {
      return;
    }

    const payload = {
      price_category_a: Number(formData?.price_category_a) || 0,
      price_category_b: Number(formData?.price_category_b) || 0,
      price_category_c: Number(formData?.price_category_c) || 0,
      price_category_d: Number(formData?.price_category_d) || 0,
      price_category_e: Number(formData?.price_category_e) || 0,
      price_category_f: Number(formData?.price_category_f) || 0,
      consultant_category: formData?.consultant_category,
    };

    try {
      const response = await UpdatePricePlan({
        id: formData?.id,
        body: payload,
      });

      if (response?.data?.status == false) {
        toast.error(response?.data?.message);
        console.log("response?.data?.message", response?.data?.message);
        return;
      }

      if (response?.data?.status === true) {
        toast.success(response?.data?.message);
        onClose();
      }

      console.log("Response from API:", response);
    } catch (error) {
      console.error("Error updating price plan:", error);
      toast.error("Error updating price plan");
    }
  };

  // Helper function to get currency symbol
  const getCurrencySymbol = (category) => {
    return category === "A" ? "₹" : "$";
  };

  // Helper function to check if field should be editable
  const isFieldEditable = (category) => {
    const currentCategoryIndex = categoryOrder.indexOf(
      consultantCateg?.toUpperCase()
    );
    const fieldCategoryIndex = categoryOrder.indexOf(category);

    // Current category and categories after it are editable
    return fieldCategoryIndex >= currentCategoryIndex;
  };

  // Helper function to check if field should be read-only (auto-synced)
  const isFieldAutoSynced = (category) => {
    const currentCategoryIndex = categoryOrder.indexOf(
      consultantCateg?.toUpperCase()
    );
    const fieldCategoryIndex = categoryOrder.indexOf(category);

    // All categories before the consultant's current category are auto-synced (disabled)
    return fieldCategoryIndex < currentCategoryIndex;
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
            padding: "10px",
          }}
        >
          Update Price Plan
          <div
            style={{ fontSize: "14px", marginTop: "5px", fontWeight: "normal" }}
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
            {consultantCateg?.toUpperCase() === "A"
              ? "Category A in INR (₹), Categories B-F in USD ($)"
              : `Categories before ${consultantCateg?.toUpperCase()} (except A) will auto-sync`}
          </div>
        </h2>

        <UpdateInputField
          label={`Category A Price (${getCurrencySymbol("A")}) ${
            isFieldAutoSynced("A") ? "(Auto-synced)" : ""
          }`}
          type="number"
          name="price_category_a"
          value={formData?.price_category_a}
          onChange={handleChange}
          placeholder="Category A Price"
          disabled={isFieldAutoSynced("A")}
        />

        <UpdateInputField
          label={`Category B Price (${getCurrencySymbol("B")}) ${
            isFieldAutoSynced("B") ? "(Auto-synced)" : ""
          }`}
          type="number"
          name="price_category_b"
          value={formData?.price_category_b}
          onChange={handleChange}
          placeholder="Category B Price"
          disabled={isFieldAutoSynced("B")}
        />

        <UpdateInputField
          label={`Category C Price (${getCurrencySymbol("C")}) ${
            isFieldAutoSynced("C") ? "(Auto-synced)" : ""
          }`}
          type="number"
          name="price_category_c"
          value={formData?.price_category_c}
          onChange={handleChange}
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
          value={formData?.price_category_d}
          onChange={handleChange}
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
          value={formData?.price_category_e}
          onChange={handleChange}
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
          value={formData?.price_category_f}
          onChange={handleChange}
          placeholder="Category F Price"
          disabled={isFieldAutoSynced("F")}
        />

        <div style={{ marginTop: "30px" }}>
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

export default EditconsultantPrice;
