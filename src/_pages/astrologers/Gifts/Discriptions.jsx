import React from 'react'
import ReactModal from 'react-modal'

const Discriptions = ({isOpen , onClose}) => {


     const description = (
       <p className="info-item">
         <strong style={{ fontSize: "20px" }}>Description:</strong>
         <span style={{ fontSize: "14px" }}>
           Dating Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde
           expedita hic, iusto facilis fuga iste distinctio quo soluta deleniti
           sapiente assumenda reiciendis a. Deleniti, laudantium minus ratione
           distinctio magni dolore officia architecto eveniet soluta commodi
           fuga! Laborum, officiis! Pariatur tempore consequatur facere at
           nesciunt labore ab ducimus reprehenderit ipsum non?
         </span>
       </p>
     );



  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div className="userProfile-footer-content">
        <div className="info-pair">{description}</div>
      </div>
    </ReactModal>

    
  );
}

export default Discriptions