import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";

import { RECHARGECOLUMN } from "./rechargePlansColumns";
import { Pencil, Trash } from "lucide-react";
import {
  useGetRechargeListQuery,
  useDeleterRechargeMutation,
} from "../../../_store/api";
import DeleteComponent from "../DeleteComponent";
import EditRechargePlans from "./EditRechargePlans";
import AddRechargePlans from "./AddRechargePlans";
import { Atom } from "react-loading-indicators";

const RechargePlansList = () => {
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [showEditComponent, setShowEditComponent] = useState(false);
  const [showAddComponent, setShowAddComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);

  // Fetching recharge plans data using RTK Query.

  const { data: fetchData, isLoading } = useGetRechargeListQuery();

  const [deleteRecharge] = useDeleterRechargeMutation();

  // Memoizing the fetched data for the table

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setData(fetchData?.data || []);
    } else {
      setData([]);
    }
  }, [fetchData]);

  // Function to toggle the delete component and set the selected row
  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  // Function to toggle the edit component and set the selected row
  const toggleEditComponent = (row) => {
    setSelectedRow(row);
    setShowEditComponent(!showEditComponent);
  };

  const toggleAddComponent = () => {
    setShowAddComponent(!showAddComponent);
  };

  // Function to handle the deletion of a recharge plan
  const handleDelete = () => {
    if (selectedRow && selectedRow?.id) {
      deleteRecharge({ id: selectedRow?.id }).then(() => {
        setShowDeleteComponent(false);
      });
    }
  };

  // Button component to add a new recharge plan
  const AddPackageButton = () => (
    <button
      className="addButton"
      style={{
        position: "absolute",
        right: "20px",
        backgroundColor: "#18B164",
        padding: "6px",
      }}
      onClick={toggleAddComponent}
    >
      Add Plan
    </button>
  );

  // Memoizing the columns definition for the table
  const columns = useMemo(
    () => [
      ...RECHARGECOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span
              className="editIcon"
              onClick={() => toggleEditComponent(row?.original)}
            >
              <Pencil className="iconSmall" />
            </span>
            <span className="deleteIcon">
              <Trash
                className="iconSmall"
                onClick={() => toggleDeleteComponent(row?.original)}
              />
            </span>
          </div>
        ),
      },
    ],
    []
  );

  // at the time of loading page (data)

  


  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  return (
    <>
      {}
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Recharge Plans"
        AddPackageButton={AddPackageButton}
      />

      {showDeleteComponent && (
        <DeleteComponent
          isOpen={showDeleteComponent}
          onClose={() => setShowDeleteComponent(false)}
          onDelete={handleDelete}
        />
      )}

      {showEditComponent && (
        <EditRechargePlans
          isOpen={showEditComponent}
          onClose={toggleEditComponent}
          selectedRow={selectedRow}
        />
      )}

      {showAddComponent && (
        <AddRechargePlans
          isOpen={showAddComponent}
          onClose={toggleAddComponent}
        />
      )}
    </>
  );
};

export default RechargePlansList;
