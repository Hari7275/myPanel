import React, { useState, useEffect } from "react";
import {
  useGetUserDesireListQuery,
  useUpdateUserInterstsTypeMutation,
} from "../../../_store/api";
import { toast } from "react-hot-toast";
import { Atom } from "react-loading-indicators";

const UserDesires = ({
  usersData,
  userId,
  userDatingStatus,
  handleDatingStatus,
}) => {
  const [selectedDesires, setSelectedDesires] = useState(new Set());

  const { data: fetchData, isLoading, isError } = useGetUserDesireListQuery();
  const [updateInterests, { isLoading: isUpdating }] =
    useUpdateUserInterstsTypeMutation();

  useEffect(() => {
    if (fetchData && usersData) {
      setSelectedDesires(
        new Set(usersData?.data?.desires.map((desire) => desire.id))
      );
    }
  }, [fetchData]);

  const handleChange = (desireId) => {
    setSelectedDesires((prevSelected) =>
      prevSelected.has(desireId)
        ? new Set([...prevSelected].filter((id) => id !== desireId))
        : new Set([...prevSelected, desireId])
    );
  };

  const handleSubmit = async (event) => {
    // if (isUpdating) return;
    event.preventDefault();

    if (userDatingStatus == "1") {
      handleDatingStatus();
      return;
    }

    try {
      const formattedInterests = [...selectedDesires];

      const intrestType = "profile_desires";

      const payload = {
        user_id: userId,
        interests: JSON.stringify(formattedInterests),
        profile_interest_type: intrestType.replace(" "),
      };

      const response = await updateInterests(payload).unwrap();
      // console.log("API Response:", response);

      // if (response.status) {
      //   toast.success("Desires updated successfully!");
      // } else {
      //   toast.error("Failed to update desires.");
      // }
    } catch (error) {
      console.error("Error updating desires:", error);
      toast.error("Failed to update desires.");
    }
  };

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className="col-12">
      <div className="ProfileData-checklist" style={{ fontSize: "10px" }}>
        {fetchData?.data?.map((option) => {
          const isChecked = selectedDesires.has(option.id);

          return (
            <div key={option.id}>
              <label className="input-group-options">
                <input
                  className="input-group-radio"
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleChange(option.id)}
                />
                <span>{option.passion}</span>
              </label>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="fifthButton"
        disabled={isUpdating}
      >
        {isUpdating ? "Updating..." : "Update Desires"}
      </button>
    </div>
  );
};

export default UserDesires;
