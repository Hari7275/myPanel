import React, { useEffect, useMemo, useState } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { COACHCATEGORYCOLUMN } from "./coachCategoryColumn";
import { Pencil, Trash } from "lucide-react";
import AddCoachCategory from "./AddCoachCategory";
import UpdateCoachCategory from "./UpdateCoachCategory";
import DeleteComponent from "../../payments/DeleteComponent";
import {
  useGetCoachCategoryListQuery,
  useDeleteCoachCategoryMutation,
} from "../../../_store/api";
import Modal from "react-modal";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

Modal.setAppElement("#root");

const CoachCategory = () => {
  const [addCategory, SetAddCategory] = useState(false);
  const [updateCategory, setUpdateCategory] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // fetching api data fro listing reviews
  const { data: fetchData } = useGetCoachCategoryListQuery();
  const [deleteCategories] = useDeleteCoachCategoryMutation();
  const permissions = usePermissions();

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setData(fetchData?.data);
    } else {
      setData([]);
    }
  }, [fetchData]);

  // Toggle function for adding a review
  const toggleAddCategory = (coachId) => {
    SetAddCategory(!addCategory);
  };

  // Toggle function for updating a review
  const toggleUpdateCategory = (row) => {
    setSelectedRow(row);
    setUpdateCategory(!updateCategory);
  };

  // Toggle function for deleting a review
  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  const handleDelete = () => {
    if (selectedRow && selectedRow.id) {
      deleteCategories({ id: selectedRow.id }).catch((error) => {
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
      permissions?.["meta_data_section"]?.includes("create_coach_categories") && (
        <button
          className="addButton"
          style={{
            position: "absolute",
            right: "20px",
            backgroundColor: "#18B164",
            padding: "6px",
          }}
          onClick={toggleAddCategory}
        >
          Add Category
        </button>
      )
    );
  };

  const columns = useMemo(() => [
    ...COACHCATEGORYCOLUMN(toggleModal),
    {
      Header: () => <div className="actions-header">Actions</div>,
      id: "actions",
      Cell: ({ row }) => (
        <div className="actions-cell">
          {permissions?.["meta_data_section"]?.includes("delete_coach_categories") && (
            <span className="deleteIcon">
              <Trash
                className="iconSmall"
                onClick={() => toggleDeleteComponent(row.original)}
              />
            </span>
          )}
          {permissions?.["meta_data_section"]?.includes("update_coach_categories") && (
            <span className="editIcon">
              <Pencil
                className="iconSmall"
                onClick={() => toggleUpdateCategory(row.original)}
              />
            </span>
          )}
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
        tableTitle=" Consultant Categories"
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
            <button
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                color: "red",
                fontSize: "20px",
                fontWeight: "20px",
              }}
              onClick={toggleModal}
            >
              X
            </button>
          </div>
        )}
      </Modal>
      {addCategory && (
        <AddCoachCategory isOpen={addCategory} onClose={toggleAddCategory} />
      )}
      {updateCategory && (
        <UpdateCoachCategory
          isOpen={updateCategory}
          onClose={toggleUpdateCategory}
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

export default CoachCategory;
