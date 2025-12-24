import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { CMSFAQsCOLUMN } from "./faqsColumn";
import { Trash, Pencil, Eye } from "lucide-react";
import DeleteComponent from "../../payments/DeleteComponent";
import CreateFAQs from "./CreateFAQs";
import UpdateFAQs from "./UpdateFAQs";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";
import {
  useGetCmsFAQsListQuery,
  useDeleteCmsFAQsMutation,
} from "../../../_store/api";
import NoticeDescription from "../../masterComponents/noticeManager/noticeList/NoticeDescription";
import { debounce } from "lodash";

const FAQsList = () => {
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
  const { data: fetchData } = useGetCmsFAQsListQuery({
    page,
    pageSize,
    platformType,
    name,
  });
  const [deleteData] = useDeleteCmsFAQsMutation();

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
          Add FAQs
        </button>
        {/* )} */}
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
    [data]
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

  return (
    <>
      <DyCommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="CMS FAQs List"
        AddPackageButton={AddButton}
        customFilterComponent={customFilterComponent}
        dynamicPagination={dynamicPagination}
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
export default FAQsList;
