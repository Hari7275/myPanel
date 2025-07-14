import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentConsultant } from "../_store/slices/consultantSlice";
import { setActiveTab } from "../_store/slices/activeSlice";

import DyCommonTable from "../_components/table/DyCommonTable";
import { debounce } from "lodash";

import { Eye } from "lucide-react";
import {
  useGetNotificationQuery,
  useUpdateNotificationReadCountMutation,
} from "../_store/api/user/userDetails";
import { Atom } from "react-loading-indicators";

const NotificationBell = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dynamicPagination, setDynamicPagination] = useState(true);
  const [sender_id, setSender_id] = useState();

  const [notificationdatas, setNotificationData] = useState([]);

  const { data: notificationData, isLoading } = useGetNotificationQuery({
    page,
    size: pageSize,
    sender_id,
  });
  const [updateNotificationReadCount] =
    useUpdateNotificationReadCountMutation();

  useEffect(() => {
    if (
      notificationData &&
      notificationData?.data &&
      notificationData?.data?.records
    ) {
      const formatednotification = notificationData?.data?.records?.map(
        (item) => {
          try {
            const parsedData = JSON.parse(item?.data);
            return {
              ...parsedData,
              sender_id: item?.id,
              id: item?.sender_id,
              is_seen: item?.is_seen,
            }; // Attach sender_id to the parsed data
          } catch (error) {
            console.error("Error parsing notification data:", error);
            return null;
          }
        }
      );

      const formatedData = formatednotification.filter(Boolean);
      setNotificationData(formatedData);
    }
  }, [notificationData]);

  const keyToBaseUrl = {
    coach: "/coach-profile",
    astrologer: "/astrologer_Profile",
    listener: "/listener_Profile",
    order: "/orders",
    user: "/user",
    datingProduct: "/dating-products",
  };

  const handleNotificationClick = async (notification, sender_id) => {
    // console.log("sender_id", notification.sender_id);

    const baseUrl = keyToBaseUrl[notification?.key];
    if (!baseUrl) {
      console.error(`No URL mapping found for key: ${notification.key}`);
      return;
    }

    try {
      // Call the mutation to update the notification as seen
      const response = { is_seen: true };
      await updateNotificationReadCount({
        id: notification?.sender_id,
        body: response,
      });

      // Navigate to the appropriate route after marking as seen
      let route = baseUrl;
      const state = {};

      if (notification.id) {
        dispatch(setCurrentConsultant(notification?.id));
        dispatch(setActiveTab(notification?.tab));
      } else if (notification?.orderId) {
        route += `/${notification?.orderId}`;
      } else if (notification?.userId) {
        route += `/${notification?.userId}`;
      } else if (notification?.productId) {
        route += `/${notification?.productId}`;
      }

      navigate(route, { state });
    } catch (error) {
      console.error("Error updating notification as seen:", error);
    }
  };

  const columns = [
    {
      Header: " Id",
      accessor: "sender_id",
    },
    {
      Header: "Consultant Id",
      accessor: "id",
    },
    {
      Header: "Message",
      accessor: "message",
    },
    {
      Header: () => <div className="actions-header">Actions</div>,
      id: "actions",
      Cell: ({ row }) => (
        <div className="actions-cell">
          <span
            title="View Details"
            className="secondIcon"
            style={{
              display: "inline-block",
              height: "35px",
              width: "35px",
            }}
          >
            <Eye
              className="iconSmall"
              onClick={() => handleNotificationClick(row.original)}
            />
          </span>
        </div>
      ),
    },
  ];

  // Add a function to define row properties
  const getRowProps = (row) => {
    const isSeen = row.original.is_seen;
    return {
      style: {
        backgroundColor: isSeen ? "#FFFFFF" : "#EFFBFF",
      },
    };
  };

  const debouncedSearchConsultantId = debounce(
    (value) => setSender_id(value),
    500
  );

  const handleConsultantIdSearch = (e) => {
    debouncedSearchConsultantId(e?.target?.value);
  };

  const customFilterComponent = () => (
    <div style={{ width: "100%", height: "35px" }}>
      <input
        className="inputBox"
        placeholder="Search by consultant Id"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleConsultantIdSearch}
      />
    </div>
  );

  // for pagination

  const totalPage = notificationData?.data?.metadata?.total_page;

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  return (
    <div>
      <DyCommonTable
        columns={columns}
        data={notificationdatas}
        includeCheckbox={false}
        tableTitle="Notifications"
        getRowProps={getRowProps}
        dynamicPagination={dynamicPagination}
        customFilterComponent={customFilterComponent}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        showTableHeading={false}
      />

      {notificationdatas?.length === 0 && (
        <div>
          <span className="no-data-new">No data Avaliable</span>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
