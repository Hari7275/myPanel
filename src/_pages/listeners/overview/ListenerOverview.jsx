import React, { useEffect, useState } from "react";
import { useGetConsultantsDetailsQuery } from "../../../_store/api";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { Atom } from "react-loading-indicators";
import { format } from "date-fns";
import { formatDate } from "../../users/overview/UserOverview";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";
import { useLocation, useParams } from "react-router-dom";

const InfoItem = ({ label, value, color }) => (
  <div className="card-footer-content">
    <div className="info-pair">
      <p className="info-item">
        <strong style={{ color: color }}>{label}: </strong>
        <span>{value}</span>
      </p>
    </div>
  </div>
);

const ListenerOverview = () => {
  const [data, setData] = useState([]);
  // const consultantId = useSelector((state) => state.consultant.consultantData);;
  const { consultantId } = useParams();

  const permissions = usePermissions();
  const location = useLocation();
  const navigate = useNavigate();

  const [currencyCategory, setCurrencyCategory] = useState(null);
  // 🧭 Keep URL params synced when currency category changes
  useEffect(() => {
    if (currencyCategory !== null) {
      const params = new URLSearchParams(location.search);
      params.set("currency_category", currencyCategory);
      navigate(`?${params.toString()}`, { replace: true });
    }
  }, [currencyCategory, location.search, navigate]);

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetConsultantsDetailsQuery(consultantId);

  useEffect(() => {
    if (fetchData) {
      setData(fetchData.data);
      setCurrencyCategory(fetchData?.data?.currency_category);
    }
  }, [fetchData]);

  // const dateFormat =(date)=>{
  //      return format(new Date(date), "MMMM dd, yyyy");
  // }

  // Helper function to capitalize the first letter of each word
  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  // const formatDate = (date) => {
  //   if (!date || isNaN(new Date(date).getTime())) {
  //     return "N/A";
  //   }
  //   return format(new Date(date), "PPpp");
  // };

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  if (error) {
    return <span> {error}</span>;
  }
  return (
    <div>
      <div className="userProfile-containr profile-right-sub-container">
        <div className="userProfile-card">
          <footer className="userProfile-footer">
            <div className="userProfile-footer-content">
              <InfoItem
                label="Mobile Number"
                value={`${data?.phone_code} ${data?.phoneNumber}`}
              />
              <InfoItem
                label="Language"
                value={(data?.languages || [])
                  .map((language) => capitalizeFirstLetter(language))
                  .join(", ")}
              />
              <div className="line"></div>

              <InfoItem label="Country" value={data?.country} />
              <div className="line"></div>

              <InfoItem label="Address" value={data?.address || "N/A"} />
              <div className="line"></div>

              {permissions?.["listener"]?.includes(
                "view_listener_profile_wallet"
              ) && (
                <>
                  <InfoItem
                    label="Lifetime Earning"
                    value={`${data?.currency_category == "A" ? "₹" : "$"} ${
                      data?.walletDetails?.lifetime_earning || 0
                    }`}
                    color="#4CAF50" // Green - represents available funds/positive balance,
                  />
                  <div className="line"></div>

                  <InfoItem
                    label="Current Balance "
                    value={`${data?.currency_category == "A" ? "₹" : "$"} ${
                      data?.walletDetails?.wallet_balance || 0
                    }`}
                    color="#2196F3"
                  />
                  <div className="line"></div>

                  <InfoItem
                    label="Payable Balance "
                    value={`${data?.currency_category == "A" ? "₹" : "$"} ${
                      data?.walletDetails?.payable_amount || 0
                    }`}
                    color="#9C27B0"
                  />
                  <div className="line"></div>
                </>
              )}

              <InfoItem
                label="Applied Date "
                value={formatDate(data?.created_at)}
              />

              <div className="line"></div>

              <InfoItem
                label="Last Profile Update"
                value={formatDate(data?.updated_at)}
              />

              <InfoItem
                label="Last login"
                value={formatDate(data?.last_login)}
              />

              {/* <InfoItem label="Last Active" value={`29/04/2024`} />
              <div className="line"></div> */}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ListenerOverview;
