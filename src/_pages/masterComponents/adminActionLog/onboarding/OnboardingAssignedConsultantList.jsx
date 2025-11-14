import React, { useMemo, useState, useEffect, useRef } from "react";
import DyCommonTable from "../../../../_components/table/DyCommonTable";
import { ASSIGNEDCONSULTANTCOLUMNS } from "./assignedConsultantColumn";
import { ArrowRight, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import EditStatus from "../../../../_components/reuseComponents/EditStatus";
import { useGetOnboardingAssignedConsultantListQuery } from "../../../../_store/api";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { Atom } from "react-loading-indicators";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import usePermissions from "../../../../_components/reuseComponents/permission/EmpPermission";
import { statusNameToValue } from "../../../../_constants/consultantConstant";

const OnboardingAssignedConsultantList = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditStatus, setShowEditStatus] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consultantId, setConsultantId] = useState("");
  const [statusSearch, setStatusSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageRef = useRef(page);
  const [pageSize, setPageSize] = useState(50);
  const [dynamicPagination, setDynamicPagination] = useState(true);

  let [profileStatus, SetProfileStatus] = useState(null);
  const permissions = usePermissions();

  const { adminId } = useParams();

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetOnboardingAssignedConsultantListQuery({
    page,
    size: pageSize,
    name: name,
    id: consultantId,
    phone,
    admin_id: adminId,
  });

  const navigate = useNavigate();

  //HANDLING THE CURRENT PAGE STATE
  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.records) {
      const consultantData = fetchData?.data?.records;
      setData(consultantData);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const totalPage = fetchData?.data?.total_records
    ? Math.ceil(fetchData.data.total_records / pageSize)
    : 1;

  const toggleEditStatus = (row) => {
    setShowEditStatus(!showEditStatus);
    SetProfileStatus(row.status);
    setSelectedRow(row);
  };

  const columns = useMemo(
    () => [
      ...ASSIGNEDCONSULTANTCOLUMNS,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => {
          const { id, status, phone_code, consultant_type } = row.original;

          // determine base path based on consultant_type
          const basePath =
            consultant_type === 1
              ? "astrologer"
              : consultant_type === 2
              ? "coaches"
              : consultant_type === 3
              ? "listeners"
              : "listeners"; // default fallback

          const profileLink = `/${basePath}/${id}?status=${status}&type=${phone_code}`;

          return (
            <div className="actions-cell">
              {permissions?.["listener"]?.includes("view_listener_profile") && (
                <Link to={profileLink}>
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
              )}

              {[3, 4, 5, 2, 8].includes(status) &&
                permissions?.["listener"]?.includes(
                  "update_listener_profile_status"
                ) && (
                  <span className="editIcon">
                    <Pencil
                      className="iconSmall"
                      onClick={() => toggleEditStatus(row.original)}
                    />
                  </span>
                )}
            </div>
          );
        },
      },
    ],
    [permissions]
  );

  const debouncedSearchName = debounce((value) => setName(value), 500);
  const debouncedSearchConsultantId = debounce(
    (value) => setConsultantId(value),
    500
  );
  const debouncedSearchPhone = debounce((value) => setPhone(value), 500);

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

  const customFilterComponent = () => (
    <div style={{ width: "100%", height: "35px", display: "flex" }}>
      <input
        className="inputBox"
        placeholder="Search by Id"
        style={{
          // marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "15%",
        }}
        onChange={handleConsultantIdSearch}
      />

      <input
        className="inputBox"
        placeholder="Search by Name"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "15%",
        }}
        onChange={handleNameSearch}
      />
      <input
        className="inputBox"
        placeholder="Search by Phone No."
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "15%",
        }}
        onChange={handleConsultantPhoneSearch}
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
  if (error) {
    return "Error...";
  }

  return (
    permissions?.["listener"]?.includes("view_listener_list") && (
      <>
        <DyCommonTable
          columns={columns}
          data={data}
          tableTitle="Assigned Consultant List"
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
          showGlobalSearch={false}
        />

        {data?.length == 0 && (
          <span className="no-data-new">No consultant Avaliable</span>
        )}

        {showEditStatus && (
          <EditStatus
            isOpen={showEditStatus}
            onClose={toggleEditStatus}
            selectedRow={selectedRow?.id}
            profileStatus={profileStatus}
          />
        )}
      </>
    )
  );
};

export default OnboardingAssignedConsultantList;
