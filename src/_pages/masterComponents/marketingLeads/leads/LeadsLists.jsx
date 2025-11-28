import React, { useEffect, useMemo, useState } from "react";
import DyCommonTable from "../../../../_components/table/DyCommonTable";
import { LEADLISTCOLUMN } from "./leadsListsColumn";
import { Info, Pencil, Trash, KeyRound } from "lucide-react";
import { useGetMarketingLeadsListQuery } from "../../../../_store/api";
import { Atom } from "react-loading-indicators";
import Button from "@mui/material/Button";
import { debounce } from "lodash";
import UploadsLeadsData from "./UploadsLeadsData";
import usePermissions from "../../../../_components/reuseComponents/permission/EmpPermission";
import AssignLeadsToAdmin from "./AssignLeadsToAdmin";
import { useSelector } from "react-redux";

const LeadsLists = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [dynamicPagination, setDynamicPagination] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [showPayablePopover, setShowPayablePopover] = useState(false);
  const permissions = usePermissions();
  const [selectedData, setSelectedData] = useState(null);
  const [isOnboardingAssign, setIsOnboardingAssign] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const {
    data: fetchData,
    isLoading,
    isError,
  } = useGetMarketingLeadsListQuery({
    page,
    size: pageSize,
    name: name,
    email,
    phone,
  });

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      const result = fetchData?.data;
      setData(result);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const toggleOnboardingAssign = (row) => {
    setSelectedData(row);
    setIsOnboardingAssign(!isOnboardingAssign);
  };

  // Memoized columns definition for the table
  const columns = useMemo(
    () => [
      ...LEADLISTCOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span className="editIcon" style={{ background: "#c65252ff" }}>
              <KeyRound
                className="iconSmall"
                onClick={() => toggleOnboardingAssign(row.original)}
              />
            </span>
          </div>
        ),
      },
    ],
    []
  );
  // const totalPage = fetchData?.meta?.total_page || 1;

  const debouncedSearchName = debounce((value) => setName(value), 500);
  const debouncedSearchEmail = debounce((value) => setEmail(value), 500);
  const debouncedSearchPhone = debounce((value) => setPhone(value), 500);

  const handleNameSearch = (e) => {
    setPage(1);
    debouncedSearchName(e?.target?.value);
  };

  const handleEmailSearch = (e) => {
    setPage(1);
    debouncedSearchEmail(e?.target?.value);
  };

  const handleConsultantPhoneSearch = (e) => {
    setPage(1);
    debouncedSearchPhone(e?.target?.value);
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
        placeholder="Search by Email"
        style={{
          // marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "15%",
        }}
        onChange={handleEmailSearch}
      />

      {/* <input
        className="inputBox"
        placeholder="Search by Name"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "15%",
        }}
        onChange={handleNameSearch}
      /> */}
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

      <div
        style={{ marginLeft: "20px", position: "relative" }}
        className="filter-button-wrapper"
      >
        <Button
          variant="contained"
          onClick={() => setShowPayablePopover(!showPayablePopover)}
        >
          Upload Leads
        </Button>

        <UploadsLeadsData
          isOpen={showPayablePopover}
          onClose={() => setShowPayablePopover(false)}
        />
      </div>
    </div>
  );

  // const totalPage = fetchData?.meta?.total_page || 1;
  const totalPage = fetchData?.pagination?.totalPages || 1;

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }
  if (isError) return <p>Error fetching data</p>;

  return (
    <>
      <DyCommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Marketing Lead List"
        dynamicPagination={dynamicPagination}
        customFilterComponent={customFilterComponent}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        includeCheckbox={false}
        showTableHeading={false}
        showGlobalSearch={false}
      />

      {isOnboardingAssign && (
        <AssignLeadsToAdmin
          isOpen={isOnboardingAssign}
          onClose={toggleOnboardingAssign}
          selectedRow={selectedData?.id}
          adminId={user.id}
        />
      )}
    </>
  );
};
export default LeadsLists;
