import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { Pencil, Trash } from "lucide-react";
import { MAGAZINECATEGORYCOLUMN } from "./magazineCategoriesColumn";
import UpdateMagazineCategories from "./UpdateMagazineCategories";
import AddMagazineCategories from "./AddMagazineCategories";
import DeleteComponent from "../../payments/DeleteComponent";
import Modal from "react-modal";

import {
  useGetfluteMagzineListQuery,
  useDeletefluteMagzineMutation,
} from "../../../_store/api";

Modal.setAppElement("#root");

const MagazineCategories = () => {
  const [addCard, setAddCard] = useState(false);
  const [UpdateCard, setUpdateCard] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetching API data for listing reviews
  const { data: fetchData } = useGetfluteMagzineListQuery();
  const [deleteCard] = useDeletefluteMagzineMutation();

  useEffect(() => {
    if (fetchData) {
      setData(fetchData.data);
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

  const handleDelete = () => {
    if (selectedRow && selectedRow.id) {
      deleteCard({ id: selectedRow.id }).catch((error) => {
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
        Add card
      </button>
    );
  };

  const columns = useMemo(() => [
    ...MAGAZINECATEGORYCOLUMN(toggleModal), 
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
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Magazine Category"
        AddPackageButton={AddButton}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        contentLabel="Image Modal"
        className="modal"
        overlayClassName="overlay"
      >
        {selectedImage && (
          <div >
            <img src={selectedImage} alt="Selected" className="large-image" />
            <button className="image-modal" onClick={toggleModal}>X</button>
          </div>
        )}
      </Modal>

      {addCard && (
        <AddMagazineCategories isOpen={addCard} onClose={toggleAddCard} />
      )}

      {UpdateCard && (
        <UpdateMagazineCategories
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

export default MagazineCategories;
