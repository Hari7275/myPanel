import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { CMSLISTENERBANNERCOLUMN } from "./cmsListenerBannerColumn";
import { Trash, Pencil } from "lucide-react";
import DeleteComponent from "../../payments/DeleteComponent";
import AddCmsListenerBanner from "./AddCmsListenerBanner";
import UpdateCmsListenerBanner from "./UpdateCmsListenerBanner";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";
import { Atom } from "react-loading-indicators";

import {
  useGetCmsListenerBannerListQuery,
  useDeleteCmsListenerBannerMutation,
} from "../../../_store/api";

const CmsListenerBanner = () => {
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdteData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const permissions = usePermissions();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [dynamicPagination, setDynamicPagination] = useState(true);

  // handeling api  fetching data and deleting data
  const { data: fetchData, isLoading } = useGetCmsListenerBannerListQuery({
    page,
    pageSize,
  });
  const [deleteData] = useDeleteCmsListenerBannerMutation();

  // store data
  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data);
    } else {
      setData([]);
    }
  }, [fetchData]);

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
    if (selectedRow && selectedRow._id) {
      deleteData({ id: selectedRow._id }).then(() => {
        setShowDeleteComponent(false);
      });
    }
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
          onClick={toggleAddData}
        >
          Add Banner
        </button>
      </>
    );
  };

  const columns = useMemo(
    () => [
      ...CMSLISTENERBANNERCOLUMN,
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
    [data]
  );

  const totalPage = fetchData?.pagination
    ? Math.ceil(fetchData.pagination.total / fetchData.pagination.size)
    : 1;

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  return (
    <>
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Listener Banner List"
        dynamicPagination={dynamicPagination}
        AddPackageButton={AddButton}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        includeCheckbox={false}
        showTableHeading={false}
      />

      {addData && (
        <AddCmsListenerBanner isOpen={addData} onClose={toggleAddData} />
      )}

      {updateData && (
        <UpdateCmsListenerBanner
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

export default CmsListenerBanner;
