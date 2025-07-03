import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../../_components/table/CommonTable";
import ReportedUserDescriptions from "./ReportedUserDescriptions";
import { REPORTEDUSERCOLUMN } from "./reportedUserColumn";
import { ArrowRight, Trash } from "lucide-react";
import DeleteComponent from "../../../payments/DeleteComponent";
import {
  useGetReportedUserListQuery,
  useDeleteReportedUserMutation,
} from "../../../../_store/api/user/blacklistedUser";
import { useSelector } from "react-redux";
import { Atom } from "react-loading-indicators";

const ReportedUser = () => {
  const [showReportedDescription, setShowReportedDescription] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [result, setResult] = useState([]);
  const userId = useSelector((state) => state.user.userData);

  const {
    data: fetchData,
    isLoading,
    isError,
  } = useGetReportedUserListQuery(userId);
  const [deleteFeature] = useDeleteReportedUserMutation();

  useEffect(() => {
    if (fetchData?.data) {
      setResult(fetchData.data.records);
    }
  }, [fetchData]);

  const toggleUserDescriptions = (row) => {
    setShowReportedDescription(!showReportedDescription);
    setSelectedRow(row.original);
  };

  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  const handleDelete = () => {
    if (selectedRow && selectedRow.id) {
      deleteFeature({ id: selectedRow.id }).then(() => {
        setShowDeleteComponent(false);
      });
    }
  };

  const columns = useMemo(
    () => [
      ...REPORTEDUSERCOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span
              title="view details"
              className="secondIcon"
              style={{ height: "35px", width: "35px" }}
            >
              <ArrowRight
                className="iconSmall"
                onClick={() => toggleUserDescriptions(row)}
              />
            </span>

            <span className="deleteIcon">
              <Trash
                className="iconSmall"
                onClick={() => toggleDeleteComponent(row.original)}
              />
            </span>
          </div>
        ),
      },
    ],
    [toggleDeleteComponent, toggleUserDescriptions]
  );

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  if (!fetchData?.data) {
    return <div>No data available</div>;
  }

  return (
    <>
      <CommonTable
        columns={columns}
        data={result}
        includeActions={false}
        tableTitle="Reported User"
      />

      {showReportedDescription && (
        <ReportedUserDescriptions
          isOpen={showReportedDescription}
          onClose={toggleUserDescriptions}
          Description={selectedRow?.reason}
        />
      )}
      {showDeleteComponent && (
        <DeleteComponent
          isOpen={showDeleteComponent}
          onClose={toggleDeleteComponent}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default ReportedUser;
