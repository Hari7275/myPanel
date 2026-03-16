import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { CHATCATEGORYCOLUMN } from "./chatCategoryColumn";
import { Trash, Pencil, ArrowRight } from "lucide-react";
import DeleteComponent from "../../payments/DeleteComponent";
import AddChatCategory from "./AddChatCategory";
import UpdateChatCategory from "./UpdateChatCategory";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";
import { debounce } from "lodash";
import { Atom } from "react-loading-indicators";
import { Link } from "react-router-dom";

import {
  useGetChatCategoryListQuery,
  useDeleteCmsBlogAuthorMutation,
} from "../../../_store/api";

const ChatCategory = () => {
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdteData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const permissions = usePermissions();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [dynamicPagination, setDynamicPagination] = useState(true);

  const [categorySearch, setCategorySearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [roleId, setRoleId] = useState("user");

  // handeling api  fetching data and deleting data
  const { data: fetchData, isLoading } = useGetChatCategoryListQuery({
    page,
    pageSize,
    categorySearch,
    roleId,
  });
  const [deleteData] = useDeleteCmsBlogAuthorMutation();

  // store data
  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data?.data || []);
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
          Add Chat Category
        </button>
        {/* )} */}
      </>
    );
  };

  const columns = useMemo(
    () => [
      ...CHATCATEGORYCOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <Link to={`/chat-message/${row.original.id}`}>
              <span
                title="View details"
                className="secondIcon"
                style={{
                  display: "inline-block",
                  height: "35px",
                  width: "35px",
                }}
              >
                <ArrowRight className="iconSmall" />
              </span>
            </Link>
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
    [data],
  );

  const handleSetUserType = (e) => {
    setPage(1);
    setRoleId(e.target.value);
  };

  // ✅ Create debounced function only once
  const debouncedSearchCategory = useMemo(
    () => debounce((value) => setCategorySearch(value), 1500),
    [],
  );

  const handleCategorySearch = (e) => {
    const value = e?.target?.value || "";
    setSearchInput(value); // Update input immediately
    setPage(1);
    debouncedSearchCategory(value);
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
        placeholder="Search Any Category"
        value={searchInput}
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleCategorySearch}
      />

      <select
        className="inputBox"
        style={{
          marginLeft: "10px",
          height: "-webkit-fill-available",
          width: "10%",
        }}
        onClick={handleSetUserType}
        value={roleId}
      >
        <option value="user">User</option>
        <option value="listener">Listener</option>
      </select>
    </div>
  );

  const totalPage = fetchData?.pagination?.totalPages || 1;

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  return (
    <>
      <DyCommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Chat Category List"
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

      {addData && <AddChatCategory isOpen={addData} onClose={toggleAddData} />}

      {updateData && (
        <UpdateChatCategory
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

export default ChatCategory;
