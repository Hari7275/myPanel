import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import "../../../cssfolder/profileData.css";
import RadioComponent from "./RadioComponent";
import CheckboxComponent from "./CheckboxComponent";
import PromptQuestionComponent from "./PromptQuestionComponent";
import UserDesires from "./UserDesires";
import {
  useGetProfileFeatureListQuery,
  useGetProfilePassionListQuery,
  useGetPromptQuestionListQuery,
} from "../../../_store/api/masterComponentsApi/userInterest";
import {
  useGetUserListQuery,
  useUpdateUserInterstsTypeMutation,
} from "../../../_store/api";
import { useSelector } from "react-redux";

const UserData = () => {
  const userId = useSelector((state) => state.user.userData);
  const { data: profileFeatures, isLoading: isProfileFeaturesLoading } =
    useGetProfileFeatureListQuery(userId);
  const { data: profilePassions, isLoading: isProfilePassionsLoading } =
    useGetProfilePassionListQuery(userId);
  const { data: promptQuestions, isLoading: isPromptQuestionsLoading } =
    useGetPromptQuestionListQuery(userId);

  const { data: usersData, isLoading: isUsersDataLoading } =
    useGetUserListQuery(userId);

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedPassions, setSelectedPassions] = useState([]);

  useEffect(() => {
    const lifestyle = usersData?.data?.lifestyles || [];

    const userInterests = [...lifestyle];

    setSelectedInterests(userInterests);

    const userPassions = usersData?.data?.interests || [];
    setSelectedPassions(userPassions.map((p) => p.id));
  }, [usersData]);

  const [updateInterests] = useUpdateUserInterstsTypeMutation();

  // function for api show toast message

  const handleButtonClick = () => {
    toast.success("Data has been updated successfully");
  };

  // Check if any of the data is loading
  if (
    isProfileFeaturesLoading ||
    isProfilePassionsLoading ||
    isPromptQuestionsLoading ||
    isUsersDataLoading
  ) {
    return <div>Loading...</div>;
  }

  // Default to empty arrays if data is undefined or null

  const excludedValues = ["Job", "Where I'm from", "Where I live", "Gender"];
  const filteredData =
    profileFeatures?.data?.filter(
      (item) => !excludedValues.includes(item.profile_value)
    ) || [];

  const profileFeatureItems = filteredData;

  const passionItems = profilePassions?.data || [];
  const promptQuestionItems = promptQuestions?.data || [];

  const userPromptData = usersData?.data?.prompt_question || [];

  const handleInterestUpdate = (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Construct the data in the required format
    const interestsData = {
      user_id: userId,
      profile_interest_type: "profile_feature",
      interests: JSON.stringify(selectedInterests),
    };

    console.log("interestsData", selectedInterests);
    console.log("interestsData..........", interestsData);

    // Call the mutation
    updateInterests(interestsData).then((response) => {
      handleButtonClick();
      if (response.error) {
        console.error("Failed to update interests:", response.error);
      } else {
        console.log("Interests updated successfully:", response.data);
      }
    });
  };

  const handlePassionsUpdate = (event) => {
    event.preventDefault();
    const passionsData = {
      user_id: userId,
      profile_interest_type: "profile_passion",
      interests: JSON.stringify(selectedPassions), // Send selected passion IDs
    };

    console.log("passionsData", passionsData);

    updateInterests(passionsData).then((response) => {
      handleButtonClick();
      if (response.error) {
        console.error("Failed to update passions:", response.error);
      } else {
        console.log("Passions updated successfully:", response.data);
      }
    });
  };

  return (
    <div className="ProfileData-container sub-container">
      <div className="ProfileData-card">
        <h3 className="ProfileData-subheading">Profile Options</h3>
        <form onSubmit={handleInterestUpdate}>
          <div className="card-body">
            <div className="row">
              <div className="row-inside">
                {profileFeatureItems.map((item) => {
                  const myInterest = selectedInterests.find(
                    (arr) => arr?.profile_feature === item?.profile_feature
                  );
                  return (
                    <RadioComponent
                      key={item?.profile_feature}
                      data={item}
                      interestType={
                        myInterest ? myInterest.selected_value : null
                      }
                      setSelectedInterests={setSelectedInterests}
                    />
                  );
                })}
                <button type="submit" className="fifthButton">
                  Update Profile Options
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="maindivider"></div>

      <div className="ProfileData-card">
        <h3 className="ProfileData-subheading">User Passions</h3>
        <form onSubmit={handlePassionsUpdate}>
          <div className="card-body">
            <div className="row">
              <div className="row-inside">
                <CheckboxComponent
                  data={passionItems}
                  selectedPassions={selectedPassions}
                  setSelectedPassions={setSelectedPassions}
                />
                <button type="submit" className="fifthButton">
                  Update Passions
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="maindivider"></div>

      <div className="ProfileData-card">
        <h3 className="ProfileData-subheading">Prompt Questions</h3>
        <form>
          <div className="row-inside">
            <PromptQuestionComponent
              data={promptQuestionItems}
              userPromptData={userPromptData}
              userId={userId}
            />
          </div>
        </form>
      </div>

      <div className="maindivider"></div>
      {/* user desire */}

      <div className="ProfileData-card">
        <h3 className="ProfileData-subheading">User Desire </h3>
        <form>
          <div className="row-inside">
            <UserDesires usersData={usersData} userId={userId} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserData;
