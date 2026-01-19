import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../../_components/table/DyCommonTable";
import { NOTIFICATIONTAMPLATECOLUMN } from "./notificationTamplateColumn";
import { Trash, ArrowRight, Pencil, Info } from "lucide-react";
import DeleteComponent from "../../../payments/DeleteComponent";
import GiftDescription from "../../gifts/GiftDescription";
import CreateNotificationTamplate from "./CreateNotificationTamplate";
import UpdateNotificationTamplate from "./UpdateNotificationTamplate";
import { useGetUserNotificationTamplateListQuery } from "../../../../_store/api";

import { useDeleteUserNotificationemplateMutation } from "../../../../_store/api";

const NotificationTamplateList = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdteData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Adjusted default page size
  const [dynamicPagination, setDynamicPagination] = useState(true); // Enable or disable dynamic paginations

  // handeling api  fetching data and deleting data
  const { data: fetchData } = useGetUserNotificationTamplateListQuery({
    page,
    size: pageSize,
  });
  const [deleteData] = useDeleteUserNotificationemplateMutation();

  const totalPage = fetchData?.meta?.total_page || 1;

  // store data
  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data?.records);
    }
  }, [fetchData]);

  // function for description

  const toggleDescription = (row) => {
    setSelectedRow(row.original);
    setShowDescription(!showDescription);
  };

  //  toggle function for adding new data

  const toggleAddData = () => {
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

  const handleDelete = () => {
    if (selectedRow && selectedRow.id) {
      deleteData({ id: selectedRow.id }).then(() => {
        setShowDeleteComponent(false);
      });
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
        Create Template
      </button>
    );
  };

  const columns = useMemo(
    () => [
      ...NOTIFICATIONTAMPLATECOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span
              title="view message"
              className="secondIcon"
              style={{ height: "35px", width: "35px" }}
            >
              <Info
                className="iconSmall"
                onClick={() => toggleDescription(row)}
              />
            </span>
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
    [],
  );

  return (
    <>
      <DyCommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="User Notifications Template"
        AddPackageButton={AddButton}
        dynamicPagination={dynamicPagination}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        includeCheckbox={false}
        showTableHeading={false}
      />

      {showDescription && (
        <GiftDescription
          isOpen={showDescription}
          onClose={toggleDescription}
          Description={selectedRow?.message}
        />
      )}

      {addData && (
        <CreateNotificationTamplate isOpen={addData} onClose={toggleAddData} />
      )}

      {updateData && (
        <UpdateNotificationTamplate
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

export default NotificationTamplateList;
