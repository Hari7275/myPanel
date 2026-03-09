import React, { useMemo, useEffect, useState } from "react";
import CommonTable from "../../../../_components/table/CommonTable";
import { Trash } from "lucide-react";
import { BLACKLISTINGCOLUMN } from "./userBlackListingColumn";
import DeleteComponent from "../../../payments/DeleteComponent";
import {
  useGetBlacklistedUserListQuery,
  useDeleteBlacklistedUserMutation,
} from "../../../../_store/api/user/blacklistedUser";
import { useSelector } from "react-redux";
import { Atom } from "react-loading-indicators";
import { useParams } from "react-router-dom";

const UserBlacklisting = () => {
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [result, setResult] = useState([]);
  // const userId = useSelector((state) => state.user.userData);
  const { userId } = useParams();

  const {
    data: fetchData,
    isError,
    isLoading,
  } = useGetBlacklistedUserListQuery(userId);

  useEffect(() => {
    if (fetchData && fetchData.data) {
      setResult(fetchData.data.records);
    }
  }, [fetchData]);

  const [deleteFeature] = useDeleteBlacklistedUserMutation();

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
      ...BLACKLISTINGCOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
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
    []
  );

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#3a3a3a" size="medium" text="" textColor="" />
      </span>
    );
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      {result.length > 0 ? (
        <CommonTable
          columns={columns}
          data={result}
          includeActions={false}
          tableTitle="User Blacklisting"
        />
      ) : (
        <div>Data is not available</div>
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

export default UserBlacklisting;
