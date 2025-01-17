import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentConsultant } from "../_store/slices/consultantSlice";
import { setActiveTab } from "../_store/slices/activeSlice";
import CommonTable from "../_components/table/CommonTable";
import { Eye } from "lucide-react";
import {
  useGetNotificationQuery,
  useUpdateNotificationReadCountMutation,
} from "../_store/api/user/userDetails";

const NotificationBell = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [notificationdatas, setNotificationData] = useState([]);

  const { data: notificationData } = useGetNotificationQuery();
  const [updateNotificationReadCount] =
    useUpdateNotificationReadCountMutation();

  useEffect(() => {
    if (notificationData) {
      const formatednotification = notificationData?.data?.records?.map(
        (item) => {
          try {
            const parsedData = JSON.parse(item?.data);
            return {
              ...parsedData,
              sender_id: item?.id,
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

  console.log("notificationdatas", notificationdatas);

  const keyToBaseUrl = {
    coach: "/coach-profile",
    astrologer: "/astrologer_Profile",
    listener: "/listener_Profile",
    order: "/orders",
    user: "/user",
    datingProduct: "/dating-products",
  };

  const handleNotificationClick = async (notification, sender_id) => {
    console.log("sender_id", notification.sender_id);

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

      console.log("response", response);

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
      Header: "Id",
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
        backgroundColor: isSeen ? "#EFFBFF" : "#FFFFFF",
      },
    };
  };

  return (
    <div>
      {notificationdatas?.length > 0 ? (
        <CommonTable
          columns={columns}
          data={notificationdatas}
          includeCheckbox={false}
          tableTitle="Notifications"
          getRowProps={getRowProps} // Pass row props
        />
      ) : (
        <span className="no-data">No Notifications Available</span>
      )}
    </div>
  );
};

export default NotificationBell;
