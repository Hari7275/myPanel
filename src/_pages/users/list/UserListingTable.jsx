import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ArrowRight, Pencil } from "lucide-react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { COLUMNS } from "./userListingColumns";
import { Link } from "react-router-dom";
import EditStatus from "./EditStatus";
import { useGetUsersListQuery } from "../../../_store/api";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../../_store/slices/userSlice";
import Modal from "react-modal";

Modal.setAppElement("#root");

const UserListingTable = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditStatus, setShowEditStatus] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Adjusted default page size
  const [dynamicPagination] = useState(true); // Enable or disable dynamic pagination

  const dispatch = useDispatch();

  // Dynamic query with name and phoneNumber
  const { data: fetchData, isLoading } = useGetUsersListQuery({
    page: page,
    limit: pageSize,
    name,
    user_id: userId,
  });

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.records) {
      setData(fetchData?.data?.records);
    } else {
      setData([]);
    }
  }, [fetchData]);
  const totalPage = fetchData?.data?.pagination?.totalPages || 1;

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
            <Link to="/users_Profile">
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
            </Link>
            <span className="editIcon">
              <Pencil
                className="iconSmall"
                onClick={() => toggleEditStatus(row.original.id)}
              />
            </span>
          </div>
        ),
      },
    ],
    [handleViewDetails, toggleEditStatus, toggleModal]
  );

  // Search handlers with debounce
  const handleNameSearch = (e) => {
    setName(e?.target?.value);
  };

  const handleUserIdSearch = (e) => {
    setUserId(e?.target?.value);
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
    </div>
  );

  if (isLoading) {
    return <span className="loadPage">Data Loading...</span>;
  }

  return (
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
        className="modal"
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
  );
};

export default UserListingTable;
