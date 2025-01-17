import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./modal.css";
import DeleteModal from "./DeleteModal";
import ImageDeletePopup from "../../galleryComponent/ImageDeletePopup";
import ReactCropper from "../../galleryComponent/ReactCropper";
import UpdateUserInfo from "../../components/user/UpdateUserInfo";
import UpdateUserOption from "../../components/user/UpdateUserOption";
import RemoveBackground from "../../galleryComponent/RemoveBackground";
import AddLanguage from "../../_pages/meta-data/languages/AddLanguage";
import EditLanguage from "../../_pages/meta-data/languages/EditLanguage";

const Modal = ({
  closeUserProfile_Modal,
  closeDelete_Modal,
  modalType,
  closeImageDelete_Modal,
  closeUpdateForm_Modal,
  closeUpdateUserInfo_Modal,
  closeUSerPassion_modal,
  closeDescription_Modal,
  data,
  handleDelete,
  imageToEdit,
  modalData,
}) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const handleBackdropClick = (event) => {
    if (event.target.className === "modal-wrapper") {
      if (modalType === "profile") closeUserProfile_Modal();
      if (modalType === "delete") closeDelete_Modal();
      if (modalType === "imageDelete") closeImageDelete_Modal();
      if (modalType === "imageOpen") closeImageDelete_Modal();
      if (modalType === "updateForm") closeUpdateForm_Modal();
      if (modalType === "updateUserInfo") closeUpdateUserInfo_Modal();
      if (modalType === "updateListenerForm") closeUpdateUserInfo_Modal();
      if (modalType === "userPassionFeature") closeUSerPassion_modal();
      if (modalType === "description") closeDescription_Modal();
      if (modalType === "editProfileImage") closeUserProfile_Modal();
      if (
        modalType === "addLanguage" ||
        modalType === "editLanguage" ||
        modalType === "deleteLanguage"
      )
        closeUSerPassion_modal();
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className="modal-wrapper" onClick={handleBackdropClick}></div>
      {modalType === "profile" && (
        <div className="modal-container">
          {/* <Profile closeUserProfile_Modal={closeUserProfile_Modal} /> */}
        </div>
      )}

      {(modalType === "delete" || modalType === "deleteLanguage") && (
        <div className="delete-modal-container">
          <DeleteModal
            closeDelete_Modal={closeDelete_Modal}
            handleDelete={handleDelete}
          />
        </div>
      )}

      {modalType === "imageDelete" && (
        <div className="delete-modal-container">
          <ImageDeletePopup />
        </div>
      )}

      {modalType === "imageOpen" && (
        <div className="delete-modal-container">
          <ReactCropper />
        </div>
      )}

      {modalType === "updateUserInfo" && (
        <div className="delete-modal-container">
          <UpdateUserInfo
            closeUpdateUserInfo_Modal={closeUpdateUserInfo_Modal}
          />
        </div>
      )}

      {modalType === "userPassionFeature" && (
        <div className="delete-modal-container">
          <UpdateUserOption
            data={data}
            closeUpdateUserInfo_Modal={closeUpdateUserInfo_Modal}
          />
        </div>
      )}

      {modalType === "editProfileImage" && (
        <div className="delete-modal-container">
          <RemoveBackground
            closeDescription_Modal={closeDescription_Modal}
            imageToEdit={imageToEdit}
          />
        </div>
      )}

      {modalType === "addLanguage" && (
        <div className="delete-modal-container">
          <AddLanguage closeUpdateUserInfo_Modal={closeUpdateUserInfo_Modal} />
        </div>
      )}

      {modalType === "editLanguage" && (
        <div className="delete-modal-container">
          <EditLanguage
            closeEditLanguageModal={closeUSerPassion_modal}
            modalData={modalData}
          />
        </div>
      )}
    </>,
    document.querySelector(".myPortalModalDiv")
  );
};
export default Modal;
