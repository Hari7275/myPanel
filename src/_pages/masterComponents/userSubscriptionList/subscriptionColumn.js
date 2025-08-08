import { useEffect, useState } from "react";
import { useGetSubscriptionListQuery } from "../../../_store/api";

const CustomIdCell = ({ value }) => {
  return <span className="orderId-color">{value}</span>;
};

const OrderIdCell = ({ value }) => {
  return <span className="custumerId-color">{value}</span>;
};

export const COLUMNSUBSCRIPTION = [
  {
    Header: "Id",
    accessor: "id",
    Cell: OrderIdCell,
  },
  {
    Header: "User Id",
    accessor: "user_id",
    Cell: CustomIdCell,
  },
  {
    Header: "Name",
    accessor: "first_name",
  },
  {
    Header: "Phone Number",
    accessor: "phone_number",
  },
  {
    Header: "Subscription Plan",
    accessor: "subscription_plan_id",
  },
  {
    Header: "Recharge Time",
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
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => <span>{value === "1" ? "Successful" : "Failed"}</span>,
  },
];

// Example Component Using This Data
const SubscriptionTable = () => {
  const [data, setData] = useState([]);
  const { data: fetchdata } = useGetSubscriptionListQuery();

  useEffect(() => {
    if (fetchdata) {
      setData(fetchdata.data || []);
    }
  }, [fetchdata]);

  console.log("data....", data); // Log inside component

  return (
    <div>
      {/* Render your table here, e.g., using react-table */}
      {/* <TableComponent columns={COLUMNSUBSCRIPTION} data={data} /> */}
    </div>
  );
};

export default SubscriptionTable;
