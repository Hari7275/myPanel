import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetAdminOnboardingSpecialistListQuery } from "../../../../_store/api";
import "./OnboardingAssign.css"; // Import the CSS file

const CategoryCard = ({ link, item }) => {
  const cardContent = (
    //  <div className="profile-section">
    //     <div className="profileMainComponent"></div>
    <div className="onboarding-specialist-card ">
      <div className="onboarding-card-header">
        <h3 className="onboarding-specialist-name">{item.name}</h3>
        <span className="onboarding-specialist-id">ID: {item.admin_id}</span>
      </div>

      <div className="onboarding-card-body t">
        <div className="onboarding-stats-grid">
          <div className="onboarding-stat-item onboarding-stat-primary">
            <span className="onboarding-stat-label">Assigned</span>
            <span className="onboarding-stat-value">{item.total_assigned}</span>
          </div>

          <div className="onboarding-stat-item onboarding-stat-success">
            <span className="onboarding-stat-label">Verified</span>
            <span className="onboarding-stat-value">{item.total_verified}</span>
          </div>

          <div className="onboarding-stat-item onboarding-stat-warning">
            <span className="onboarding-stat-label">Pending</span>
            <span className="onboarding-stat-value">{item.total_pending}</span>
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

      <Link to={link} className="onboarding-card-link">
        <div className="onboarding-card-footer">
          <span className="onboarding-view-details">View Details →</span>
        </div>
      </Link>
    </div>
  );

  return (
    <div className="onboarding-card-wrapper">
      {link ? (
        <Link to={link} className="onboarding-card-link">
          {cardContent}
        </Link>
      ) : (
        <div className="onboarding-card-no-link">{cardContent}</div>
      )}
    </div>
  );
};

const OnboardingAssign = () => {
  const [metadataItems, setMetadataItems] = useState([]);
  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetAdminOnboardingSpecialistListQuery({});

  useEffect(() => {
    if (fetchData?.data) {
      setMetadataItems(fetchData.data);
    } else {
      setMetadataItems([]);
    }
  }, [fetchData]);

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
            link={`/onboarding-assign/${item.admin_id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default OnboardingAssign;
