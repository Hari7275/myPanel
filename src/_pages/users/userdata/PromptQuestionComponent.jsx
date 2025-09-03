import React, { useState ,useEffect} from "react";
import { useUpdateUserInterstsTypeMutation } from "../../../_store/api";
import toast from "react-hot-toast";

const PromptQuestionComponent = ({
  data,
  userPromptData,
  userId,
  userDatingStatus,
  handleDatingStatus,
}) => {
  const [updateInfo, { isLoading: isUpdating }] =
    useUpdateUserInterstsTypeMutation();

  console.log("data", data);
  console.log("userPromptData", userPromptData);

  // State to hold the user's selected question and answer (limited to 3)
  const [userPrompts, setUserPrompts] = useState(() => {
    let initialPrompts = [];

    // If userPromptData exists and has length > 0, use it
    if (userPromptData && userPromptData.length > 0) {
      // Map existing data
      initialPrompts = userPromptData.slice(0, 3).map((prompt) => ({
        question_id: prompt?.question_id || "",
        answer: prompt?.answer || "",
      }));
    }

    // Always ensure we have exactly 3 prompts
    while (initialPrompts.length < 3) {
      initialPrompts.push({
        question_id: "",
        answer: "",
      });
    }

    console.log("Initialized prompts:", initialPrompts);
    console.log("Number of prompts:", initialPrompts.length);

    return initialPrompts;
  });

  // State to store the initial prompts for comparison
  const [initialPrompts, setInitialPrompts] = useState(() => {
    return JSON.stringify(userPrompts);
  });

  // State to track if there are changes
  const [hasChanges, setHasChanges] = useState(false);

  // Check for changes whenever userPrompts updates
  useEffect(() => {
    const currentPrompts = JSON.stringify(userPrompts);
    setHasChanges(currentPrompts !== initialPrompts);
  }, [userPrompts, initialPrompts]);

  // Get unique questions from data
  const questions = data?.map((item) => ({
    prompt_question: item.prompt_questions,
    prompt_id: item.id,
  }));

  console.log("questions", questions);

  // Handle changes in the select (for question selection)
  const handleQuestionChange = (index, promptId) => {
    const updatedPrompts = [...userPrompts];
    updatedPrompts[index].question_id = promptId;
    setUserPrompts(updatedPrompts);
  };

  // Handle changes in the textarea (for user answer)
  const handleAnswerChange = (index, answer) => {
    const updatedPrompts = [...userPrompts];
    updatedPrompts[index].answer = answer;
    setUserPrompts(updatedPrompts);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (userDatingStatus == "1") {
      handleDatingStatus();
      return;
    }
    try {
      // Filter out prompts with empty answers
      const promptsToSave = userPrompts.filter(
        (prompt) =>
          prompt.question_id && prompt.answer && prompt.answer.trim() !== ""
      );

      const dataToSend = {
        user_id: String(userId),
        profile_interest_type: "prompt_questions",
        interests: JSON.stringify(promptsToSave),
      };

      const response = await updateInfo(dataToSend);

      if (response.data.status) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      {/* <div className="prompt-questions-header">
        <h3>Prompt Questions</h3>
      </div> */}

      {userPrompts.map((prompt, index) => (
        <div key={index}>
          <div className="col-12">
            <div className="prompt-question">Prompt Question {index + 1}</div>

            <select
              className="prompt-options"
              value={prompt.question_id}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
            >
              <option value="">Select a question...</option>
              {questions?.map((question, qIndex) => (
                <option key={qIndex} value={question?.prompt_id}>
                  {question?.prompt_question}
                </option>
              ))}
            </select>

            <div className="prompt-textarea">
              <textarea
                className="textarea"
                placeholder="Enter your answer here..."
                rows="5"
                value={prompt.answer}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              />
            </div>
          </div>
          {index < userPrompts.length - 1 && <div className="divider"></div>}
        </div>
      ))}

      <button
        className="fifthButton"
        onClick={handleSave}
        disabled={!hasChanges || isUpdating}
        style={{
          opacity: !hasChanges || isUpdating ? 0.6 : 1,
          cursor: !hasChanges || isUpdating ? "not-allowed" : "pointer",
        }}
      >
        {isUpdating ? "Updating..." : "Update Prompt Questions"}
      </button>
    </>
  );
};

export default PromptQuestionComponent;
