import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { Trash, Pencil, Eye } from "lucide-react";
import DeleteComponent from "../../payments/DeleteComponent";
import CreateTheAppPage from "./CreateTheAppPage";
import UpdateTheAppPage from "./UpdateTheAppPage";
import { CMSTHEAPPPAGECOLUMN } from "./thePageColumn";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";
import {
  useGetCmsTheAppPageListQuery,
  useDeleteCmsTheAppPageMutation,
} from "../../../_store/api";
import NoticeDescription from "../../masterComponents/noticeManager/noticeList/NoticeDescription";
import { debounce } from "lodash";
import toast from "react-hot-toast";
import { Atom } from "react-loading-indicators";

const TheAppPage = () => {
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdteData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [dynamicPagination, setDynamicPagination] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const [name, setName] = useState("");
  const [platformType, setPlatformType] = useState("");
  const permissions = usePermissions();

  // handeling api  fetching data and deleting data
  const { data: fetchData, isLoading } = useGetCmsTheAppPageListQuery({
    page,
    pageSize,
    platformType,
    name,
  });
  const [deleteData] = useDeleteCmsTheAppPageMutation();

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

  const toggleDescription = (row) => {
    setSelectedRow(row.original);
    setShowDescription(!showDescription);
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

  //   const handleDelete = () => {
  //     if (selectedRow && selectedRow.id) {
  //       const responseDeleteData = deleteData({ id: selectedRow.id }).then(() => {
  //         setShowDeleteComponent(false);
  //       });
  //     }
  //   };

  const handleDelete = async () => {
    if (selectedRow?.id) {
      try {
        const responseDeleteData = await deleteData({
          id: selectedRow.id,
        }).unwrap();

        if (responseDeleteData?.status) {
          toast.success(
            responseDeleteData?.message || "Page deleted successfully",
          );
          setShowDeleteComponent(false);
        } else {
          toast.error(responseDeleteData?.message || "Failed to delete page");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
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
          Add The App Page
        </button>
        {/* )} */}
      </>
    );
  };

  const columns = useMemo(
    () => [
      ...CMSTHEAPPPAGECOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span
              title="view details"
              className="secondIcon"
              style={{ height: "35px", width: "35px" }}
            >
              <Eye
                className="iconSmall"
                onClick={() => toggleDescription(row)}
              />
            </span>
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
  const debouncedSearchUserName = debounce((value) => setName(value), 500);

  const handleUserNameSearch = (e) => {
    setPage(1);
    debouncedSearchUserName(e?.target?.value);
  };

  const handleSetPlatformType = (e) => {
    setPage(1);
    setPlatformType(e.target.value);
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
      <select
        className="inputBox"
        style={{
          marginLeft: "10px",
          height: "-webkit-fill-available",
          width: "10%",
        }}
        onChange={handleSetPlatformType}
      >
        <option>Select Type</option>
        <option value={0}>collaborator</option>
        <option value={1}>Consultant</option>
        <option value={2}>User</option>
      </select>
      <input
        className="inputBox"
        placeholder="Search by Title"
        style={{
          marginLeft: "10px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleUserNameSearch}
      />
    </div>
  );

  const totalPage = fetchData?.meta?.total_pages || 1;

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
        tableTitle="CMS App Page List"
        AddPackageButton={AddButton}
        // customFilterComponent={customFilterComponent}
        dynamicPagination={dynamicPagination}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        includeCheckbox={false}
        showTableHeading={false}
      />
      {addData && <CreateTheAppPage isOpen={addData} onClose={toggleAddData} />}
      {updateData && (
        <UpdateTheAppPage
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

      {showDescription && (
        <NoticeDescription
          isOpen={showDescription}
          onClose={toggleDescription}
          Description={selectedRow?.description}
        />
      )}
    </>
  );
};
export default TheAppPage;
