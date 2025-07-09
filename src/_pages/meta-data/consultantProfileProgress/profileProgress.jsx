import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { CONSULTANTPROGRESSCOLUMN } from "./profileProgressColumn";
import { Pencil, Trash } from "lucide-react";
import AddProfileProgress from "./AddProfileProgress";
import UpdateProfileProgress from "./UpdateProfileProgress";
import { useGetProfileProgressListQuery } from "../../../_store/api";

const ProfileProgress = () => {
  const [addService, setAddService] = useState(false);
  const [updateService, setUpdateService] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);

  // calling api for listing data and deleting data

  const { data: fetchData } = useGetProfileProgressListQuery();

  // fetching api

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setData(fetchData?.data);
    }
  }, [fetchData]);

  //  add service
  const toggleAddService = () => {
    setAddService(!addService);
  };

  // Update service

  const toggleUpdateService = (row) => {
    setSelectedRow(row);
    setUpdateService(!updateService);
  };

  // function for delete row

  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  // Button component to add package
  const AddPackageButton = () => {
    return (
      <button
        className="addButton"
        style={{
          position: "absolute",
          right: "20px",
          backgroundColor: "#18B164",
          padding: "6px",
        }}
        onClick={() => toggleAddService()}
      >
        Add Progress Lavel
      </button>
    );
  };

  // Memoized columns definition for the table
  const columns = useMemo(
    () => [
      ...CONSULTANTPROGRESSCOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span
              className="editIcon"
              onClick={() => toggleUpdateService(row.original)}
            >
              <Pencil className="iconSmall" />
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
        tableTitle=" Consultant Profile Progress"
        AddPackageButton={AddPackageButton}
        showTableHeading={false}
      />
      {addService && (
        <AddProfileProgress isOpen={addService} onClose={toggleAddService} />
      )}

      {updateService && (
        <UpdateProfileProgress
          isOpen={updateService}
          onClose={toggleUpdateService}
          selectedRow={selectedRow}
        />
      )}
    </>
  );
};

export default ProfileProgress;
