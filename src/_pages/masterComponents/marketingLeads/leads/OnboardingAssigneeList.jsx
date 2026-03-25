import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetMarketingLeadsLOnboardingAssigneeQuery } from "../../../../_store/api";
import usePermissions from "../../../../_components/reuseComponents/permission/EmpPermission";
import { useSelector } from "react-redux";

const CategoryCard = ({ registeredLink, item }) => {
  return (
    <div className="onboarding-card-wrapper">
      <div className="onboarding-specialist-card">
        <div className="onboarding-card-header">
          <h3 className="onboarding-specialist-name">{item.assign_to}</h3>
          <span className="onboarding-specialist-id">ID: {item.id}</span>
        </div>

        <div className="onboarding-card-body">
          <div className="onboarding-stats-grid">
            <div className="onboarding-stat-item onboarding-stat-primary">
              <span className="onboarding-stat-label">Assigned</span>
              <span className="onboarding-stat-value">{item.total_leads}</span>
            </div>

            <div className="onboarding-stat-item onboarding-stat-success">
              <span className="onboarding-stat-label">Verified</span>
              <span className="onboarding-stat-value">{item.verified}</span>
            </div>

            <div className="onboarding-stat-item onboarding-stat-warning">
              <span className="onboarding-stat-label">Pending</span>
              <span className="onboarding-stat-value">{item.pending}</span>
            </div>
            <div className="onboarding-stat-item onboarding-stat-warning">
              <span className="onboarding-stat-label">not interested</span>
              <span className="onboarding-stat-value">
                {item.not_interested}
              </span>
            </div>
          </div>

          {/* <div className="onboarding-timeline-stats">
            <h4 className="onboarding-timeline-title">Total Verified</h4>
            <div className="onboarding-timeline-grid">
              <div className="onboarding-timeline-item">
                <span className="onboarding-timeline-icon">📅</span>
                <div className="onboarding-timeline-content">
                  <span className="onboarding-timeline-label">Today</span>
                  <span className="onboarding-timeline-value">
                    {item.today_verified}
                  </span>
                </div>
              </div>

              <div className="onboarding-timeline-item">
                <span className="onboarding-timeline-icon">📊</span>
                <div className="onboarding-timeline-content">
                  <span className="onboarding-timeline-label">This Week</span>
                  <span className="onboarding-timeline-value">
                    {item.week_verified}
                  </span>
                </div>
              </div>

              <div className="onboarding-timeline-item">
                <span className="onboarding-timeline-icon">📈</span>
                <div className="onboarding-timeline-content">
                  <span className="onboarding-timeline-label">This Month</span>
                  <span className="onboarding-timeline-value">
                    {item.month_verified}
                  </span>
                </div>
              </div>
            </div>
          </div> f */}
        </div>

        <Link to={registeredLink} className="onboarding-card-link">
          <div className="onboarding-card-footer">
            <span className="onboarding-view-details">Veiw Details →</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

const OnboardingAssigneeList = () => {
  const { user } = useSelector((state) => state.auth);
  const permissions = usePermissions();
  const canViewAll = permissions?.["onboarding"]?.includes("view_onboarding_stats");

  const [metadataItems, setMetadataItems] = useState([]);
  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetMarketingLeadsLOnboardingAssigneeQuery({});

  useEffect(() => {
    if (!fetchData?.data) {
      setMetadataItems([]);
      return;
    }

    if (canViewAll) {
      setMetadataItems(fetchData.data);
    } else {
      setMetadataItems(
        fetchData.data.filter((item) => item.id == user?.id),
      );
    }
  }, [fetchData, canViewAll]);

  return (
    <div className="onboarding-main-container">
      <div className="onboarding-header-section">
        <p className="onboarding-page-subtitle">
          Manage and monitor specialist assignments
        </p>
      </div>

      <div className="onboarding-cards-grid">
        {metadataItems.map((item) => (
          <CategoryCard
            key={item.admin_id}
            item={item}
            registeredLink={`/marketing-leads/onboarding/${item.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default OnboardingAssigneeList;
