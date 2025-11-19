import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactModal from "react-modal";
import { useUpdateUserInfoMutation } from "../../../_store/api";
import toast from "react-hot-toast";

// Google Maps script loader
const loadGoogleMapsScript = (apiKey) => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

const UpdateUserInfo = ({
  isOpen,
  onClose,
  selectedData,
  googleMapsApiKey = "AIzaSyBJmeMpRqFkqJ1L87Ic-EuvcNP7UDKj4aQ",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    birth_time: "",
    birth_place: "",
    birth_date: "",
    currency_category: "",
    current_address: "",
  });

  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  // Refs for autocomplete inputs
  const birthPlaceRef = useRef(null);
  const currentAddressRef = useRef(null);

  // Refs for autocomplete instances
  const birthPlaceAutocompleteRef = useRef(null);
  const currentAddressAutocompleteRef = useRef(null);

  const [updateInfo, { isLoading: isUpdating }] = useUpdateUserInfoMutation();

  // Format time from HH:MM:SS to HH:MM for display in input
  const formatTimeForDisplay = (timeString) => {
    if (!timeString) return "";

    // If already in HH:MM format, return as is
    if (timeString.match(/^\d{2}:\d{2}$/)) {
      return timeString;
    }

    // If in HH:MM:SS format, remove seconds
    if (timeString.match(/^\d{2}:\d{2}:\d{2}$/)) {
      return timeString.substring(0, 5); // Get HH:MM
    }

    return timeString;
  };

  // Format time from HH:MM to HH:MM:SS for API (24-hour format)
  const formatTimeForAPI = (timeString) => {
    if (!timeString) return "";

    // timeString is in HH:MM format from the time input
    // Just add :00 for seconds
    return `${timeString}:00`;
  };

  // Format date from MM-DD-YY to YYYY-MM-DD for display in input
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";

    // If already in YYYY-MM-DD format, return as is
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return dateString;
    }

    // Parse MM-DD-YY format
    const match = dateString.match(/(\d{2})-(\d{2})-(\d{2})/);
    if (!match) return dateString;

    const [, month, day, year] = match;
    const fullYear = parseInt(year, 10) < 50 ? `20${year}` : `19${year}`;

    return `${fullYear}-${month}-${day}`;
  };

  // Format date from YYYY-MM-DD to MM-DD-YY for API
  const formatDateForAPI = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of year
    return `${month}-${day}-${year}`;
  };

  // Load Google Maps script
  useEffect(() => {
    if (googleMapsApiKey && !googleMapsLoaded) {
      loadGoogleMapsScript(googleMapsApiKey)
        .then(() => {
          setGoogleMapsLoaded(true);
        })
        .catch((error) => {
          console.error("Failed to load Google Maps:", error);
          toast.error(
            "Failed to load Google Maps. Address autocomplete will not be available."
          );
        });
    }
  }, [googleMapsApiKey, googleMapsLoaded]);

  // Set form data from selectedData
  useEffect(() => {
    if (selectedData) {
      setFormData({
        name: selectedData.name || "",
        gender: selectedData.gender || "",
        birth_time: formatTimeForDisplay(selectedData.birth_time) || "",
        birth_place: selectedData.birth_place || "",
        birth_date: formatDateForDisplay(selectedData.birth_date) || "",
        currency_category: selectedData.currency_category || "",
        current_address: selectedData.current_address || "",
      });
    }
  }, [selectedData]);

  // Handle place selection from autocomplete
  const handlePlaceChanged = useCallback((fieldName, autocomplete) => {
    const place = autocomplete.getPlace();

    if (!place.geometry) {
      console.error("No details available for input");
      return;
    }

    const fullAddress = place.formatted_address || place.name || "";

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: fullAddress,
    }));
  }, []);

  // Initialize Google Places Autocomplete
  useEffect(() => {
    if (!isOpen || !googleMapsLoaded || !window.google) return;

    const initializeAutocomplete = () => {
      // Clean up existing instances
      if (birthPlaceAutocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(
          birthPlaceAutocompleteRef.current
        );
        birthPlaceAutocompleteRef.current = null;
      }
      if (currentAddressAutocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(
          currentAddressAutocompleteRef.current
        );
        currentAddressAutocompleteRef.current = null;
      }

      // Initialize autocomplete for birth place
      if (birthPlaceRef.current) {
        birthPlaceAutocompleteRef.current =
          new window.google.maps.places.Autocomplete(birthPlaceRef.current, {
            types: ["(cities)"],
          });

        birthPlaceAutocompleteRef.current.addListener("place_changed", () => {
          handlePlaceChanged("birth_place", birthPlaceAutocompleteRef.current);
        });
      }

      // Initialize autocomplete for current address
      if (currentAddressRef.current) {
        currentAddressAutocompleteRef.current =
          new window.google.maps.places.Autocomplete(
            currentAddressRef.current,
            { types: ["(regions)"] }
          );

        currentAddressAutocompleteRef.current.addListener(
          "place_changed",
          () => {
            handlePlaceChanged(
              "current_address",
              currentAddressAutocompleteRef.current
            );
          }
        );
      }
    };

    const timer = setTimeout(initializeAutocomplete, 100);

    return () => {
      clearTimeout(timer);
      if (birthPlaceAutocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(
          birthPlaceAutocompleteRef.current
        );
      }
      if (currentAddressAutocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(
          currentAddressAutocompleteRef.current
        );
      }
    };
  }, [isOpen, googleMapsLoaded, handlePlaceChanged]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const genderMapping = {
        Man: "man",
        man: "man",
        Women: "woman",
        woman: "woman",
        Woman: "woman",
        transgender: "transgender",
        Transgender: "transgender",
        agender: "agender",
        Agender: "agender",
        "non-binary": "non-binary",
        "Non-binary": "non-binary",
        pangender: "pangender",
        Pangender: "pangender",
      };

      // Filter out empty fields and prepare data
      const filteredData = Object.entries(formData).reduce(
        (acc, [key, value]) => {
          if (value !== "" && value !== null && value !== undefined) {
            if (key === "gender" && genderMapping[value]) {
              acc[key] = genderMapping[value];
            } else if (key === "birth_date") {
              // Convert date format to MM-DD-YY
              acc[key] = formatDateForAPI(value);
            } else if (key === "birth_time") {
              // Convert time format to HH:MM:SS (24-hour)
              acc[key] = formatTimeForAPI(value);
            } else {
              acc[key] = value;
            }
          }
          return acc;
        },
        {}
      );

      // Add is_update_dating_profile flag
      filteredData.is_update_dating_profile = false;

      console.log("Sending data to API:", filteredData);

      const response = await updateInfo({
        id: selectedData.id,
        body: filteredData,
      });

      if (response.data.status) {
        toast.success(response.data.message);
        onClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("API error", error);
      toast.error("An error occurred while updating user info");
    }
  };

  if (!isOpen) return null;

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div style={{ width: "500px" }}>
        <h2 className="top-main-heading">Update User Info</h2>

        <div className="simple-form" style={{ padding: "20px 0" }}>
          {/* Name */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <div className="input-container" style={{ flex: 1 }}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="info-input"
              />
            </div>
          </div>

          {/* Gender and Birth Date */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <div className="input-container" style={{ flex: 1 }}>
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="info-input"
                style={{
                  width: "100%",
                  height: "56px",
                  borderRadius: "inherit",
                }}
              >
                <option value="">Select Gender</option>
                <option value="man">Man</option>
                <option value="woman">Woman</option>
                <option value="transgender">Transgender</option>
                <option value="agender">Agender</option>
                <option value="non-binary">Non-binary</option>
                <option value="pangender">Pangender</option>
              </select>
            </div>

            <div className="input-container" style={{ flex: 1 }}>
              <label htmlFor="birth_date">Birth Date</label>
              <input
                type="date"
                id="birth_date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
                className="info-input"
              />
            </div>
          </div>

          {/* Birth Time and Birth Place */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <div className="input-container" style={{ flex: 1 }}>
              <label htmlFor="birth_time">Birth Time</label>
              <input
                type="time"
                id="birth_time"
                name="birth_time"
                value={formData.birth_time}
                onChange={handleChange}
                className="info-input"
              />
            </div>

            <div className="input-container" style={{ flex: 1 }}>
              <label htmlFor="birth_place">Birth Place</label>
              <input
                ref={birthPlaceRef}
                type="text"
                id="birth_place"
                name="birth_place"
                value={formData.birth_place}
                onChange={handleChange}
                className="info-input"
                placeholder="Enter birth place"
              />
              {!googleMapsLoaded && (
                <small style={{ color: "#666", fontSize: "12px" }}>
                  Autocomplete not available
                </small>
              )}
            </div>
          </div>

          {/* Currency Category */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <div className="input-container" style={{ flex: 1 }}>
              <label htmlFor="currency_category">Currency Category</label>
              <select
                id="currency_category"
                name="currency_category"
                value={formData.currency_category}
                onChange={handleChange}
                className="info-input"
                style={{
                  width: "100%",
                  height: "56px",
                  borderRadius: "inherit",
                }}
              >
                <option value="">Select Category</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>
          </div>

          {/* Current Address */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <div className="input-container" style={{ flex: 1 }}>
              <label htmlFor="current_address">Current Address</label>
              <input
                ref={currentAddressRef}
                type="text"
                id="current_address"
                name="current_address"
                value={formData.current_address}
                onChange={handleChange}
                className="info-input"
                placeholder="Enter current address"
              />
              {!googleMapsLoaded && (
                <small style={{ color: "#666", fontSize: "12px" }}>
                  Autocomplete not available
                </small>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              type="button"
              className="fifthButton"
              style={{ backgroundColor: "green", marginRight: "10px" }}
              onClick={handleSave}
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="fifthButton"
              style={{ backgroundColor: "red" }}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default UpdateUserInfo;
