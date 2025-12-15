import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../../_store/slices/userSlice";

export const GIFTCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Consultant Type",
    accessor: "consultant_type",
    Cell: ({ value }) => {
      const typeMap = {
        1: "Astrologer",
        2: "Coach",
        3: "Listener",
      };

      return typeMap[value] || "Unknown";
    },
  },
  {
    Header: "Image",
    Cell: ({ row }) => (
      <img src={row.original.image_url} alt="Avatar" width="80" height="80" />
    ),
  },
  // {
  //   Header: "Commission",
  //   accessor: "commission",
  // },
  {
    Header: "Status",
    accessor: "is_active",
    Cell: ({ value }) => statusValue(value),
  },
];

const statusValue = (value) => {
  return value ? "Active" : "Inactive";
};

// *******************************************PARTICULARGIFTPRICECOLUMN ********************************
export const PARTICULARGIFTPRICECOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Gift Id",
    accessor: "gift_id",
  },
  {
    Header: "User Category",
    accessor: "user_category",
  },
  {
    Header: "Price",
    accessor: "price",
    Cell: ({ row }) => {
      const currency = row?.original?.currency === "USD" ? "$ " : "₹ ";
      const price = row?.original?.price;

      return (
        <span>
          {currency}
          {price}
        </span>
      );
    },
  },
];

// ******************************************* Gift History ********************************

const CustomIdCell = ({ value, row }) => {
  const userName = row?.original?.gift_meta_data?.userData.name;
  const dispatch = useDispatch();
  const handleUserClick = () => {
    dispatch(setCurrentUser(value));
  };
  return (
    <Link
      // to="/users_Profile"
      to={`/user/${value}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleUserClick}
      style={{ textDecoration: "none" }}
    >
      <span className="orderId-color" style={{ cursor: "pointer" }}>
        {userName} ({value})
      </span>
    </Link>
  );
};

const ConsultantNavigationCell = ({ value, row }) => {
  const consultantName =
    row?.original?.consultant_details?.consultant_first_name;
  const consultantType = row?.original?.gift?.consultant_type;
  const foreigner = row?.original?.description?.is_consultant_foreigner;

  const navigationRoute = {
    1: `/astrologer/${value}`,
    2: `/coaches/${value}`,
    3: `/listeners/${value}`,
  };

  const baseRoute = navigationRoute[consultantType] || "";

  // Add ?type=91 only if NOT foreigner
  const route = !foreigner ? `${baseRoute}?type=91` : baseRoute;

  return (
    <Link
      to={route}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <span
        style={{
          cursor: "pointer",
          color: foreigner ? "#1889beff" : "#be5b18ff",
          fontStyle: foreigner ? "italic" : "normal",
        }}
      >
        {consultantName} ({value})
        <span style={{ color: "#187cbeff" }}>
          ({{ 1: "A", 2: "C", 3: "L" }[consultantType] || ""})
        </span>
      </span>
    </Link>
  );
};
export const GIFTORDERHISTORYCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },

  {
    Header: "Consultant id",
    accessor: "consultant_id",
    Cell: ConsultantNavigationCell,
  },
  {
    Header: "User id",
    accessor: "user_id",
    Cell: CustomIdCell,
  },
  {
    Header: "Revenue/Flute Earning",
    accessor: "order_revenue",
    Cell: ({ row }) => (
      <span>
        {row.original.order_revenue}/{row.original.flute_earning}
      </span>
    ),
  },

  {
    Header: "Gift Id",
    accessor: "gift.name",
  },

  {
    Header: "Time",
    accessor: "createdAt",
    Cell: ({ value }) => {
      if (!value) return "null";
      const date = new Date(value);
      return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    },
  },
];
