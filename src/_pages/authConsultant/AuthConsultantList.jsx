import React, { useMemo, useState, useEffect, useRef } from "react";
import DyCommonTable from "../../_components/table/DyCommonTable";
import { CONSULTANT_COLUMNS } from "./AuthConsultantListColumn";
import { useGetUnregisteredConsultantsListQuery } from "../../_store/api";
import { useDispatch } from "react-redux";
import { ArrowRight, Pencil, KeyRound, BarChart3 } from "lucide-react";
import Button from "@mui/material/Button";
import AuthConsultantRegisteredGraph from "./AuthConsultantRegisteredGraph";
import AssignOnboardingToAdmin from "../../_components/reuseComponents/AssignOnboardingToAdmin";
import { resetActiveTab } from "../../_store/slices/activeSlice";
import { debounce } from "lodash";
import { Atom } from "react-loading-indicators";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthConsultantList = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [email_address, setEmailAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [consultantId, setConsultantId] = useState("");
  const [page, setPage] = useState(1);
  const pageRef = useRef(page);
  const [pageSize, setPageSize] = useState(15);
  const [dynamicPagination, setDynamicPagination] = useState(true);
  const [showOnboardingAssignTask, setShowOnboardingAssignTask] =
    useState(false);
  const { user } = useSelector((state) => state.auth);
  const [showGraph, setShowGraph] = useState(false);

  const location = useLocation();
  const [count, setCount] = useState(0);

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetUnregisteredConsultantsListQuery({
    page,
    size: pageSize,
    email_address: email_address,
    id: consultantId,
    phone_number: phone,
  });

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data) {
      const consultantData = fetchData?.data;
      setData(consultantData);
    } else {
      setData([]);
    }
    dispatch(resetActiveTab());
  }, [fetchData, resetActiveTab]);

  const totalPage = fetchData?.meta?.total
    ? Math.ceil(fetchData.meta.total / pageSize)
    : 1;

  useEffect(() => {
    if (location.state) {
      setPage(location.state.previousPage);
      setPageSize(location.state.previousPageSize);
    }
  }, [location.state]);

  // const columns = useMemo(() => [...CONSULTANT_COLUMNS], []);

  const toggleOnboardingStatus = (row) => {
    setShowOnboardingAssignTask(!showOnboardingAssignTask);
    setSelectedRow(row);
  };

  const columns = useMemo(
    () => [
      ...CONSULTANT_COLUMNS,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            {row.original.is_assign == 0 && (
              <span className="editIcon" style={{ background: "#c65252ff" }}>
                <KeyRound
                  className="iconSmall"
                  onClick={() => toggleOnboardingStatus(row.original)}
                />
              </span>
            )}
          </div>
        ),
      },
    ],
    []
  );

  // Apply debounce to search handlers
  const debouncedSearchEmailAddress = debounce(
    (value) => setEmailAddress(value),
    500
  );
  const debouncedSearchConsultantId = debounce(
    (value) => setConsultantId(value),
    500
  );
  const debouncedSearchPhone = debounce((value) => setPhone(value), 500);

  const handleEmailSearch = (e) => {
    setPage(1);
    debouncedSearchEmailAddress(e?.target?.value);
  };

  const handleConsultantIdSearch = (e) => {
    setPage(1);
    debouncedSearchConsultantId(e?.target?.value);
  };

  const handleConsultantPhoneSearch = (e) => {
    setPage(1);
    debouncedSearchPhone(e?.target?.value);
  };

  const customFilterComponent = () => (
    <div style={{ width: "100%", height: "35px", display: "flex" }}>
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
        placeholder="Search by Email"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleEmailSearch}
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

      <div style={{ marginLeft: "20px" }}>
        <Button
          variant="contained"
          onClick={() => setShowGraph(true)}
        >
          <BarChart3 style={{ marginRight: "6px" }} />
        </Button>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <DyCommonTable
        columns={columns}
        data={data}
        tableTitle="Unregistered Consultant List"
        customFilterComponent={customFilterComponent}
        dynamicPagination={dynamicPagination}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        showTableHeading={false}
        includeCheckbox={false}
      />

      {/* <p>{count}</p>

      <button onClick={() => setCount(count + 1)}>INcrement</button> */}
      {data?.length == 0 && (
        <span className="no-data-new">No Consultant Avaliable</span>
      )}

      {showOnboardingAssignTask && (
        <AssignOnboardingToAdmin
          isOpen={showOnboardingAssignTask}
          onClose={toggleOnboardingStatus}
          selectedRow={selectedRow?.id}
          created={false}
          adminId={user.id}
        />
      )}
      {showGraph && (
        <AuthConsultantRegisteredGraph
          isOpen={showGraph}
          onClose={() => setShowGraph(false)}
        />
      )}
    </div>
  );
};

export default AuthConsultantList;
