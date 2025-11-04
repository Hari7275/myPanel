import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../../_components/table/CommonTable";
import { Trash } from "lucide-react";
import { AVOIDEDUSERCOLUMN } from "./avoidedUserColumn";
import DeleteComponent from "../../../payments/DeleteComponent";
import {
  useGetAvoidedUserListQuery,
  useDeleteAvoidedUserMutation,
} from "../../../../_store/api/user/blacklistedUser";
import { useSelector } from "react-redux";
import { Atom } from "react-loading-indicators";
import { useParams } from "react-router-dom";

const AvoidedUser = () => {
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [result, setResult] = useState([]);

  // const userId = useSelector((state) => state.user.userData);
    const { userId } = useParams();
  

  const {
    data: fetchData,
    isLoading,
    isError,
    isFetching,
  } = useGetAvoidedUserListQuery(userId);
  const [deleteFeature] = useDeleteAvoidedUserMutation();

  useEffect(() => {
    if (fetchData) {
      setResult(fetchData?.data?.records || []);
    }
  }, [fetchData]);

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
      ...AVOIDEDUSERCOLUMN,
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
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }
  return (
    <>
      {result.length > 0 ? (
        <CommonTable
          columns={columns}
          data={result}
          includeActions={false}
          tableTitle="Avoided User"
        />
      ) : (
        <div>No avoided users found.</div>
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

export default AvoidedUser;
