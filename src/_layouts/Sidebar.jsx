import React, { useState, useRef } from "react";
import "../cssfolder/sidebar.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import ManageHistoryOutlinedIcon from "@mui/icons-material/ManageHistoryOutlined";
import PhotoCameraFrontOutlinedIcon from "@mui/icons-material/PhotoCameraFrontOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import "aos/dist/aos.css";

import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState("");
  const [isPayment, setIsPayment] = useState("");
  const [activeItem, setActiveItem] = useState("");
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const paymentDropdown = () => {
    setIsPayment(!isPayment);
  };

  // code for highlighted text

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="sideContainer">
      {isMenuOpen ? (
        <div id="menu" className={isMenuOpen ? "visible" : ""} ref={menuRef}>
          <div className="menu-header">
            <div className="menu-btn" onClick={toggleMenu}>
              <MenuOutlinedIcon />
            </div>
          </div>

          <div className="menu-grou">
            <div>
              <Link to="/dashboard">
                <div
                  className={`menu-item ${
                    activeItem === "Dashboard" ? "active" : ""
                  }`}
                  onClick={() => handleItemClick("Dahboard")}
                >
                  <GridViewOutlinedIcon />
                  <span>Dashboard</span>
                </div>
              </Link>

              <Link to="/user">
                <div
                  className={`menu-item ${
                    activeItem === "Users" ? "active" : ""
                  }`}
                  onClick={() => handleItemClick("Users")}
                >
                  <GroupOutlinedIcon />
                  <span>Users</span>
                </div>
              </Link>
            </div>

            {/* changes for coaches */}

            <div>
              <Link to="/coaches">
                <div
                  className={`menu-item ${
                    activeItem === "Coaches" ? "active" : ""
                  }`}
                  onClick={() => handleItemClick("Coaches")}
                >
                  <HeadphonesOutlinedIcon />
                  <span>Coaches </span>
                </div>
              </Link>

              <Link to="/listeners">
                <div
                  className={`menu-item ${
                    activeItem === "Listeners" ? "active" : ""
                  }`}
                  onClick={() => handleItemClick("Listeners")}
                >
                  <HeadphonesOutlinedIcon />
                  <span>Listeners</span>
                </div>
              </Link>

              <Link to="/astrologer">
                <div
                  className={`menu-item ${
                    activeItem === "Astrologer" ? "active" : ""
                  }`}
                  onClick={() => handleItemClick("Astrologer")}
                >
                  <HeadphonesOutlinedIcon />
                  <span>Astrologer</span>
                </div>
              </Link>
            </div>
          </div>

          <div className="menu-group">
            <Link to="/order">
              <div
                className={`menu-item ${
                  activeItem === "Order" ? "active" : ""
                }`}
                onClick={() => handleItemClick("Order")}
              >
                <CardGiftcardOutlinedIcon />
                <span>Order</span>
              </div>
            </Link>

            <Link to="/gift">
              <div
                className={`menu-item ${
                  activeItem === "Gifts" ? "active" : ""
                }`}
                onClick={() => handleItemClick("Gifts")}
              >
                <CardGiftcardOutlinedIcon />
                <span>Gifts</span>
              </div>
            </Link>
          </div>

          {/* ********************************************* payment services ********************************************************************* */}

          <div className="menu-item-child">
            <div className="child" onClick={paymentDropdown}>
              <ManageHistoryOutlinedIcon />
              <span>Payment Services</span>

              <span>{isPayment ? "⬇️" : "⬅️"}</span>
            </div>

            {isPayment && (
              <div className="menu-item-sub">
                <Link to="dating-products">
                  <div
                    className={`menu-item ${
                      activeItem === "Dating-Products" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("Dating-Products")}
                  >
                    <div className="dropdown-item"> Dating Products</div>
                  </div>
                </Link>
                <Link to="/feature-list">
                  <div
                    className={`menu-item ${
                      activeItem === "Feature-List" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("Feature-List")}
                  >
                    <div className="dropdown-item">Featuers </div>
                  </div>
                </Link>

                <Link to="payment-transactions">
                  <div
                    className={`menu-item ${
                      activeItem === "Payment-Transactions" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("Payment-Transactions")}
                  >
                    <div className="dropdown-item">Payment Transactions</div>
                  </div>
                </Link>

                <Link to="recharge-plans">
                  <div
                    className={`menu-item ${
                      activeItem === "Recharge-Plans" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("Recharge-Plans")}
                  >
                    <div className="dropdown-item">Recharge Plans</div>
                  </div>
                </Link>

                <Link to="subscriptions-plans">
                  <div
                    className={`menu-item ${
                      activeItem === "Subscription-plans" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("Subscription-plans")}
                  >
                    <div className="dropdown-item">Subscription Plans</div>
                  </div>
                </Link>

                <Link to="payout-request">
                  <div
                    className={`menu-item ${
                      activeItem === "payout-request" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("payout-request")}
                  >
                    <div className="dropdown-item">Payout Request</div>
                  </div>
                </Link>

                <Link to="payout-History">
                  <div
                    className={`menu-item ${
                      activeItem === "payout-History" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("payout-History")}
                  >
                    <div className="dropdown-item">Payout History</div>
                  </div>
                </Link>

                <Link to="coupon">
                  <div
                    className={`menu-item ${
                      activeItem === "coupon" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("coupon")}
                  >
                    <div className="dropdown-item">Coupon</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <div className="menu-item-child">
            <div className="child" onClick={toggleDropdown}>
              <ManageHistoryOutlinedIcon />
              <span>Profile Options</span>

              <span>{isDropdownOpen ? "⬇️" : "⬅️"}</span>
            </div>

            {isDropdownOpen && (
              <div className="menu-item-sub">
                <Link to="user-profile-option">
                  <div
                    className={`menu-item ${
                      activeItem === "Profile-Options" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("Profile-Options")}
                  >
                    <div className="dropdown-item">Profile Options</div>
                  </div>
                </Link>
                <Link to="/prompt-question">
                  <div
                    className={`menu-item ${
                      activeItem === "Prompt-Questions" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("Prompt-Questions")}
                  >
                    <div className="dropdown-item">Prompt Questions</div>
                  </div>
                </Link>
                <Link to="user-passion">
                  <div
                    className={`menu-item ${
                      activeItem === "Passion-Options" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("Passion-Options")}
                  >
                    <div className="dropdown-item">Passion Options</div>
                  </div>
                </Link>

                <Link to="user-desire">
                  <div
                    className={`menu-item ${
                      activeItem === "user-desire" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("user-desire")}
                  >
                    <div className="dropdown-item">User Desire</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <div className="menu-group">
            <Link to="/user-support">
              <div
                className={`menu-item ${
                  activeItem === "user-support" ? "active" : ""
                }`}
                onClick={() => handleItemClick("user-support")}
              >
                <PhotoCameraFrontOutlinedIcon />
                <span>Support</span>
              </div>
            </Link>

            <div
              className={`menu-item ${
                activeItem === "package Update" ? "active" : ""
              }`}
              onClick={() => handleItemClick("package Update")}
            >
              <Link to="/subs-package">
                <PhotoCameraFrontOutlinedIcon />
                <span>package Update</span>
              </Link>
            </div>

            <div
              className={`menu-item ${
                activeItem === "QD Trips" ? "active" : ""
              }`}
              onClick={() => handleItemClick("QD Trips")}
            >
              <Link to="/qd-trips">
                <PhotoCameraFrontOutlinedIcon />
                <span>QD Trips</span>
              </Link>
            </div>

            <div
              className={`menu-item ${
                activeItem === "qd-location" ? "active" : ""
              }`}
              onClick={() => handleItemClick("qd-location")}
            >
              <Link to="/qd-location">
                <PhotoCameraFrontOutlinedIcon />
                <span>QD Loaction</span>
              </Link>
            </div>

            <div
              className={`menu-item ${
                activeItem === "feedback" ? "active" : ""
              }`}
              onClick={() => handleItemClick("feedback")}
            >
              <Link to="/feedback-list">
                <PhotoCameraFrontOutlinedIcon />
                <span>Feedback</span>
              </Link>
            </div>

            <div className="menu-item">
              <HistoryOutlinedIcon />
              <span>Next Entry</span>
            </div>
          </div>
        </div>
      ) : (
        <aside className="sidebar">
          <div className="menu-btn" onClick={toggleMenu}>
            <MenuOutlinedIcon />
          </div>

          <div className="sidebar-items">
            <Link to="/dashboard">
              <div className="item">
                <span className="icon">
                  <GridViewOutlinedIcon />
                </span>
                <span>Dashboard</span>
              </div>
            </Link>

            <Link to="/user">
              <div className="item">
                <GroupOutlinedIcon />
                <span>Users</span>
              </div>
            </Link>

            <Link to="astrologer">
              <div className="item">
                <GroupOutlinedIcon />
                <span>Astrologer</span>
              </div>
            </Link>

            <Link to="/coaches">
              <div className="item">
                <ContactPhoneOutlinedIcon />
                <span>Coaches</span>
              </div>
            </Link>

            <Link to="/listeners">
              <div className="item">
                <HeadphonesOutlinedIcon />
                <span>Listeners</span>
              </div>
            </Link>

            <Link to="/meta-data">
              <div className="item">
                <CategoryOutlinedIcon />
                <span>Meta Data</span>
              </div>
            </Link>

            <Link to="/profile-review">
              <div className="item">
                <CategoryOutlinedIcon />
                <span>Review</span>
              </div>
            </Link>
          </div>
        </aside>
      )}
    </div>
  );
};

export default Sidebar;
