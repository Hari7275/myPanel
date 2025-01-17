import React, { useMemo, useState, useEffect } from "react";
import ReactModal from "react-modal";
import CommonTable from "../../../_components/table/CommonTable";
import { Pencil, Trash } from "lucide-react";
import { MENUORDERCOLUMN } from "./menuOrderColumn";
import UpdateMenuOrder from "./UpdateMenuOrder";
import AddMenuOrder from "./AddMenuOrder";
import DeleteComponent from "../../payments/DeleteComponent";

import Modal from "react-modal";

import {
  useGetmenuOrderListQuery,
  useDeletemenuOrderMutation,
} from "../../../_store/api";

Modal.setAppElement("#root");

const ChildMenuOrderList = ({ isOpen, onClose, id }) => {
  const [addCard, setAddCard] = useState(false);
  const [UpdateCard, setUpdateCard] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetching API data for listing reviews
  const { data: fetchData } = useGetmenuOrderListQuery({ id: id });
  const [deleteItem] = useDeletemenuOrderMutation();

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setData(fetchData?.data);
    } else {
      setData([]);
    }
  }, [fetchData]);

  // Toggle function for adding a review
  const toggleAddCard = () => {
    setAddCard(!addCard);
  };

  // Toggle function for updating a review
  const toggleUpdateCard = (row) => {
    setSelectedRow(row);
    setUpdateCard(!UpdateCard);
  };

  // Toggle function for deleting a review
  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  // ******************************** logic for delete items **********************************
  const handleDelete = () => {
    if (selectedRow && selectedRow.id) {
      deleteItem({ id: selectedRow.id }).catch((error) => {
        console.error("Failed to delete the service:", error);
      });
    }
  };

  const toggleModal = (image) => {
    setModalIsOpen(!modalIsOpen);
    setSelectedImage(image);
  };

  const AddButton = () => {
    return (
      <>
        <button
          className="addButton"
          style={{
            position: "absolute",
            right: "20px",
            backgroundColor: "#18B164",
            padding: "6px",
          }}
          onClick={toggleAddCard}
        >
          Add Item
        </button>
      </>
    );
  };

  const columns = useMemo(() => [
    ...MENUORDERCOLUMN(toggleModal),
    {
      Header: () => <div className="actions-header">Actions</div>,
      id: "actions",
      Cell: ({ row }) => (
        <div className="actions-cell">
          <span className="deleteIcon">
            <Trash
              className="iconSmall"
              onClick={() => toggleDeleteComponent(row.original)}
            />
          </span>

          <span
            className="editIcon"
            onClick={() => toggleUpdateCard(row.original)}
          >
            <Pencil className="iconSmall" />
          </span>
        </div>
      ),
    },
  ]);

  return (
    <>
      <ReactModal
        className="modal"
        overlayClassName="overlay"
        isOpen={isOpen}
        onRequestClose={onClose}
      >
        <div style={{ width: "1000px" }}>
          <CommonTable
            columns={columns}
            data={data}
            includeActions={false}
            tableTitle="child menu order list "
            AddPackageButton={AddButton}
          />
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={toggleModal}
          contentLabel="Image Modal"
          className="modal"
          overlayClassName="overlay"
        >
          {selectedImage && (
            <div>
              <img src={selectedImage} alt="Selected" className="large-image" />
              <button className="image-modal" onClick={toggleModal}>
                X
              </button>
            </div>
          )}
        </Modal>
      </ReactModal>

      {addCard && <AddMenuOrder isOpen={addCard} onClose={toggleAddCard} />}

      {UpdateCard && (
        <UpdateMenuOrder
          isOpen={UpdateCard}
          onClose={toggleUpdateCard}
          selectedRow={selectedRow}
        />
      )}
      {showDeleteComponent && (
        <DeleteComponent
          isOpen={showDeleteComponent}
          onClose={toggleDeleteComponent}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};
export default ChildMenuOrderList;
