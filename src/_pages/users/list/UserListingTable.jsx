import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ArrowRight, Loader, Pencil } from "lucide-react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { COLUMNS } from "./userListingColumns";
import { Link, useLocation } from "react-router-dom";
import EditStatus from "./EditStatus";
import { useGetUsersListQuery } from "../../../_store/api";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../../_store/slices/userSlice";
import Modal from "react-modal";
import { Atom } from "react-loading-indicators";
import { debounce } from "lodash";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

Modal.setAppElement("#root");

const UserListingTable = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditStatus, setShowEditStatus] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [userId, setUserId] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Adjusted default page size
  const [dynamicPagination] = useState(true); // Enable or disable dynamic pagination
  const permissions = usePermissions();

  const dispatch = useDispatch();
  const location = useLocation();

  // Dynamic query with name and phoneNumber
  const { data: fetchData, isLoading } = useGetUsersListQuery({
    page: page,
    limit: pageSize,
    name,
    user_id: userId,
    phone_number,
  });

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.records) {
      setData(fetchData?.data?.records);
    } else {
      setData([]);
    }
  }, [fetchData]);
  const totalPage = fetchData?.data?.pagination?.totalPages || 1;

  useEffect(() => {
    if (location.state) {
      setPage(location.state.previousPage);
      setPageSize(location.state.previousPageSize);
    }
  }, [location.state]);

  const toggleEditStatus = (row) => {
    setSelectedRow(row);
    setShowEditStatus(!showEditStatus);
  };

  const handleViewDetails = (userId) => {
    dispatch(setCurrentUser(userId));
  };

  const toggleModal = (image) => {
    setModalIsOpen(!modalIsOpen);
    setSelectedImage(image);
  };

  const columns = useMemo(
    () => [
      ...COLUMNS(toggleModal),
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <Link
              to="/users_Profile"
              state={{
                currentPage: page,
                pageSize: pageSize,
              }}
            >
              {permissions?.["user"]?.includes("view_user_profile") && ( // Check if user has permission to view user profile}
                <span
                  title="view details"
                  className="secondIcon"
                  style={{
                    display: "inline-block",
                    height: "35px",
                    width: "35px",
                  }}
                  onClick={() => handleViewDetails(row.original.id)}
                >
                  <ArrowRight className="iconSmall" />
                </span>
              )}
            </Link>
            {permissions?.["user"]?.includes("update_user_profile_status") && ( // Check if user has permission to view user profile}
              <span className="editIcon">
                <Pencil
                  className="iconSmall"
                  onClick={() => toggleEditStatus(row.original.id)}
                />
              </span>
            )}
          </div>
        ),
      },
    ],
    [handleViewDetails, toggleEditStatus, toggleModal]
  );

  // Apply debounce to search handlers
  const debouncedSearchName = debounce((value) => setName(value), 500);
  const debouncedSearchUserId = debounce((value) => setUserId(value), 500);
  const debouncedSearchPhone = debounce((value) => setPhone_number(value), 500);

  // Search handlers with debounce
  const handleNameSearch = (e) => {
    setPage(1);
    debouncedSearchName(e?.target?.value);
  };

  const handleUserIdSearch = (e) => {
    setPage(1);
    debouncedSearchUserId(e?.target?.value);
  };
  const handleUserPhoneNumberSearch = (e) => {
    setPage(1);
    debouncedSearchPhone(e?.target?.value);
  };

  const customFilterComponent = () => (
    <div style={{ width: "100%", height: "35px" }}>
      <input
        className="inputBox"
        placeholder="Search by id"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleUserIdSearch}
      />
      <input
        className="inputBox"
        placeholder="Search by Name"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleNameSearch}
      />
      <input
        className="inputBox"
        placeholder="Search by Phone Number"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleUserPhoneNumberSearch}
      />
    </div>
  );

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
    // return <Atom color="#32cd32" size="medium" text="" textColor="" />;
  }

  return (
    permissions?.["user"]?.includes("view_user_list") && (// Check if user has permission to view user list
      <>
        <DyCommonTable
          columns={columns}
          data={data}
          tableTitle="User List"
          includeActions={false}
          customFilterComponent={customFilterComponent}
          dynamicPagination={dynamicPagination}
          totalPage={totalPage}
          currentPage={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          showTableHeading={false}
        />

        {data?.length === 0 && (
          <div>
            <span className="no-data-new">No User Avaliable</span>
          </div>
        )}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={toggleModal}
          contentLabel="Image Modal"
          className="imageModal"
          overlayClassName="overlay"
        >
          {selectedImage && (
            <div>
              <img src={selectedImage} alt="Selected" className="large-image" />
              <button className="image-modal" onClick={toggleModal}>
                X
              </button>
            </div>
          )}
        </Modal>

        {showEditStatus && (
          <EditStatus
            isOpen={showEditStatus}
            onClose={toggleEditStatus}
            selectedRow={selectedRow}
          />
        )}
      </>
    )
  );
};

export default UserListingTable;
