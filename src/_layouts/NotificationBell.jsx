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
  useGetNotificationGroupQuery,
} from "../_store/api/user/userDetails";
import { Atom } from "react-loading-indicators";

const NotificationBell = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [dynamicPagination, setDynamicPagination] = useState(true);
  const [sender_id, setSender_id] = useState();
  const [notificationGroup, SetNotificationsGroup] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");

  const [notificationdatas, setNotificationData] = useState([]);

  const { data: notificationData, isLoading } = useGetNotificationQuery({
    page,
    size: pageSize,
    sender_id,
    notification_type_group: selectedGroup,
  });

  const { data: notificationGroups } = useGetNotificationGroupQuery();

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
              created_at: item?.created_at,
            }; // Attach sender_id to the parsed data.
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
  // fetch the data of notification types and groups

  useEffect(() => {
    if (notificationGroups) {
      SetNotificationsGroup(notificationGroups?.data?.rows);
    }
    // if (notificationTypes) {
    //   SetNotificationsType(notificationTypes?.data?.rows);
    // }
  }, [notificationGroups]);

  console.log("notificationGroup", notificationGroup);
  // console.log("notificationType", notificationType);

  const handleNotificationClick = async (notification) => {
    const key = notification?.key;

    // ✅ Updated route mapping
    const keyToBaseUrl = {
      coach: "/coaches",
      astrologer: "/astrologer",
      listener: "/listeners",
      order: "/orders",
      user: "/user",
      datingProduct: "/dating-products",
    };

    const baseUrl = keyToBaseUrl[key];
    if (!baseUrl) {
      console.error(`No URL mapping found for key: ${key}`);
      return;
    }

    try {
      // Mark as seen
      await updateNotificationReadCount({
        id: notification?.sender_id,
        body: { is_seen: true },
      });

      // Keep active tab
      if (notification?.tab) {
        dispatch(setActiveTab(notification.tab));
      }

      // ✅ Build dynamic route only for coach, astrologer, listener
      let route = baseUrl;
      if (["coach", "astrologer", "listener"].includes(key)) {
        route += `/${notification?.id}`;
      } else if (notification?.orderId) {
        route += `/${notification?.orderId}`;
      } else if (notification?.userId) {
        route += `/${notification?.userId}`;
      } else if (notification?.productId) {
        route += `/${notification?.productId}`;
      }

      navigate(route);
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
      Header: "Type",
      accessor: "key",
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
      Header: "Created Date",
      accessor: "created_at",
      Cell: ({ value }) => {
        if (!value) return "null";
        const date = new Date(value);
        return date.toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        });
      },
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
        backgroundColor: isSeen ? "#FFFFFF" : "#ccf1ffff",
      },
    };
  };

  const debouncedSearchConsultantId = debounce(
    (value) => setSender_id(value),
    500
  );

  const handleConsultantIdSearch = (e) => {
    // setPageSize(1);
    debouncedSearchConsultantId(e?.target?.value);
  };

  // ✅ new handler for group filtering
  const handleGroupChange = (e) => {
    const value = e.target.value;
    setSelectedGroup(value === "all" ? "" : value);
    setPage(1); // reset pagination
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

      <select
        className="inputBox"
        style={{
          marginLeft: "10px",
          height: "-webkit-fill-available",
          width: "15%",
        }}
        onChange={handleGroupChange}
      >
        <option>Select Group Name</option>
        {notificationGroup.map((item) => (
          <option value={item?.id}>{item?.group_name}</option>
        ))}
      </select>
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
        tableTitle="All Notifications"
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
