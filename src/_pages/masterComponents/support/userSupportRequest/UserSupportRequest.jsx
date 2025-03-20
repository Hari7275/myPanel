import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../../_components/table/CommonTable";
import { Pencil, Info } from "lucide-react";
import { SUPPORTREQUESTCOLUMN } from "./supportRequestColumn";

import UpdateSupportRequest from "./UpdateSupportRequest";

import Description from "../../../users/subscription/Description";
import { useGetUserSupportRequestQuery } from "../../../../_store/api";

const UserSupportRequest = () => {
  const [updateData, setUpdateData] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [description, setDescription] = useState(false);

  // Fetching API data for listing reviews
  const { data: fetchData } = useGetUserSupportRequestQuery();

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
          <span className="editIcon">
            <Pencil
              className="iconSmall"
              onClick={() => toggleUpdateData(row.original)}
            />
          </span>

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

  return (
    <>
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="User Support Request"
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
