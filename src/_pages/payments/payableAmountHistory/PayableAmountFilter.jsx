import React, { useState, useEffect, useRef } from "react";

const PayableAmountFilter = ({
  isOpen,
  onClose,
  onApplyFilter,
  initialFilters = {},
}) => {
  // Initialize filters with saved values or defaults
  const [filters, setFilters] = useState({
    startDate: initialFilters.startDate || "",
    endDate: initialFilters.endDate || "",
  });

  const popoverRef = useRef(null);

  // Handle date change
  const handleDateChange = (dateType, value) => {
    setFilters((prev) => ({
      ...prev,
      [dateType]: value,
    }));
  };

  // // Handle dropdown change
  // const handleDropdownChange = (filterType, value) => {
  //   setFilters((prev) => ({
  //     ...prev,
  //     [filterType]: value,
  //   }));
  // };

  // Handle apply filter
  const handleApply = () => {
    // Validate date range
    if (
      filters.startDate &&
      filters.endDate &&
      filters.startDate > filters.endDate
    ) {
      alert("Start date cannot be after end date");
      return;
    }

    onApplyFilter(filters);
    onClose();
  };

  // Handle reset
  const handleReset = () => {
    setFilters({
      startDate: "",
      endDate: "",
    });
  };

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        !event.target.closest(".filter-button-wrapper")
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div onClick={onClose} />
      <div className="filter-popover active" ref={popoverRef}>
        <div className="filter-content">
          {/* Date Range Section */}
          <div className="filter-section">
            <div className="filter-section-title">Date Range</div>
            <div className="date-inputs">
              <div className="date-input-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  className="date-input"
                  value={filters.startDate}
                  onChange={(e) =>
                    handleDateChange("startDate", e.target.value)
                  }
                />
              </div>
              <div className="date-input-group">
                <label htmlFor="endDate">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  className="date-input"
                  value={filters.endDate}
                  onChange={(e) => handleDateChange("endDate", e.target.value)}
                  min={filters.startDate}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="filter-actions">
            <button className="apply-button" onClick={handleApply}>
              Apply Filters
            </button>
            <button className="reset-button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayableAmountFilter;
