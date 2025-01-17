import React, { useState, useEffect } from "react";
import "../cssfolder/RemoveBackground.css";

const RemoveBackground = ({ imageToEdit }) => {
  const [image, setImage] = useState(null);
  const [bgRemove, setBgRemove] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (imageToEdit) {
      setImage(imageToEdit);
    }
  }, [imageToEdit]);

  const handleRemoveBackground = async () => {
    const apiKey = "hAkqAJCsqh3oFuzXexnXBpqn";
    const apiUrl = "https://api.remove.bg/v1.0/removebg";

    const formData = new FormData();
    formData.append("image_url", image);
    formData.append("size", "auto");

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "X-Api-Key": apiKey,
        },
        body: formData,
      });

      const data = await res.blob();
      const reader = new FileReader();
      reader.onloadend = () => setBgRemove(reader.result);
      reader.readAsDataURL(data);
    } catch (error) {
      console.log(error);
      setErrorMessage(`Failed to remove background. ${error.message}`);
    }
  };

  return (
    <div className="removeBackground_container">
      <div>
        <div className="removeBackground_input">
          <div className="removeBackground_button-container">
            <button
              type="button"
              onClick={handleRemoveBackground}
              className="removeBackground_remove-button"
            >
              Remove Background
            </button>
          </div>
        </div>
        <div className="removeBackground_image-container">
          {image && (
            <div className="removeBackground_image-box removeBackground_image-left">
              <img
                className="removeBackground_image"
                src={image}
                alt="Profile"
              />
            </div>
          )}
          {bgRemove && (
            <div className="removeBackground_image-box removeBackground_image-right">
              <img
                className="removeBackground_image"
                src={bgRemove}
                alt="Background Removed"
              />
            </div>
          )}
        </div>
        {bgRemove && (
          <div className="removeBackground_download-container">
            <a href={bgRemove} download={"save.png"}>
              <div>
                <button className="removeBackground_download-button">
                  Download
                </button>
              </div>
            </a>
            <div>
              <button
                className="removeBackground_download-button"
                style={{ marginLeft: "20px" }}
              >
                Upload
              </button>
            </div>
          </div>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default RemoveBackground;
