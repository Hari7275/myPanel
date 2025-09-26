import React from "react";
import ReactModal from "react-modal";

const AstrologerBankDetails = ({ isOpen, onClose, selectedRow }) => {
  const InfoItem = ({ label, value }) => (
    <div className="card-footer-content">
      <div className="info-pair">
        <p className="info-item">
          <strong>{label}: </strong>
          <span>{value}</span>
        </p>
      </div>
    </div>
  );

  return (
    <>
      <ReactModal
        className="modal"
        overlayClassName="overlay"
        isOpen={isOpen}
        onRequestClose={onClose}
        aria-labelledby="update-promotional-card-title"
      >
        <div>
          <h3
            className="main-heading"
            style={{ display: "flex", justifyContent: "center" }}
          >
            Astrologer Bank Details
          </h3>
        </div>

        <div className="maindivider"></div>

        <footer className="userProfile-footer">
          <InfoItem
            label="Account Holder Name "
            value={selectedRow?.account_holder_name}
          />
          <div className="line"></div>

          <InfoItem label="Bank Name " value={selectedRow?.bank_name} />
          <div className="line"></div>

          <InfoItem
            label="Account Number "
            value={selectedRow?.account_number}
          />
          <div className="line"></div>

          <InfoItem label="ifsc code " value={selectedRow?.ifsc_code} />
          <div className="line"></div>

          <InfoItem
            label="Pan Card Number"
            value={selectedRow?.pancard_number}
          />
          <div className="line"></div>

          <InfoItem label="Primary Account " value={selectedRow?.is_primary ?"Yes":"No"} />
          

        </footer>
      </ReactModal>
    </>
  );
};

export default AstrologerBankDetails;
