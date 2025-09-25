import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../../_components/table/CommonTable";
import DyCommonTable from "../../../../_components/table/DyCommonTable";

import { Pencil, Info } from "lucide-react";
import { SUPPORTREQUESTCOLUMN } from "./supportRequestColumn";

import UpdateSupportRequest from "./UpdateSupportRequest";

import Description from "../../../users/subscription/Description";
import { useGetUserSupportRequestQuery } from "../../../../_store/api";
import { debounce } from "lodash";

const UserSupportRequest = () => {
  const [updateData, setUpdateData] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [description, setDescription] = useState(false);
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [dynamicPagination, setDynamicPagination] = useState(true);

  // Fetching API data for listing reviews
  const { data: fetchData } = useGetUserSupportRequestQuery({
    status,
    userId,
  });

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setData(fetchData?.data?.rows);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const toggleUpdateData = (row) => {
    setSelectedRow(row);
    setUpdateData(!updateData);
  };

  const toggleDescription = (row) => {
    setDescription(!description);
    setSelectedRow(row);
  };

  const columns = useMemo(() => [
    ...SUPPORTREQUESTCOLUMN,
    {
      Header: () => <div className="actions-header">Actions</div>,
      id: "actions",
      Cell: ({ row }) => (
        <div className="actions-cell">
          {row.original?.status == 1 && (
            <span className="editIcon">
              <Pencil
                className="iconSmall"
                onClick={() => toggleUpdateData(row.original)}
              />
            </span>
          )}

          <span
            title="view description"
            className="secondIcon"
            style={{ height: "35px", width: "35px" }}
          >
            <Info
              className="iconSmall"
              onClick={() => toggleDescription(row?.original)}
            />
          </span>
        </div>
      ),
    },
  ]);

  // Apply debounce to search handlers
  const debouncedSearchStatus = debounce((value) => setStatus(value), 500);
  const debouncedSearchConsultantId = debounce(
    (value) => setUserId(value),
    500
  );

  const handleStatusSearch = (e) => {
    debouncedSearchStatus(e?.target?.value);
  };

  const handleConsultantIdSearch = (e) => {
    debouncedSearchConsultantId(e?.target?.value);
  };

  const customFilterComponent = () => (
    <div style={{ width: "100%", height: "35px" }}>
      <input
        className="inputBox"
        placeholder="Search by User Id"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleConsultantIdSearch}
      />

      <input
        className="inputBox"
        placeholder="Search by Status"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleStatusSearch}
      />
    </div>
  );

  // const totalPage = fetchData?.meta?.total_page || 1;
  const totalPage = fetchData?.data?.total
    ? Math.ceil(fetchData.data.total / pageSize)
    : 1;
  return (
    <>
      {/* <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="User Support Request"
        customFilterComponent={customFilterComponent}
        showTableHeading={false}
      /> */}

      <DyCommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="User Support Request"
        dynamicPagination={dynamicPagination}
        customFilterComponent={customFilterComponent}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        includeCheckbox={false}
        showTableHeading={false}
      />

      {updateData && (
        <UpdateSupportRequest
          isOpen={updateData}
          onClose={toggleUpdateData}
          selectedRow={selectedRow}
        />
      )}

      {description && selectedRow && (
        <Description
          isOpen={description}
          onClose={toggleDescription}
          Descriptions={selectedRow?.query_message || ""}
        />
      )}
    </>
  );
};

export default UserSupportRequest;
