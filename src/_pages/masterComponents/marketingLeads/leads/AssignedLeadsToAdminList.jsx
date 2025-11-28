import React, { useMemo, useState, useEffect, useRef } from "react";
import DyCommonTable from "../../../../_components/table/DyCommonTable";
import { ASSIGNEDMARKETINGLEADSTOADMINCOLUMNS } from "./leadsListsColumn";
import { Pencil } from "lucide-react";
import { useGetAdminAssigneedLeadsListQuery } from "../../../../_store/api";
import { debounce } from "lodash";
import { Atom } from "react-loading-indicators";
import { useParams } from "react-router-dom";
import usePermissions from "../../../../_components/reuseComponents/permission/EmpPermission";
import UpdateStatusMarketingLeads from "./UpdateStatusMarketingLeads";
const AssignedLeadsToAdminList = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditStatus, setShowEditStatus] = useState(false);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");
  const [page, setPage] = useState(1);
  const pageRef = useRef(page);
  const [pageSize, setPageSize] = useState(50);
  const [dynamicPagination, setDynamicPagination] = useState(true);
  const permissions = usePermissions();
  const { adminId } = useParams();

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetAdminAssigneedLeadsListQuery({
    page,
    size: pageSize,
    name: name,
    email,
    phone,
    admin_id: adminId,
  });

  //HANDLING THE CURRENT PAGE STATE
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
  }, [fetchData]);

  const totalPage = fetchData?.data?.total_records
    ? Math.ceil(fetchData.data.total_records / pageSize)
    : 1;

  const toggleEditStatus = (row) => {
    setShowEditStatus(!showEditStatus);
    setSelectedRow(row);
  };

  const columns = useMemo(
    () => [
      ...ASSIGNEDMARKETINGLEADSTOADMINCOLUMNS,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => {
          return (
            <div className="actions-cell">
              <span className="editIcon">
                <Pencil
                  className="iconSmall"
                  onClick={() => toggleEditStatus(row.original)}
                />
              </span>
            </div>
          );
        },
      },
    ],
    [permissions]
  );

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
    <div style={{ width: "100%", height: "35px", display: "flex" }}>
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
          tableTitle="Marketing Leads Status"
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
          <UpdateStatusMarketingLeads
            isOpen={showEditStatus}
            onClose={toggleEditStatus}
            selectedRow={selectedRow?.id}
          />
        )}
      </>
    )
  );
};

export default AssignedLeadsToAdminList;
