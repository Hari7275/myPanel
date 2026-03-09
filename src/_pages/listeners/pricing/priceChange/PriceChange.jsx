import React, { useMemo, useState, useEffect } from "react";
import { Pencil, NotebookPen } from "lucide-react";
import CommonTable from "../../../../_components/table/CommonTable";
import { PRICECHANGECOLUMN } from "./PriceChangeColumn";
import { useGetConsultantsPriceForChangeQuery, } from "../../../../_store/api";
import EditPriceStatus from "../../../../_components/reuseComponents/EditPriceStatus";
import EditconsultantPrice from "../../../../_components/reuseComponents/EditconsultantPrice";
import { Atom } from "react-loading-indicators";
import { useTheme } from "../../../../_context/ThemeContext";
import usePermissions from "../../../../_components/reuseComponents/permission/EmpPermission";
import { useLocation, useParams } from "react-router-dom";

const PriceChange = () => {
  const { isDarkMode } = useTheme();
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditStatus, setShowEditStatus] = useState(false);
  const [showConsultantEditPrice, setShowConsultantPrice] = useState(false);
  const { consultantId } = useParams();

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const consultantCateg = params.get("currency_category");

  // const convertedConsultantCateg = consultantCateg == 91 ? "A" : "B";

  const {
    data: fetchData,
    isLoading,
    isError,
  } = useGetConsultantsPriceForChangeQuery(consultantId);
  const permissions = usePermissions();

  const hasPermission = (permission) => {
    return permissions?.["listener"]?.includes(permission);
  };

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setData(fetchData?.data);
    } else setData([]);
  }, [fetchData]);

  console.log("data", data);

  const toggleUpdateStatus = (row) => {
    setSelectedRow(row);
    setShowEditStatus(!showEditStatus);
  };

  const toggleUpdateConsultantPrice = (row) => {
    setSelectedRow(row);
    setShowConsultantPrice(!showConsultantEditPrice);
  };

  const columns = useMemo(() => [
    ...PRICECHANGECOLUMN,
    {
      Header: () => <div className="actions-header">Actions</div>,
      id: "actions",
      Cell: ({ row }) => (
        <div className="actions-cell">
          {row.original.status === 1 &&
            hasPermission("update_listener_profile_price_chart") && (
              <span
                className="editIcon"
                onClick={() => toggleUpdateStatus(row?.original)}
              >
                <NotebookPen className="iconSmall" />
              </span>
            )}

          {/* {row.original.status == 5 && */}
          {row.original.status == 5 && (
            <span
              className="editIcon"
              onClick={() => toggleUpdateConsultantPrice(row?.original)}
            >
              <Pencil className="iconSmall" />
            </span>
          )}
        </div>
      ),
    },
  ]);

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color={isDarkMode ? "#a8b8d0" : "#1c2434"} size="medium" text="" textColor="" />
      </span>
    );
  }
  if (isError) return <div>Error loading data.</div>;

  return (
    <div>
      <CommonTable
        columns={columns}
        data={data}
        includeCheckbox={false}
        tableTitle="Price Change"
      />

      {showEditStatus && (
        <EditPriceStatus
          isOpen={showEditStatus}
          onClose={toggleUpdateStatus}
          selectedRow={selectedRow}
        />
      )}

      {showConsultantEditPrice && (
        <EditconsultantPrice
          isOpen={showConsultantEditPrice}
          onClose={toggleUpdateConsultantPrice}
          selectedRow={selectedRow}
        />
      )}
    </div>
  );
};

export default PriceChange;
