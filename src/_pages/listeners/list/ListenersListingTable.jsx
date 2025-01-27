import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { LISTENERSCOLUMNS } from "./listenersListingColumn";
import { ArrowRight, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import EditStatus from "../../../_components/reuseComponents/EditStatus";
import { useGetConsultantsListQuery } from "../../../_store/api";
import { useDispatch } from "react-redux";
import { setCurrentConsultant } from "../../../_store/slices/consultantSlice";
import { debounce } from "lodash";

const ListenersListingTable = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditStatus, setShowEditStatus] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consultantId, setConsultantId] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dynamicPagination, setDynamicPagination] = useState(true);

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetConsultantsListQuery({
    page,
    size: pageSize,
    name: name,
    id: consultantId,
    phone,
    consultant_type: 3,
  });

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.records) {
      const consultantData = fetchData?.data?.records?.filter(
        (record) => record?.consultant_type === 3
      );
      setData(consultantData);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const totalPage = fetchData?.data?.total_records
    ? Math.ceil(fetchData.data.total_records / pageSize)
    : 1;

  console.log("totalPage", totalPage);

  const toggleEditStatus = (row) => {
    setSelectedRow(row);
    setShowEditStatus(!showEditStatus);
  };

  const handleActionClick = (data) => {
    dispatch(setCurrentConsultant(data?.id));
  };

  const columns = useMemo(
    () => [
      ...LISTENERSCOLUMNS,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <Link to="/listener_Profile">
              <span
                title="view details"
                className="secondIcon"
                style={{
                  display: "inline-block",
                  height: "35px",
                  width: "35px",
                }}
              >
                <ArrowRight
                  className="iconSmall"
                  onClick={() => handleActionClick(row.original)}
                />
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
    []
  );

  // Apply debounce to search handlers
  const debouncedSearchName = debounce((value) => setName(value), 500);
  const debouncedSearchConsultantId = debounce(
    (value) => setConsultantId(value),
    500
  );
  const debouncedSearchPhone = debounce((value) => setPhone(value), 500);

  const handleNameSearch = (e) => {
    debouncedSearchName(e?.target?.value);
  };

  const handleConsultantIdSearch = (e) => {
    debouncedSearchConsultantId(e?.target?.value);
  };

  const handleConsultantPhoneSearch = (e) => {
    debouncedSearchPhone(e?.target?.value);
  };

  const customFilterComponent = () => (
    <div style={{ width: "100%", height: "35px" }}>
      <input
        className="inputBox"
        placeholder="Search by Id"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleConsultantIdSearch}
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
        placeholder="Search by Phone No."
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleConsultantPhoneSearch}
      />
    </div>
  );

  if (isLoading) {
    return "Loading ...";
  }
  if (error) {
    return "Error...";
  }

  return (
    <>
      <DyCommonTable
        columns={columns}
        data={data}
        tableTitle="Listeners"
        includeActions={false}
        customFilterComponent={customFilterComponent}
        dynamicPagination={dynamicPagination}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
      />

      {data?.length == 0 && (
        <span className="no-data-new">No Listener Avaliable</span>
      )}

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

export default ListenersListingTable;
