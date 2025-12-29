import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { CMSBLOGCOLUMN } from "./cmsBlogColumn";
import { Trash, Pencil } from "lucide-react";
import DeleteComponent from "../../payments/DeleteComponent";
import AddCmsBlog from "./AddCmsBlog";
import UpdateCmsBlogList from "./UpdateCmsBlogList";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";
import { debounce } from "lodash";

import {
  useGetCmsBlogListQuery,
  useDeleteCmsBlogAuthorMutation,
} from "../../../_store/api";

const CmsBlogList = () => {
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdteData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const permissions = usePermissions();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [dynamicPagination, setDynamicPagination] = useState(true);

  const [blogSlug, setBlogSlug] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // handeling api  fetching data and deleting data
  const { data: fetchData } = useGetCmsBlogListQuery({
    page,
    pageSize,
    blogSlug,
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
        {/* {permissions?.["meta_data_section"]?.includes(
          "create_dashboard_banner"
        ) && ( */}
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
          Add Blog
        </button>
        {/* )} */}
      </>
    );
  };

  const columns = useMemo(
    () => [
      ...CMSBLOGCOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            {/* {permissions?.["meta_data_section"]?.includes(
              "update_dashboard_banner"
            ) && ( */}
            <span className="editIcon">
              <Pencil
                className="iconSmall"
                onClick={() => toggleUpdateData(row.original)}
              />
            </span>
            {/* )} */}
            {/* {permissions?.["meta_data_section"]?.includes(
              "delete_dashboard_banner"
            ) && ( */}
            <span className="deleteIcon">
              <Trash
                className="iconSmall"
                onClick={() => toggleDeleteComponent(row.original)}
              />
            </span>
            {/* )} */}
          </div>
        ),
      },
    ],
    [data]
  );

  // ✅ Create debounced function only once
  const debouncedSearchBlogSlug = useMemo(
    () => debounce((value) => setBlogSlug(value), 1500),
    []
  );

  const handleBlogSlugSearch = (e) => {
    const value = e?.target?.value || "";
    setSearchInput(value); // Update input immediately
    setPage(1);
    debouncedSearchBlogSlug(value);
  };
  const customFilterComponent = () => (
    <div
      style={{
        width: "100%",
        height: "35px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <input
        className="inputBox"
        placeholder="Search Any Blog"
        // value={blogSlug}
        value={searchInput}
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleBlogSlugSearch}
      />
    </div>
  );

  const totalPage = fetchData?.pagination?.totalPages || 1;

  return (
    <>
      <DyCommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="CMS Blog List"
        dynamicPagination={dynamicPagination}
        AddPackageButton={AddButton}
        customFilterComponent={customFilterComponent}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        includeCheckbox={false}
        showTableHeading={false}
      />

      {addData && <AddCmsBlog isOpen={addData} onClose={toggleAddData} />}

      {updateData && (
        <UpdateCmsBlogList
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

export default CmsBlogList;
