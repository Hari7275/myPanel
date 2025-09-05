import React, { useMemo, useState, useEffect, use } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { ASTROLOGER_COLUMNS } from "./astrologerListingColumn";
import { ArrowRight, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import EditStatus from "../../../_components/reuseComponents/EditStatus";
import { useGetConsultantsListQuery } from "../../../_store/api";
import { useDispatch } from "react-redux";
import {
  setCurrentConsultant,
  setCurrentProfileStatus,
  setConsultantType,
} from "../../../_store/slices/consultantSlice";
import { debounce } from "lodash";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Atom } from "react-loading-indicators";
import { useLocation } from "react-router-dom";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

import { statusNameToValue } from "../../../_constants/consultantConstant";

const AstrologerListingTable = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditStatus, setShowEditStatus] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [statusSearch, setStatusSearch] = useState("");
  const [consultantId, setConsultantId] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dynamicPagination, setDynamicPagination] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  let [profileStatus, SetProfileStatus] = useState(null);
  const permissions = usePermissions();

  const { data: fetchData, isLoading } = useGetConsultantsListQuery({
    page,
    size: pageSize,
    name: name,
    id: consultantId,
    phone,
    auth_status: statusSearch,
    consultant_type: 1,
  });

  const setQueryParams = (id) => {
    setSearchParams({ userId: id });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.records) {
      const consultantData = fetchData?.data?.records.filter(
        (record) => record.consultant_type === 1
      );
      setData(consultantData);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const totalPage = fetchData?.data?.total_records
    ? Math.ceil(fetchData.data.total_records / pageSize)
    : 1;

  useEffect(() => {
    if (location?.state) {
      setPage(location?.state?.previousPage);
      setPageSize(location?.state?.previousPageSize);
    }
  }, [location.state]);

  const toggleEditStatus = (row) => {
    setShowEditStatus(!showEditStatus);
    SetProfileStatus(row.status);
    setSelectedRow(row);
  };

  const handleActionClick = (data) => {
    console.log("sdfffsdff", data);
    dispatch(setCurrentConsultant(data?.id));
    dispatch(setCurrentProfileStatus(data?.status));
    dispatch(setConsultantType(data?.phone_code));

    setTimeout(() => {
      navigate(`/astrologer_Profile?${data?.id}`, {
        state: {
          currentPage: page,
          pageSize: pageSize,
        },
      });
    }, 0);

    // localStorage.setItem("currentUserId", data?.id);
  };

  const columns = useMemo(
    () => [
      ...ASTROLOGER_COLUMNS,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            {/* <Link to={`/astrologer_Profile?${row?.original?.id}`}> */}
            {permissions?.["astrologer"]?.includes(
              "view_astrologer_profile"
            ) && (
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
                  onClick={() => {
                    handleActionClick(row.original);
                    setQueryParams(row.original.id);
                  }}
                />
              </span>
            )}
            {/* </Link> */}

            {[3, 4, 5, 2].includes(row?.original?.status) &&
              permissions?.["astrologer"]?.includes(
                "update_astrologer_profile_status"
              ) && (
                <span className="editIcon">
                  <Pencil
                    className="iconSmall"
                    onClick={() => toggleEditStatus(row.original)}
                  />
                </span>
              )}
          </div>
        ),
      },
    ],
    [handleActionClick, toggleEditStatus]
  );

  // Apply debounce to search handlers
  const debouncedSearchName = debounce((value) => setName(value), 500);
  const debouncedSearchConsultantId = debounce(
    (value) => setConsultantId(value),
    500
  );
  const debouncedSearchPhone = debounce((value) => setPhone(value), 500);
  const debouncedSearchStatus = debounce(
    (value) => setStatusSearch(value),
    500
  );

  const handleNameSearch = (e) => {
    setPage(1);
    debouncedSearchName(e?.target?.value);
  };

  const handleConsultantIdSearch = (e) => {
    setPage(1);
    debouncedSearchConsultantId(e?.target?.value);
  };

  const handleConsultantPhoneSearch = (e) => {
    setPage(1);
    debouncedSearchPhone(e?.target?.value);
  };
  const handleConsultantStatusSearch = (e) => {
    setPage(1);
    const inputValue = e?.target?.value?.trim();

    // Convert input to title case (first letter capitalized) for matching
    const formattedInput =
      inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();

    // Try to find a matching status name, fall back to raw input if not found
    const statusValue = statusNameToValue[formattedInput] || inputValue;
    debouncedSearchStatus(statusValue);
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
      <input
        className="inputBox"
        placeholder="Search by status"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleConsultantStatusSearch}
      />
    </div>
  );

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }
  return (
    permissions?.["astrologer"]?.includes("view_astrologer_list") && (
      <div>
        <DyCommonTable
          columns={columns}
          data={data}
          tableTitle="Astrologer"
          includeActions={false}
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
        {data?.length === 0 && (
          <div>
            <span className="no-data-new">No Astrologer Avaliable</span>
          </div>
        )}

        {showEditStatus && (
          <EditStatus
            isOpen={showEditStatus}
            onClose={toggleEditStatus}
            selectedRow={selectedRow?.id}
            profileStatus={profileStatus}
          />
        )}
      </div>
    )
  );
};

export default AstrologerListingTable;
