import React, { useMemo, useState, useEffect } from "react";

import DyCommonTable from "../../../_components/table/DyCommonTable";
import { CMSFAQsCOLUMN } from "./faqsColumn";
import { Trash, Pencil } from "lucide-react";
import DeleteComponent from "../../payments/DeleteComponent";
import CreateFAQs from "./CreateFAQs";
import UpdateFAQs from "./UpdateFAQs";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";
import {
  useGetCmsFAQsListQuery,
  useDeleteCmsFAQsMutation,
} from "../../../_store/api";

const FAQsList = () => {
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdteData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [dynamicPagination, setDynamicPagination] = useState(true);

  const permissions = usePermissions();

  // handeling api  fetching data and deleting data
  const { data: fetchData } = useGetCmsFAQsListQuery({
    page,
    pageSize,
  });
  const [deleteData] = useDeleteCmsFAQsMutation();

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
            Add FAQs
          </button>
        )}
      </>
    );
  };

  const columns = useMemo(
    () => [
      ...CMSFAQsCOLUMN,
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

      {addData && <CreateFAQs isOpen={addData} onClose={toggleAddData} />}

      {updateData && (
        <UpdateFAQs
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

export default FAQsList;
