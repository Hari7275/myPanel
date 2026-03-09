import React, { useMemo, useEffect, useState } from "react";
import CommonTable from "../../../../_components/table/CommonTable";
import { Trash } from "lucide-react";
import { HIDDENUSERCOLUMN } from "./hiddenUserColumn";
import DeleteComponent from "../../../payments/DeleteComponent";
import {
  useGetHiddenUserListQuery,
  useDeleteHiddenUserMutation,
} from "../../../../_store/api/user/blacklistedUser";
import { useSelector } from "react-redux";
import { Atom } from "react-loading-indicators";
import { useParams } from "react-router-dom";

const HiddenUserListing = () => {
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
  } = useGetHiddenUserListQuery(userId);

  useEffect(() => {
    if (fetchData) {
      setResult(fetchData?.data?.records || []);
    }
  }, [fetchData]);

  const [deleteFeature] = useDeleteHiddenUserMutation();

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
      ...HIDDENUSERCOLUMN,
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

  //  if (!fetchData?.data) {
  //    return <div>No data available</div>;
  //  }

  return (
    <>
      {result.length > 0 ? (
        <CommonTable
          columns={columns}
          data={result}
          includeActions={false}
          tableTitle="Hidden User"
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

export default HiddenUserListing;
