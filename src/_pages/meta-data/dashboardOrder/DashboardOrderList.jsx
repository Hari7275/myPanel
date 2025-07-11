import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { DASHBORDORDERCOLUMN } from "./dashboardOrderColumn";
import { Trash, Truck, Pencil } from "lucide-react";
import DeleteComponent from "../../payments/DeleteComponent";
import AddDashboardOrder from "./AddDashboardOrder";
import UpdateDashboardOrder from "./UpdateDashboardOrder";
import AddPreferredId from "./AddPreferredId";
import DragAndDropOrder from "../dashboardBanner/DragAndDropOrder";
import toast from "react-hot-toast";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

import {
  useGetDashboardOrderListQuery,
  useDeleteDashboardOrderMutation,
  useUpdateDashboardOrderListMutation,
} from "../../../_store/api";

const DashboardOrderList = () => {
  const [showAssigneNotice, setShowAssigneNotice] = useState(false);

  const [addData, setAddData] = useState(false);
  const [updateData, setUpdteData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [updateOrder, setUpdateOrder] = useState(false);

  // handeling api  fetching data and deleting data
  const { data: fetchData } = useGetDashboardOrderListQuery();
  const [deleteData, { isLoading }] = useDeleteDashboardOrderMutation();
  const [createData] = useUpdateDashboardOrderListMutation();
  const permissions = usePermissions();

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
      console.error("Error updating ", error);
      // Handle error (show toast, etc.)
    }
  };

  const AddButton = () => {
    return (
      permissions?.["meta_data_section"]?.includes("create_dashboard_order") &&
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
            <span className="editIcon" style={{ backgroundColor: "#000" }}>
              <img
                src="/drag-drop-w.png"
                // alt="D&D icon"
                className="iconSmall"
                onClick={() => toggleSetOrderData(row.original)}
              />
            </span>
            {permissions?.["meta_data_section"]?.includes("update_dashboard_order") &&
              <>
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
              </>}
            {permissions?.["meta_data_section"]?.includes("delete_dashboard_order") &&
              <span className="deleteIcon">
                <Trash
                  className="iconSmall"
                  onClick={() => toggleDeleteComponent(row.original)}
                />
              </span>
            }
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
        showTableHeading={false}
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
