import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { CMSBLOGCATEGORIESCOLUMN } from "./cmsBlogCategoriesColumn";
import { Trash, Pencil } from "lucide-react";
import DeleteComponent from "../../payments/DeleteComponent";
import AddCmsBlogCategories from "./AddCmsBlogCategories";
import UpdateCmsBlogCategories from "./UpdateCmsBlogCategories";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

import {
  useGetCmsBlogCategoriesListQuery,
  useDeleteCmsBlogCategoriesMutation,
} from "../../../_store/api";

const CmsBlogCategories = () => {
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdteData] = useState(false);

  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);

  const permissions = usePermissions();

  // handeling api  fetching data and deleting data
  const { data: fetchData } = useGetCmsBlogCategoriesListQuery();
  const [deleteData] = useDeleteCmsBlogCategoriesMutation();

  // store data
  useEffect(() => {
    // console.log("fetchData gifts", fetchData?.data.rows);
    if (fetchData) {
      setData(fetchData?.data);
    } else {
      setData([]);
    }
  }, [fetchData]);

  // function for description

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
      <>
        {permissions?.["meta_data_section"]?.includes(
          "create_dashboard_banner"
        ) && (
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
            Add Blog Category
          </button>
        )}
      </>
    );
  };

  const columns = useMemo(
    () => [
      ...CMSBLOGCATEGORIESCOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            {permissions?.["meta_data_section"]?.includes(
              "update_dashboard_banner"
            ) && (
              <span className="editIcon">
                <Pencil
                  className="iconSmall"
                  onClick={() => toggleUpdateData(row.original)}
                />
              </span>
            )}
            {permissions?.["meta_data_section"]?.includes(
              "delete_dashboard_banner"
            ) && (
              <span className="deleteIcon">
                <Trash
                  className="iconSmall"
                  onClick={() => toggleDeleteComponent(row.original)}
                />
              </span>
            )}
          </div>
        ),
      },
    ],
    [data]
  );

  return (
    <>
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle=" Dashboard Bannner list"
        AddPackageButton={AddButton}
        showTableHeading={false}
      />

      {addData && (
        <AddCmsBlogCategories isOpen={addData} onClose={toggleAddData} />
      )}

      {updateData && (
        <UpdateCmsBlogCategories
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

export default CmsBlogCategories;
