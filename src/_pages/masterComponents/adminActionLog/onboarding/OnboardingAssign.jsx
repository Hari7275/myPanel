import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetAdminOnboardingSpecialistListQuery } from "../../../../_store/api";
import "./OnboardingAssign.css";
import { useSelector } from "react-redux"; // Added

const CategoryCard = ({ registeredLink, unregisteredLink, item }) => {
  return (
    <div className="onboarding-card-wrapper">
      <div className="onboarding-specialist-card">
        <div className="onboarding-card-header">
          <h3 className="onboarding-specialist-name">{item.name}</h3>
          <span className="onboarding-specialist-id">ID: {item.admin_id}</span>
        </div>

        <div className="onboarding-card-body">
          <div className="onboarding-stats-grid">
            <div className="onboarding-stat-item onboarding-stat-primary">
              <span className="onboarding-stat-label">Assigned</span>
              <span className="onboarding-stat-value">
                {item.total_assigned}
              </span>
            </div>

            <div className="onboarding-stat-item onboarding-stat-success">
              <span className="onboarding-stat-label">Verified</span>
              <span className="onboarding-stat-value">
                {item.total_verified}
              </span>
            </div>

            <div className="onboarding-stat-item onboarding-stat-warning">
              <span className="onboarding-stat-label">Pending</span>
              <span className="onboarding-stat-value">
                {item.total_pending}
              </span>
            </div>
            <div className="onboarding-stat-item onboarding-stat-warning">
              <span className="onboarding-stat-label">Others</span>
              <span className="onboarding-stat-value">{item.total_other}</span>
            </div>
          </div>

          <div className="onboarding-timeline-stats">
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
          </div>
        </div>

        <Link to={registeredLink} className="onboarding-card-link">
          <div className="onboarding-card-footer">
            <span className="onboarding-view-details">
              Registered Consultant →
            </span>
          </div>
        </Link>

        <Link to={unregisteredLink} className="onboarding-card-link">
          <div className="onboarding-card-footer">
            <span className="onboarding-view-details">
              Unregistered Consultant →
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

const OnboardingAssign = () => {
  const { user } = useSelector((state) => state.auth);

  console.log("user....", user?.id);
  const [metadataItems, setMetadataItems] = useState([]);
  const { data: fetchData } = useGetAdminOnboardingSpecialistListQuery({});

  useEffect(() => {
    if (!fetchData?.data) {
      setMetadataItems([]);
      return;
    }

    const allAdmins = [2, 4, 20, 29];

    if (allAdmins.includes(user?.id)) {
      setMetadataItems(fetchData.data);
    } else {
      setMetadataItems(
        fetchData.data.filter((item) => item.admin_id == user?.id)
      );
    }
  }, [fetchData, user?.id]);

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
            registeredLink={`/onboarding-assign/${item.admin_id}`}
            unregisteredLink={`/onboarding-assign/unregistered/${item.admin_id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default OnboardingAssign;
