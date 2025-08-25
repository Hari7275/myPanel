import React, { useState, useEffect } from "react";
import { CategoryCard } from "../DashboardSubPage";
import {
  useGetConsultantIncomeQuery,
  useGetConsultantIncomeBySessionQuery,
  useGetFluteIncomeQuery,
  useGetFluteIncomeByConsultantsQuery,
  useGetFluteIncomeByUsersQuery,
  useGetFluteRefundToUserQuery,
  useGetConsultantPayoutAmountQuery,
} from "../../../_store/api";
import { Atom } from "react-loading-indicators";

const FluteEarning = () => {
  const [consultantEarning, setConsultantEarning] = useState([]);
  const [consultantEarningSession, setConsultantEarningSession] = useState([]);
  const [fluteEarning, setFluteEarning] = useState([]);
  const [fluteIncByConslt, setFluteIncByConslt] = useState([]);
  const [fluteIncByUsers, setFluteIncByUsers] = useState([]);
  const [fluteRefToUser, setFluteRefToUser] = useState([]);
  const [consltPayoutIncome, setConsltPayoutIncome] = useState([]);

  const { data: fetchData } = useGetConsultantIncomeQuery();
  const { data: SessionIncom } = useGetConsultantIncomeBySessionQuery();
  const { data: fluteIncome, isLoading } = useGetFluteIncomeQuery();
  const { data: fluteIncomeByConslt } = useGetFluteIncomeByConsultantsQuery();
  const { data: fluteIncomeByUsers } = useGetFluteIncomeByUsersQuery();
  const { data: fluteRefToUsers } = useGetFluteRefundToUserQuery();
  const { data: ConsltPayoutInc } = useGetConsultantPayoutAmountQuery();

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setConsultantEarning(fetchData?.data);
    }
    if (SessionIncom && SessionIncom?.data) {
      setConsultantEarningSession(SessionIncom?.data);
    }
    if (fluteIncome && fluteIncome?.data) {
      setFluteEarning(fluteIncome?.data);
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
  }, [
    fetchData,
    fluteIncome,
    fluteIncomeByConslt,
    fluteIncomeByUsers,
    fluteRefToUsers,
    ConsltPayoutInc,
  ]);

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }
  return (
    <div className="profile-section">
      <div className="dashboard-main-card">
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
        <h2 className="dashboard-heading">Consultant Income by Order</h2>
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
        <h2 className="dashboard-heading">Consultant Income by session</h2>
        <div className="dashboard-grid">
          {consultantEarningSession.map((item) => (
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
              price={item.value || 0}
              bgcolor={item.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FluteEarning;
