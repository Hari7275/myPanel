import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { GIFTCOLUMN } from "./giftColumn";
import { Trash, ArrowRight, Pencil } from "lucide-react";
import DeleteComponent from "../../payments/DeleteComponent";
import GiftDescription from "./GiftDescription";

import AddGiftPrice from "./AddGiftPrice";
import UpdateGiftPrice from "./UpdateGiftPrice";
import {
  useGetGiftListQuery,
  useDeleteGiftPriceMutation,
} from "../../../_store/api";
import toast from "react-hot-toast";
import { PARTICULARGIFTPRICECOLUMN } from "./giftColumn";

const GiftPrice = ({ selectedData, giftId }) => {
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdteData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20); // Adjusted default page size
  const [dynamicPagination, setDynamicPagination] = useState(true); // Enable or disable dynamic paginations

  const [deleteData] = useDeleteGiftPriceMutation();

  console.log("selectedData....", selectedData);

  //  toggle function for adding new data

  const toggleAddData = () => {
    console.log("selectedData", selectedData[0]?.gift_id);
    setAddData(!addData);
  };

  //  toggle function for updating data

  const toggleUpdateData = (row) => {
    setSelectedRow(row);
    setUpdteData(!updateData);
  };

  //  function for delete component
  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  const handleDelete = async () => {
    if (!selectedRow?.id) return;

    try {
      const response = await deleteData({ id: selectedRow.id }).unwrap();

      toast.success(response?.message || "Deleted successfully");
      setShowDeleteComponent(false);
      setSelectedRow(null); // Clear selected row
    } catch (error) {
      toast.error(error?.data?.message || "Delete failed");
    }
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
        onClick={toggleAddData}
      >
        Add Gift Price
      </button>
    );
  };

  const columns = useMemo(
    () => [
      ...PARTICULARGIFTPRICECOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span className="editIcon">
              <Pencil
                className="iconSmall"
                onClick={() => toggleUpdateData(row.original)}
              />
            </span>
            <span className="deleteIcon">
              <Trash
                className="iconSmall"
                onClick={() => toggleDeleteComponent(row.original)}
              />
            </span>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <DyCommonTable
        columns={columns}
        data={selectedData}
        includeActions={false}
        tableTitle="Gifts Price List"
        AddPackageButton={AddButton}
        dynamicPagination={dynamicPagination}
        // totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        includeCheckbox={false}
        showTableHeading={false}
      />

      {addData && (
        <AddGiftPrice
          isOpen={addData}
          gift_id={giftId}
          onClose={toggleAddData}
        />
      )}

      {updateData && (
        <UpdateGiftPrice
          isOpen={updateData}
          onClose={toggleUpdateData}
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

export default GiftPrice;
