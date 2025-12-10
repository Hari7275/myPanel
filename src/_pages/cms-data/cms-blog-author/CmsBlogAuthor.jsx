import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { CMSBLOGAUTHORCOLUMN } from "./cmsBlogAuthorColumn";
import { Trash, Pencil } from "lucide-react";
import DeleteComponent from "../../payments/DeleteComponent";
import AddCmsBlogAuthor from "./AddCmsBlogAuthor";
import UpdateCmsBlogAuthor from "./UpdateCmsBlogAuthor";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

import {
  useGetCmsBlogAuthorListQuery,
  useDeleteCmsBlogAuthorMutation,
} from "../../../_store/api";

const CmsBlogAuthor = () => {
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdteData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const permissions = usePermissions();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [dynamicPagination, setDynamicPagination] = useState(true);

  // handeling api  fetching data and deleting data
  const { data: fetchData } = useGetCmsBlogAuthorListQuery({
    page,
    pageSize,
  });
  const [deleteData] = useDeleteCmsBlogAuthorMutation();

  // store data
  useEffect(() => {
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
            Add Author
          </button>
        )}
      </>
    );
  };

  const columns = useMemo(
    () => [
      ...CMSBLOGAUTHORCOLUMN,
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

  const totalPage = fetchData?.meta?.total_pages || 1;

  return (
    <>
      <DyCommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="CMS Blog Author List"
        dynamicPagination={dynamicPagination}
        AddPackageButton={AddButton}
        // customFilterComponent={customFilterComponent}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        includeCheckbox={false}
        showTableHeading={false}
      />

      {addData && <AddCmsBlogAuthor isOpen={addData} onClose={toggleAddData} />}

      {updateData && (
        <UpdateCmsBlogAuthor
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

export default CmsBlogAuthor;
