import React, { useMemo, useState, useEffect, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import CommonTable from "../../../_components/table/CommonTable";
import { useSelector } from "react-redux";
import { useGetUserSubscriptionListQuery } from "../../../_store/api/user/userTransaction";
import { SUBSCRIPTIONCOLUMN } from "./subscriptionColumn";
import Description from "./Description";

const UserSubscription = () => {
  const [data, setData] = useState([]);
  const [description, setDescription] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const userId = useSelector((state) => state.user.userData);

  const {
    data: fetchData,
    error,
    isLoading,
  } = useGetUserSubscriptionListQuery(userId);

  useEffect(() => {
    if (fetchData && fetchData.data) { 
      setData([fetchData.data]);
    } else { 
      setData([]);
    }
  }, [fetchData]);

  const toggleDescription = useCallback((row) => {
    setSelectedRow(row);
    setDescription((prev) => !prev);
  }, []);

  const columns = useMemo(
    () => [
      ...SUBSCRIPTIONCOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span
              title="View details"
              className="secondIcon"
              style={{ height: "35px", width: "35px" }}
            >
              <ArrowRight
                className="iconSmall"
                onClick={() => toggleDescription(row?.original)}
              />
            </span>
          </div>
        ),
      },
    ],
    [toggleDescription]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return (
    <>
      {data.length > 0 ? (
        <>
          <CommonTable
            columns={columns}
            data={data}
            includeActions={false}
            tableTitle="Membership"
          />

          {description && selectedRow && (
            <Description
              isOpen={description}
              onClose={toggleDescription}
              Descriptions={selectedRow.description || ""}
            />
          )}
        </>
      ) : (
        <div>No plans found</div>
      )}
    </>
  );
};

export default UserSubscription;
