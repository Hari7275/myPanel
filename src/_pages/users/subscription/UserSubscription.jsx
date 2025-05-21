import React, { useEffect, useState, useMemo, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import CommonTable from "../../../_components/table/CommonTable";
import { useSelector } from "react-redux";
import { useGetUserSubscriptionListQuery } from "../../../_store/api/user/userTransaction";
import { useGetUserListQuery } from "../../../_store/api/user/userDetails";
import { SUBSCRIPTIONCOLUMN } from "./subscriptionColumn";
import Description from "./Description";

const UserSubscription = () => {
  const [data, setData] = useState([]);
  const [description, setDescription] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState(null);

  // ✅ userId is already the correct ID
  const userId = useSelector((state) => state.user.userData);

  // Fetch full user details
  const { data: userData, isLoading } = useGetUserListQuery(userId);

  // Extract subscription ID once user data is fetched

  useEffect(() => {
    if (userData?.data?.subscription) {
      setSubscriptionId(userData?.data?.subscription?.id);
    } else {
      setSubscriptionId(null);
    }
  }, [userData]);

  // Fetch subscription details using the subscription ID
  const {
    data: fetchData,
    error,
    isLoading: isSubscriptionLoading,
  } = useGetUserSubscriptionListQuery(subscriptionId, {
    skip: !subscriptionId,
  });

  // Update data for the table
  useEffect(() => {
    if (fetchData?.data) {
      setData([fetchData?.data]); // Assuming the API returns a single object
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
              Descriptions={selectedRow?.description || ""}
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
