import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { DASHBORDORDERCOLUMN } from "./dashboardOrderColumn";
// import { Trash, Pencil, Eye, Truck } from "lucide-react";
import { Trash, Truck, Pencil, ArrowRight } from "lucide-react";
import DeleteComponent from "../../payments/DeleteComponent";
import AddDashboardOrder from "./AddDashboardOrder";
import UpdateDashboardOrder from "./UpdateDashboardOrder";
// import NoticeDescription from "./NoticeDescription";
import AddPreferredId from "./AddPreferredId";
// import UnAssignNotice from "./UnAssignNotice";
import DragAndDropOrder from "../dashboardBanner/DragAndDropOrder";
import toast from "react-hot-toast";

import {
  useGetDashboardOrderListQuery,
  useDeleteDashboardOrderMutation,
  useUpdateDashboardOrderListMutation,
} from "../../../_store/api";

const DashboardOrderList = () => {
  //   const [showDescription, setShowDescription] = useState(false);
  const [showAssigneNotice, setShowAssigneNotice] = useState(false);
  //   const [showUnAssignNotice, setShowUnAssignNotice] = useState(false);
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdteData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [updateOrder, setUpdateOrder] = useState(false);

  // handeling api  fetching data and deleting data
  const { data: fetchData } = useGetDashboardOrderListQuery();
  const [deleteData] = useDeleteDashboardOrderMutation();
  const [createData, { isLoading }] = useUpdateDashboardOrderListMutation();

  // store data
  useEffect(() => {
    // console.log("fetchData gifts", fetchData?.data.rows);
    if (fetchData) {
      setData(fetchData?.data?.dashboardOrders);
    }
  }, [fetchData]);

  // function for description

 

  const toggleAssignNotice = (row) => {
    setShowAssigneNotice(!showAssigneNotice);
    setSelectedRow(row.original);
  };

  //   const toggleUnAssignNoticeNotice = (row) => {
  //     setShowUnAssignNotice(!showUnAssignNotice);
  //     setSelectedRow(row.original);
  //   };

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

  const toggleSetOrderData = (row) => {
    setSelectedRow(row);
    setUpdateOrder(!updateOrder);
  };

  const handleOrderUpdate = async (newOrder) => {
    console.log("newOrder", newOrder);
    try {
      const payload = {
        preferred_ids: newOrder, // Assuming newOrder is already an array of IDs
      };

      const result = await createData({
        body: payload,
        id: selectedRow.id, // Using the selectedRow we stored in toggleSetOrderData
      }).unwrap();

      if (result.data.status) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }

      // You might want to add a toast notification here
      setUpdateOrder(false);
    } catch (error) {
      console.error("Error updating order:", error);
      // Handle error (show toast, etc.)
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
        Add List
      </button>
    );
  };

  const columns = useMemo(
    () => [
      ...DASHBORDORDERCOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            {/* <span
              title="view details"
              className="secondIcon"
              style={{ height: "35px", width: "35px" }}
            >
              <Eye
                className="iconSmall"
                onClick={() => toggleDescription(row)}
              />
            </span> */}
            {/* <span className="editIcon" style={{ backgroundColor: "#8f7a1cfc" }}>
              <Truck
                className="iconSmall"
                onClick={() => toggleAssignNotice(row)}
              />
            </span> */}
            <span className="editIcon" style={{ backgroundColor: "#000" }}>
              <ArrowRight
                className="iconSmall"
                onClick={() => toggleSetOrderData(row.original)}
              />
            </span>
            <span className="editIcon">
              <Pencil
                className="iconSmall"
                onClick={() => toggleUpdateData(row.original)}
              />
            </span>
            <span className="editIcon" style={{ backgroundColor: "#8f7a1cfc" }}>
              <Truck
                className="iconSmall"
                onClick={() => toggleAssignNotice(row)}
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
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Dashboard Order List"
        AddPackageButton={AddButton}
      />

      {addData && (
        <AddDashboardOrder isOpen={addData} onClose={toggleAddData} />
      )}

      {showAssigneNotice && (
        <AddPreferredId
          isOpen={showAssigneNotice}
          onClose={toggleAssignNotice}
          selectedRow={selectedRow}
        />
      )}

      {/* {showDescription && (
        <NoticeDescription
          isOpen={showDescription}
          onClose={toggleDescription}
          Description={selectedRow?.description}
        />
      )}
 

      {showUnAssignNotice && (
        <UnAssignNotice
          isOpen={showUnAssignNotice}
          onClose={toggleUnAssignNoticeNotice}
          selectedRow={selectedRow}
        />
      )}

   
      */}

      {updateOrder && (
        <DragAndDropOrder
          isOpen={updateOrder}
          onClose={toggleSetOrderData}
          selectedRow={selectedRow?.preferred_ids || []}
          onSubmit={handleOrderUpdate}
        />
      )}

      {updateData && (
        <UpdateDashboardOrder
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

export default DashboardOrderList;
