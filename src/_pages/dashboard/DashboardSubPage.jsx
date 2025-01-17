import React, { useState, useEffect } from "react";
import {
  useGetConsultantIncomeQuery,
  useGetFluteIncomeQuery,
  useGetFluteIncomeByConsultantsQuery,
  useGetFluteIncomeByUsersQuery,
  useGetFluteRefundToUserQuery,
  useGetConsultantPayoutAmountQuery,
  useGetFluteRefferalAmountQuery,
} from "../../_store/api";

import BasicArea from "./BasicArea";

const CategoryCard = ({ link, label, price, bgcolor }) => (
  <div>
    <div
      className="card dashboard-card"
      style={{ backgroundColor: bgcolor, boxShadow: "none", margin: "20px" }}
    >
      <span style={{ fontSize: "20px", fontWeight: "600" }}>{label}</span>
      <span style={{ fontSize: "24px", fontWeight: "700" }}>₹ {price}</span>
    </div>
  </div>
);

const DashboardSubPage = () => {
  const [consultantEarning, setConsultantEarning] = useState([]);
  const [fluteEarning, setFluteEarning] = useState([]);
  const [fluteIncByConslt, setFluteIncByConslt] = useState([]);
  const [fluteIncByUsers, setFluteIncByUsers] = useState([]);
  const [fluteRefToUser, setFluteRefToUser] = useState([]);
  const [consltPayoutIncome, setConsltPayoutIncome] = useState([]);
  const [fluteRefAmt, setFluteRefAmt] = useState([]);

  const { data: fetchData, isLoading } = useGetConsultantIncomeQuery();
  const { data: fluteIncome } = useGetFluteIncomeQuery();
  const { data: fluteIncomeByConslt } = useGetFluteIncomeByConsultantsQuery();
  const { data: fluteIncomeByUsers } = useGetFluteIncomeByUsersQuery();
  const { data: fluteRefToUsers } = useGetFluteRefundToUserQuery();
  const { data: ConsltPayoutInc } = useGetConsultantPayoutAmountQuery();
  const { data: FluteReferralAmt } = useGetFluteRefferalAmountQuery();

  useEffect(() => {
    if (fluteIncome && fluteIncome?.data) {
      setFluteEarning(fluteIncome?.data);
    }

    if (fetchData && fetchData?.data) {
      setConsultantEarning(fetchData?.data);
    }

    if (fluteIncomeByConslt && fluteIncomeByConslt?.data) {
      setFluteIncByConslt(fluteIncomeByConslt?.data);
    }
    if (fluteIncomeByUsers && fluteIncomeByUsers?.data) {
      setFluteIncByUsers(fluteIncomeByUsers?.data);
    }
    if (fluteRefToUsers && fluteRefToUsers?.data) {
      setFluteRefToUser(fluteRefToUsers?.data);
    }
    if (ConsltPayoutInc && ConsltPayoutInc?.data) {
      setConsltPayoutIncome(ConsltPayoutInc?.data);
    }
    if (FluteReferralAmt && FluteReferralAmt?.data) {
      setFluteRefAmt(FluteReferralAmt?.data);
    }
  }, [
    fetchData,
    fluteIncome,
    fluteIncomeByConslt,
    fluteIncomeByUsers,
    fluteRefToUsers,
    ConsltPayoutInc,
    FluteReferralAmt,
  ]);

  if (isLoading) {
    return <span className="loadPage">Data Loading...</span>;
  }

  return (
    <>
      <div>
        <div className="dashboard-main-card">
          {/* <h2 className="dashboard-heading">main card</h2> */}
          <div className="dashboard-grid">
            {fluteEarning.map((item) => (
              <CategoryCard
                key={item.title}
                label={item.name}
                price={item.value}
                bgcolor={item.color}
              />
            ))}
          </div>
        </div>

        <div className=" dashboard-main-card ">
          <h2 className="dashboard-heading">Flute Income by Consultants </h2>
          <div className="dashboard-grid">
            {fluteIncByConslt.map((item) => (
              <CategoryCard
                key={item.title}
                label={item.name}
                price={item.value}
                bgcolor={item.color}
              />
            ))}
          </div>
        </div>

        <div className=" dashboard-main-card ">
          <h2 className="dashboard-heading">Flute Income by Users </h2>
          <div className="dashboard-grid">
            {fluteIncByUsers.map((item) => (
              <CategoryCard
                key={item.title}
                label={item.name}
                price={item.value}
                bgcolor={item.color}
              />
            ))}
          </div>
        </div>

        <div className=" dashboard-main-card ">
          <h2 className="dashboard-heading">Refund Amount to Users </h2>
          <div className="dashboard-grid">
            {fluteRefToUser.map((item) => (
              <CategoryCard
                key={item.title}
                label={item.name}
                price={item.value}
                bgcolor={item.color}
              />
            ))}
          </div>
        </div>

        <div className=" dashboard-main-card ">
          <h2 className="dashboard-heading">Consultant Income</h2>
          <div className="dashboard-grid">
            {consultantEarning.map((item) => (
              <CategoryCard
                key={item.title}
                label={item.name}
                price={item.value}
                bgcolor={item.color}
              />
            ))}
          </div>
        </div>

        <div className=" dashboard-main-card ">
          <h2 className="dashboard-heading">Consultants Payout Amount</h2>
          <div className="dashboard-grid">
            {consltPayoutIncome.map((item) => (
              <CategoryCard
                key={item.title}
                label={item.name}
                price={item.value}
                bgcolor={item.color}
              />
            ))}
          </div>
        </div>

        <div className=" dashboard-main-card ">
          <h2 className="dashboard-heading">
            Flute Referral/Reference/Coupon Amount
          </h2>
          <div className="dashboard-grid">
            {fluteRefAmt.map((item) => (
              <CategoryCard
                key={item.title}
                label={item.name}
                price={item.value}
                bgcolor={item.color}
              />
            ))}
          </div>
        </div>

        <BasicArea />
      </div>
    </>
  );
};

export default DashboardSubPage;
