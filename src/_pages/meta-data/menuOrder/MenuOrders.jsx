import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { Pencil, Trash, ArrowRight } from "lucide-react";
import { MENUORDERCOLUMN } from "./menuOrderColumn";
import UpdateMenuOrder from "./UpdateMenuOrder";
import AddMenuOrder from "./AddMenuOrder";
import DeleteComponent from "../../payments/DeleteComponent";
import SetOrderList from "./setOrderList/SetOrderList";
import ChildMenuOrderList from "./ChildMenuOrderList";
import Modal from "react-modal";

import {
  useGetmenuOrderListQuery,
  useDeletemenuOrderMutation,
} from "../../../_store/api";

Modal.setAppElement("#root");

const MenuOrders = () => {
  const [addCard, setAddCard] = useState(false);
  const [UpdateCard, setUpdateCard] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [menuOrder, setMenuOrder] = useState(false);
  const [childMenuItems, setChildMenuItems] = useState(false);

  // Fetching API data for listing reviews
  const { data: fetchData } = useGetmenuOrderListQuery({ id: 0 });
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

  //   ************************ open menu items ***********************************

  const toggleChildMenuItems = (row) => {
    setSelectedRow(row?.original?.id);
    setChildMenuItems(!childMenuItems);
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

  const toggleMenuOrder = () => {
    setMenuOrder(!menuOrder);
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

        <button
          className="addButton"
          style={{
            position: "absolute",
            right: "125px",
            backgroundColor: "#18B164",
            padding: "6px",
          }}
          onClick={toggleMenuOrder}
        >
          Set Menu Order
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
          <span
            title="view details"
            className="secondIcon"
            style={{ height: "35px", width: "35px" }}
          >
            <ArrowRight
              className="iconSmall"
              onClick={() => toggleChildMenuItems(row)}
            />
          </span>
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
        tableTitle="Menu item List "
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
          <div>
            <img src={selectedImage} alt="Selected" className="large-image" />
            <button className="image-modal" onClick={toggleModal}>
              X
            </button>
          </div>
        )}
      </Modal>

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

      {menuOrder && (
        <SetOrderList isOpen={menuOrder} onClose={toggleMenuOrder} />
      )}

      {childMenuItems && (
        <ChildMenuOrderList
          isOpen={childMenuItems}
          onClose={toggleChildMenuItems}
          id={selectedRow}
        />
      )}
    </>
  );
};

export default MenuOrders;
