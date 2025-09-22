import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactModal from "react-modal";
import {
  useUpdateUserInfoMutation,
  useGetLanguagesListQuery,
} from "../../../_store/api";
import Select from "react-select";
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
    first_name: "",
    last_name: "",
    bio: "",
    date_of_birth: "",
    gender: "",
    hometown_location: "",
    living_location: "",
    current_location: "",
    country: "",
    languages: [],
  });

  const [selectedLanguages, setSelectedLanguage] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  // Refs for autocomplete inputs
  const hometownLocationRef = useRef(null);
  const livingLocationRef = useRef(null);
  const currentLocationRef = useRef(null);

  // Refs for autocomplete instances
  const hometownAutocompleteRef = useRef(null);
  const livingAutocompleteRef = useRef(null);
  const currentAutocompleteRef = useRef(null);

  const [updateInfo, { isLoading: isUpdating }] = useUpdateUserInfoMutation();
  const { data: languagesData } = useGetLanguagesListQuery();

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

  // Parse address data helper function - Updated to handle double-stringified data
  const parseAddressData = (addressData) => {
    if (!addressData) return "";

    try {
      // Handle double-stringified data
      if (typeof addressData === "object" && addressData.city) {
        // If city is a stringified JSON, parse it
        if (
          typeof addressData.city === "string" &&
          addressData.city.startsWith("{")
        ) {
          const parsed = JSON.parse(addressData.city);
          return parsed.city || parsed.state || parsed.country || "";
        }
        // Otherwise return the city value directly
        return (
          addressData.city || addressData.state || addressData.country || ""
        );
      }

      if (typeof addressData === "string") {
        if (addressData.startsWith("{")) {
          const parsed = JSON.parse(addressData);
          return parsed.city || parsed.state || parsed.country || addressData;
        }
        return addressData;
      }

      return addressData.city || addressData.state || addressData.country || "";
    } catch (e) {
      return addressData;
    }
  };

  useEffect(() => {
    if (selectedData) {
      // Parse languages if it's a string, otherwise use as-is
      const languages =
        typeof selectedData.languages === "string"
          ? JSON.parse(selectedData.languages)
          : selectedData.languages || [];

      setFormData({
        first_name: selectedData.first_name || "",
        last_name: selectedData.last_name || "",
        bio: selectedData.bio || "",
        date_of_birth: selectedData.date_of_birth || "",
        gender: selectedData.gender || "",
        hometown_location:
          selectedData.permanent_address ||
          selectedData.hometown_location ||
          "",
        living_location:
          selectedData.current_address || selectedData.living_location || "",
        current_location:
          selectedData.live_location || selectedData.current_location || "",
        country: selectedData.country || "",
        languages: languages,
      });
    }
  }, [selectedData]);

  // Handle place selection from autocomplete - Updated to store object directly
  const handlePlaceChanged = useCallback((fieldName, autocomplete) => {
    const place = autocomplete.getPlace();

    if (!place.geometry) {
      console.error("No details available for input");
      return;
    }

    let city = "";
    let state = "";
    let country = "";

    if (place.address_components) {
      place.address_components.forEach((component) => {
        const types = component.types;
        if (types.includes("locality")) {
          city = component.long_name;
        }
        if (types.includes("administrative_area_level_1")) {
          state = component.long_name;
        }
        if (types.includes("country")) {
          country = component.long_name;
        }
      });
    }

    // Create location object without lat/lng
    const locationData = {
      city: city,
      state: state,
      country: country,
    };

    // Update form data with the object directly (not stringified)
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: locationData,
    }));

    // If this is the hometown location, also update the country field
    if (fieldName === "hometown_location" && country) {
      setFormData((prevData) => ({
        ...prevData,
        country: country,
      }));
    }
  }, []);

  // Initialize Google Places Autocomplete
  useEffect(() => {
    if (!isOpen || !googleMapsLoaded || !window.google) return;

    const initializeAutocomplete = () => {
      // Clean up existing instances
      if (hometownAutocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(
          hometownAutocompleteRef.current
        );
        hometownAutocompleteRef.current = null;
      }
      if (livingAutocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(
          livingAutocompleteRef.current
        );
        livingAutocompleteRef.current = null;
      }
      if (currentAutocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(
          currentAutocompleteRef.current
        );
        currentAutocompleteRef.current = null;
      }

      // Initialize autocomplete for hometown location
      if (hometownLocationRef.current) {
        hometownAutocompleteRef.current =
          new window.google.maps.places.Autocomplete(
            hometownLocationRef.current,
            { types: ["address"] }
          );

        hometownAutocompleteRef.current.addListener("place_changed", () => {
          handlePlaceChanged(
            "hometown_location",
            hometownAutocompleteRef.current
          );
        });
      }

      // Initialize autocomplete for living location
      if (livingLocationRef.current) {
        livingAutocompleteRef.current =
          new window.google.maps.places.Autocomplete(
            livingLocationRef.current,
            { types: ["address"] }
          );

        livingAutocompleteRef.current.addListener("place_changed", () => {
          handlePlaceChanged("living_location", livingAutocompleteRef.current);
        });
      }

      // Initialize autocomplete for current location
      if (currentLocationRef.current) {
        currentAutocompleteRef.current =
          new window.google.maps.places.Autocomplete(
            currentLocationRef.current,
            { types: ["address"] }
          );

        currentAutocompleteRef.current.addListener("place_changed", () => {
          handlePlaceChanged(
            "current_location",
            currentAutocompleteRef.current
          );
        });
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initializeAutocomplete, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      if (hometownAutocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(
          hometownAutocompleteRef.current
        );
      }
      if (livingAutocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(
          livingAutocompleteRef.current
        );
      }
      if (currentAutocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(
          currentAutocompleteRef.current
        );
      }
    };
  }, [isOpen, googleMapsLoaded, handlePlaceChanged]);

  // Define Language options from API data
  useEffect(() => {
    if (selectedData && languagesData?.data?.length) {
      const options = languagesData.data.map((lang) => ({
        value: lang.language,
        label: lang.language,
      }));

      setLanguageOptions(options);

      // Get current languages from formData (already parsed)
      const currentLanguages = formData.languages || [];
      const preselected = options.filter((option) =>
        currentLanguages.some(
          (lang) => lang.toLowerCase() === option.value.toLowerCase()
        )
      );

      setSelectedLanguage(preselected);
    }
  }, [selectedData, languagesData, formData.languages]);

  const handleMultiSelectChange = (name, selectedOptions) => {
    const newLanguages = selectedOptions?.map((option) => option.value) || [];

    setFormData((prevData) => ({
      ...prevData,
      [name]: newLanguages,
    }));

    if (name === "languages") {
      setSelectedLanguage(selectedOptions);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    // For manual input, create a simple object
    setFormData((prevData) => ({
      ...prevData,
      [name]: { city: value, state: "", country: "" },
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Gender mapping
      const genderMapping = {
        Man: "male",
        Women: "female",
        transgender: "transgender",
        agender: "agender",
        "non-binary": "non-binary",
        pangender: "pangender",
      };

      // Filter out empty fields and prepare data
      const filteredData = Object.entries(formData).reduce(
        (acc, [key, value]) => {
          // Check if value has data
          if (value !== "" && value !== null && value !== undefined) {
            // Handle gender mapping
            if (key === "gender" && genderMapping[value]) {
              acc[key] = genderMapping[value];
            } else if (Array.isArray(value) && value.length > 0) {
              // For arrays (like languages), check if they have elements
              acc[key] = key === "languages" ? JSON.stringify(value) : value;
            } else if (!Array.isArray(value)) {
              // For location fields, ensure they are objects with city, state, country
              if (
                [
                  "hometown_location",
                  "living_location",
                  "current_location",
                ].includes(key)
              ) {
                if (typeof value === "string" && value) {
                  // If it's a plain string (manually entered), create a simple object
                  acc[key] = {
                    city: value,
                    state: "",
                    country: "",
                  };
                } else if (typeof value === "object" && value.city) {
                  // If it's already an object, ensure it has the right structure
                  acc[key] = {
                    city: value.city || "",
                    state: value.state || "",
                    country: value.country || "",
                  };
                }
              } else if (key !== "gender") {
                // For non-location fields (excluding gender which we already handled), include them as is
                acc[key] = value;
              }
            }
          }
          return acc;
        },
        {}
      );

      const response = await updateInfo({
        id: selectedData.id,
        body: {
          ...filteredData,
        },
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
          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <div className="input-container" style={{ flex: 1 }}>
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="info-input"
              />
            </div>

            <div className="input-container" style={{ flex: 1 }}>
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="info-input"
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <div className="input-container" style={{ flex: 1 }}>
              <label htmlFor="bio">Bio</label>
              <input
                type="text"
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="info-input"
              />
            </div>

            <div className="input-container" style={{ flex: 1 }}>
              <label htmlFor="date_of_birth">Date of Birth</label>
              <input
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="info-input"
              />
            </div>
          </div>

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
                <option value="Man">Man</option>
                <option value="Women">Women</option>
                <option value="transgender">Transgender</option>
                <option value="agender">Agender</option>
                <option value="non-binary">Non-binary</option>
                <option value="pangender">Pangender</option>
              </select>
            </div>

            {/* <div className="input-container" style={{ flex: 1 }}>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="info-input"
              />
            </div> */}
          </div>

          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <div className="input-container" style={{ flex: 1 }}>
              <label htmlFor="languages">Languages</label>
              <Select
                id="languages"
                name="languages"
                isMulti
                options={languageOptions}
                value={selectedLanguages}
                onChange={(options) =>
                  handleMultiSelectChange("languages", options)
                }
                placeholder="Select languages..."
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <div className="input-container" style={{ flex: 1 }}>
              <label htmlFor="hometown_location">Hometown Location</label>
              <input
                ref={hometownLocationRef}
                type="text"
                id="hometown_location"
                name="hometown_location"
                defaultValue={parseAddressData(formData.hometown_location)}
                onChange={handleAddressInputChange}
                className="info-input"
                placeholder="Enter hometown address"
              />
              {!googleMapsLoaded && (
                <small style={{ color: "#666", fontSize: "12px" }}>
                  Autocomplete not available
                </small>
              )}
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <div className="input-container" style={{ flex: 1 }}>
              <label htmlFor="current_location">Current Location</label>
              <input
                ref={currentLocationRef}
                type="text"
                id="current_location"
                name="current_location"
                defaultValue={parseAddressData(formData.current_location)}
                onChange={handleAddressInputChange}
                className="info-input"
                placeholder="Enter current location"
              />
              {!googleMapsLoaded && (
                <small style={{ color: "#666", fontSize: "12px" }}>
                  Autocomplete not available
                </small>
              )}
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <div className="input-container" style={{ flex: 1 }}>
              <label htmlFor="living_location">Living Location</label>
              <input
                ref={livingLocationRef}
                type="text"
                id="living_location"
                name="living_location"
                defaultValue={parseAddressData(formData.living_location)}
                onChange={handleAddressInputChange}
                className="info-input"
                placeholder="Enter living address"
              />
              {!googleMapsLoaded && (
                <small style={{ color: "#666", fontSize: "12px" }}>
                  Autocomplete not available
                </small>
              )}
            </div>
          </div>

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
