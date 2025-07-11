import React, { useState, useEffect, useMemo } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { Pencil, Trash } from "lucide-react";
import Modal from "react-modal";
import "./promotionalCard.css";
import UpdatePromotionalCard from "./UpdatePromotionalCard";
import AddPromotionalCard from "./AddPromotionalCard";
import DeleteComponent from "../../payments/DeleteComponent";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

// Set the app element for accessibility
import {
  useGetPromotionalCardListQuery,
  useDeletePromotionalCardMutation,
  useGetCoachCategoryListQuery,
} from "../../../_store/api";

Modal.setAppElement("#root");

const PromotionalCardsTable = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState([]);
  const [addCard, setAddCard] = useState(false);
  const [updateCard, setUpdateCard] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const permissions = usePermissions();

  // Fetching API data for listing reviews
  const { data: fetchData } = useGetPromotionalCardListQuery();
  const [deleteReview] = useDeletePromotionalCardMutation();

  // fetching data for add and update category

  const { data: catData } = useGetCoachCategoryListQuery();

  useEffect(() => {
    if (catData) {
      setCategoryData(catData?.data);
    }
  }, [catData]);

  useEffect(() => {
    if (fetchData) {
      setData(fetchData.data);
    }
  }, [fetchData]);

  const toggleAddCard = () => {
    setAddCard(!addCard);
  };
  const toggleUpdateCard = (row) => {
    setSelectedRow(row);
    setUpdateCard(!updateCard);
  };

  // Toggle function for deleting a review
  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  const handleDelete = () => {
    if (selectedRow && selectedRow.id) {
      deleteReview({ id: selectedRow.id }).catch((error) => {
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
      permissions?.["meta_data_section"]?.includes("create_promotional_card") &&
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

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Category Name",
        accessor: "category_name",
      },
      {
        Header: "Card Image",
        accessor: "card_image",
        Cell: ({ row }) => (
          <div className="card-img">
            <img
              src={row.original.card_image || "snake.jpg"}
              alt="Card Image"
              width="40"
              height="40"
              onClick={() => toggleModal(row.original.card_image)}
              style={{ cursor: "pointer" }}
            />
          </div>
        ),
      },
      {
        Header: "Consultant Type",
        accessor: "type",
        Cell: ({ value }) =>
          value === 1
            ? "Astrologer"
            : value === 2
              ? "Coach"
              : value === 3
                ? "Listener"
                : "Unknown",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            {permissions?.["meta_data_section"]?.includes("delete_promotional_card") && (
              <span className="deleteIcon">
                <Trash
                  className="iconSmall"
                  onClick={() => toggleDeleteComponent(row.original)}
                />
              </span>
            )}
            {permissions?.["meta_data_section"]?.includes("update_promotional_card") && (
              <span className="editIcon">
                <Pencil
                  className="iconSmall"
                  onClick={() => toggleUpdateCard(row.original)}
                />
              </span>
            )}
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Promotional card"
        AddPackageButton={AddButton}
        showTableHeading={false}
      />
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
            <button onClick={toggleModal}>Close</button>
          </div>
        )}
      </Modal>

      {addCard && (
        <AddPromotionalCard
          isOpen={addCard}
          onClose={toggleAddCard}
          categoryData={categoryData}
        />
      )}
      {updateCard && (
        <UpdatePromotionalCard
          isOpen={updateCard}
          onClose={toggleUpdateCard}
          selectedRow={selectedRow}
          categoryData={categoryData}
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

export default PromotionalCardsTable;
