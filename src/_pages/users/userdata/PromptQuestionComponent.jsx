import React, { useState } from "react";
import { useUpdateUserInterstsTypeMutation } from "../../../_store/api";

const PromptQuestionComponent = ({
  data,
  userPromptData,
  userId,
  userDatingStatus,
  handleDatingStatus,
}) => {
  const [updateInfo, { isLoading: isUpdating }] =
    useUpdateUserInterstsTypeMutation();

  // State to hold the user's selected question and answer
  const [userPrompts, setUserPrompts] = useState(
    userPromptData.map((prompt, index) => ({
      question_id: prompt.question_id, // Existing question ID
      answer: prompt.answer, // Existing user answer
    }))
  );

  // Get unique questions from data
  const questions = data.map((item) => ({
    prompt_question: item.prompt_questions,
    prompt_id: item.id,
  }));

  // Handle changes in the select (for question selection)
  const handleQuestionChange = (index, promptId) => {
    const updatedPrompts = [...userPrompts];
    updatedPrompts[index].question_id = promptId; // Update the selected question ID
    setUserPrompts(updatedPrompts);
  };

  // Handle changes in the textarea (for user answer)
  const handleAnswerChange = (index, answer) => {
    const updatedPrompts = [...userPrompts];
    updatedPrompts[index].answer = answer; // Update the answer text
    setUserPrompts(updatedPrompts);
  };

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (userDatingStatus == "1") {
      handleDatingStatus();
      return;
    }
    try {
      // Create the data object with the correct format
      const dataToSend = {
        user_id: String(userId), // Convert userId to a string as required
        profile_interest_type: "prompt_questions",
        interests: JSON.stringify(userPrompts), // Convert interests array to a JSON string
      };

      // Send the data using the mutation
      await updateInfo(dataToSend);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      {userPrompts.map((prompt, index) => (
        <div key={index}>
          <div className="col-12">
            <div className="prompt-question">Prompt Question {index + 1}</div>

            <select
              className="prompt-options"
              defaultValue={prompt.question_id}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
            >
              {questions.map((question, qIndex) => (
                <option key={qIndex} value={question.prompt_id}>
                  {question.prompt_question}
                </option>
              ))}
            </select>

            <div className="prompt-textarea">
              <textarea
                className="textarea"
                placeholder="Text area"
                rows="5"
                value={prompt.answer}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              />
            </div>
          </div>
          {index < userPrompts.length - 1 && <div className="divider"></div>}
        </div>
      ))}

      <button className="fifthButton" onClick={handleSave}>
        {isUpdating ? "Updating..." : "Update Prompt Questions"}
      </button>
    </>
  );
};

export default PromptQuestionComponent;
