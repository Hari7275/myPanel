import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { Trash, Pencil, Eye } from "lucide-react";
import DeleteComponent from "../../payments/DeleteComponent";
import UpdateTestimonial from "./UpdateTestimonial";
import CreateTestimonial from "./CreateTestimonial";
import { CMSTESTIMONIALCOLUMN } from "./testimonialColumn";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";
import {
  useGetCmsTestimonialListQuery,
  useDeleteCmsTestimonialMutation,
} from "../../../_store/api";

import toast from "react-hot-toast";
import { Atom } from "react-loading-indicators";

const TestimonialList = () => {
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

  // handeling api  fetching data and deleting data
  const { data: fetchData, isLoading } = useGetCmsTestimonialListQuery({
    page,
    pageSize,
  });
  const [deleteData] = useDeleteCmsTestimonialMutation();

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

  const handleDelete = async () => {
    if (selectedRow?._id) {
      try {
        const responseDeleteData = await deleteData({
          id: selectedRow._id,
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
          Add Testimonial
        </button>
        {/* )} */}
      </>
    );
  };

  const columns = useMemo(
    () => [
      ...CMSTESTIMONIALCOLUMN,
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
    [data],
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
      {addData && (
        <CreateTestimonial isOpen={addData} onClose={toggleAddData} />
      )}
      {updateData && (
        <UpdateTestimonial
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
export default TestimonialList;
