import React, { useState, useRef, useEffect } from "react";
import "../cssfolder/sidebar.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import ManageHistoryOutlinedIcon from "@mui/icons-material/ManageHistoryOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import DeviceUnknownIcon from "@mui/icons-material/DeviceUnknown";
// import { hasPermission } from "../_store/api/tokenHelper";
import { useSelector, useDispatch } from "react-redux";
import { setPageTitle } from "../_store/slices/pageTitleSlice";
import usePermissions from "../_components/reuseComponents/permission/EmpPermission";
import { KeyRound } from "lucide-react";

import "aos/dist/aos.css";

import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState("");
  const [isPayment, setIsPayment] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [isOnboarding, setIsOnboarding] = useState("");
  const [isMarketingLeads, setIsMarketingLeads] = useState("");
  const [isNotice, setIsNotice] = useState();
  const [isNotification, setIsNotifications] = useState();
  const [isQuickDate, setIsQuickDate] = useState();
  const [isShowSupport, setIsShowSupport] = useState();
  const [activeItem, setActiveItem] = useState("");
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const permissions = usePermissions();

  const { user } = useSelector((state) => state.auth);

  console.log("(user?.id === 4)", user?.id === 4);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const paymentDropdown = () => {
    setIsPayment(!isPayment);
  };

  const adminDropdown = () => {
    setIsAdmin(!isAdmin);
  };

  const onboardingDropdown = () => {
    setIsOnboarding(!isOnboarding);
  };

  const marketingLeadsDropdown = () => {
    setIsMarketingLeads(!isMarketingLeads);
  };
  const noticeDropdown = () => {
    setIsNotice(!isNotice);
  };

  const notificationDropdown = () => {
    setIsNotifications(!isNotification);
  };
  const quickDateDropdown = () => {
    setIsQuickDate(!isQuickDate);
  };

  const supportDropdown = () => {
    setIsShowSupport(!isShowSupport);
  };

  // code for highlighted text

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  // const permissions = useSelector((state) => state.auth?.permissions || {});

  // console.log("permissions in sidebar", permissions);

  console.log("permissions by hooks", permissions);

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
            {/* allow permission */}
            {permissions?.["admin"] && (
              <div className="menu-item-child">
                <div className="child" onClick={adminDropdown}>
                  <SupervisorAccountIcon />
                  <span>Admin Section</span>

                  <span>{isAdmin ? "⬇️" : "⬅️"}</span>
                </div>

                {isAdmin && (
                  <div className="menu-item-sub">
                    {permissions?.["admin"]?.includes("view_admin_role") && ( //permission for role
                      <Link to="admin-roles">
                        <div
                          className={`menu-item ${
                            activeItem === "Roles" ? "active" : ""
                          }`}
                          onClick={() => handleItemClick("Roles")}
                        >
                          <div className="dropdown-item"> Roles</div>
                        </div>
                      </Link>
                    )}
                    {permissions?.["admin"]?.includes(
                      "view_admin_permission_group_section"
                    ) && (
                      <Link to="/admin-permission">
                        <div
                          className={`menu-item ${
                            activeItem === "Permission" ? "active" : ""
                          }`}
                          onClick={() => handleItemClick("Permission")}
                        >
                          <div className="dropdown-item">Permission Group </div>
                        </div>
                      </Link>
                    )}

                    {permissions?.["admin"]?.includes(
                      "view_admin_users_section"
                    ) && (
                      <Link to="/admin-user">
                        <div
                          className={`menu-item ${
                            activeItem === "admin-user" ? "active" : ""
                          }`}
                          onClick={() => handleItemClick("admin-user")}
                        >
                          <div className="dropdown-item">Admin User </div>
                        </div>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ****************************admin action log**********************************  */}

            <div className="menu-item-child">
              <div className="child" onClick={onboardingDropdown}>
                <SupervisorAccountIcon />
                <span>Onboarding</span>

                <span>{isOnboarding ? "⬇️" : "⬅️"}</span>
              </div>

              {isOnboarding && (
                <div className="menu-item-sub">
                  {/* {permissions?.["admin"]?.includes("view_admin_role") && ( */}
                  <Link to="onboarding-assign">
                    <div
                      className={`menu-item ${
                        activeItem === "onboarding-assign" ? "active" : ""
                      }`}
                      onClick={() => handleItemClick("onboarding-assign")}
                    >
                      <div className="dropdown-item"> Onboarding Assign</div>
                    </div>
                  </Link>
                  {/* )} */}
                  {/* {permissions?.["admin"]?.includes(
                    "view_admin_permission_group_section"
                  ) && ( */}
                  <Link to="/action-log">
                    <div
                      className={`menu-item ${
                        activeItem === "action-log" ? "active" : ""
                      }`}
                      onClick={() => handleItemClick("action-log")}
                    >
                      <div className="dropdown-item">Action log</div>
                    </div>
                  </Link>
                  {/* )} */}
                </div>
              )}
            </div>

            {/* **************************** marketing leads ***************************** */}
            <div className="menu-item-child">
              <div className="child" onClick={marketingLeadsDropdown}>
                <SupervisorAccountIcon />
                <span>Marketing Leads</span>

                <span>{isMarketingLeads ? "⬇️" : "⬅️"}</span>
              </div>

              {isMarketingLeads && (
                <div className="menu-item-sub">
                  {/* {permissions?.["admin"]?.includes("view_admin_role") && ( */}
                  <Link to="leads-list">
                    <div
                      className={`menu-item ${
                        activeItem === "leads-list" ? "active" : ""
                      }`}
                      onClick={() => handleItemClick("leads-list")}
                    >
                      <div className="dropdown-item">Leads List</div>
                    </div>
                  </Link>

                  <Link to="marketing-assignee">
                    <div
                      className={`menu-item ${
                        activeItem === "marketing-assignee" ? "active" : ""
                      }`}
                      onClick={() => handleItemClick("marketing-assignee")}
                    >
                      <div className="dropdown-item">Assignee List</div>
                    </div>
                  </Link>

                  {/* <Link to="/action-log">
                    <div
                      className={`menu-item ${
                        activeItem === "action-log" ? "active" : ""
                      }`}
                      onClick={() => handleItemClick("action-log")}
                    >
                      <div className="dropdown-item">Action log</div>
                    </div>
                  </Link> */}
                </div>
              )}
            </div>

            <div>
              {permissions?.["Dashboard"]?.includes("view_dashboard") && (
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
              )}
              {permissions?.["user"] && (
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
              )}

              {/* {permissions?.["user"] && ( */}
              <Link to="/untracked-user">
                <div
                  className={`menu-item ${
                    activeItem === "untracked-user" ? "active" : ""
                  }`}
                  onClick={() => handleItemClick("untracked-user")}
                >
                  <GroupOutlinedIcon />
                  <span>Guest Device Info</span>
                </div>
              </Link>

              <Link to="/user-device-info">
                <div
                  className={`menu-item ${
                    activeItem === "user-device-info" ? "active" : ""
                  }`}
                  onClick={() => handleItemClick("user-device-info")}
                >
                  <GroupOutlinedIcon />
                  <span>User Device Info</span>
                </div>
              </Link>
              {/* )} */}
              <Link to="/consultant-device-info">
                <div
                  className={`menu-item ${
                    activeItem === "device-info" ? "active" : ""
                  }`}
                  onClick={() => handleItemClick("device-info")}
                >
                  <DeviceUnknownIcon />
                  <span>Consultant device info</span>
                </div>
              </Link>
            </div>

            {/* changes for coaches */}

            <div>
              {permissions?.["coach"] && (
                <Link to="/coaches">
                  <div
                    className={`menu-item ${
                      activeItem === "Coaches" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("Coaches")}
                  >
                    <img
                      src="/adminPannel_icons/Coach.png"
                      width="24"
                      height="24"
                    />
                    <span>Coaches</span>
                  </div>
                </Link>
              )}
              {permissions?.["listener"] && (
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
              )}
              {permissions?.["astrologer"] && (
                <Link to="/astrologer">
                  <div
                    className={`menu-item ${
                      activeItem === "Astrologer" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("Astrologer")}
                  >
                    {/* <HeadphonesOutlinedIcon /> */}
                    <img
                      src="/adminPannel_icons/astrologers.png"
                      width="24"
                      height="24"
                    />
                    <span>Astrologer</span>
                  </div>
                </Link>
              )}
              {/* {permissions?.["astrologer"] && ( */}
              <Link to="/profile-review">
                <div
                  className={`menu-item ${
                    activeItem === "profile-review" ? "active" : ""
                  }`}
                  onClick={() => handleItemClick("profile-review")}
                >
                  {/* <HeadphonesOutlinedIcon /> */}
                  <img
                    src="/adminPannel_icons/Coach.png"
                    width="24"
                    height="24"
                  />
                  <span>Review Request</span>
                </div>
              </Link>
              {/* )} */}
            </div>
          </div>

          <div className="menu-group">
            {/* user recaharge list */}
            {permissions?.["user_recharge_list"]?.includes(
              "view_recharge_list"
            ) && (
              <Link to="/user-recharge">
                <div
                  className={`menu-item ${
                    activeItem === "user-recharge" ? "active" : ""
                  }`}
                  onClick={() => handleItemClick("user-recharge")}
                >
                  <CardGiftcardOutlinedIcon />
                  <span>User Recharge List</span>
                </div>
              </Link>
            )}

            {permissions?.["user_recharge_list"]?.includes(
              "view_recharge_list"
            ) && (
              <Link to="/user-recharge-summary">
                <div
                  className={`menu-item ${
                    activeItem === "user-recharge-summary" ? "active" : ""
                  }`}
                  onClick={() => handleItemClick("user-recharge-summary")}
                >
                  <CardGiftcardOutlinedIcon />
                  <span>Recharge Summary</span>
                </div>
              </Link>
            )}

            {/* user subscription  list  */}
            <Link to="/user-subscription">
              <div
                className={`menu-item ${
                  activeItem === "user-subscription" ? "active" : ""
                }`}
                onClick={() => handleItemClick("user-subscription")}
              >
                <CardGiftcardOutlinedIcon />
                <span>User Subscription List</span>
              </div>
            </Link>

            {permissions?.["user_recharge_list"]?.includes(
              "view_recharge_list"
            ) && (
              <>
                <Link to="payable-History">
                  <div
                    className={`menu-item ${
                      activeItem === "payable-History" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("payable-History")}
                  >
                    <CardGiftcardOutlinedIcon />
                    <span>Payable Log</span>
                  </div>
                </Link>

                <Link to="payout-History">
                  <div
                    className={`menu-item ${
                      activeItem === "payout-History" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("payout-History")}
                  >
                    <CardGiftcardOutlinedIcon />
                    <span>Payout History</span>
                  </div>
                </Link>
              </>
            )}

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
              <img
                src="/adminPannel_icons/payment.png"
                width="24"
                height="24"
              />
              <span>Payments</span>

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
                <Link to="qd-products">
                  <div
                    className={`menu-item ${
                      activeItem === "qd-Products" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("qd-Products")}
                  >
                    <div className="dropdown-item"> Qd Products</div>
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

                {/* <Link to="payout-request">
                  <div
                    className={`menu-item ${
                      activeItem === "payout-request" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("payout-request")}
                  >
                    <div className="dropdown-item">Payout Request</div>
                  </div>
                </Link> */}

                {/* <Link to="payout-History">
                  <div
                    className={`menu-item ${
                      activeItem === "payout-History" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("payout-History")}
                  >
                    <div className="dropdown-item">Payout History</div>
                  </div>
                </Link> */}

                {/* <Link to="payable-History">
                  <div
                    className={`menu-item ${
                      activeItem === "payable-History" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("payable-History")}
                  >
                    <div className="dropdown-item">Payable Log</div>
                  </div>
                </Link> */}

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
              <span>Dating Meta Data</span>

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

          {/* notice manager */}

          <div className="menu-item-child">
            <div className="child" onClick={noticeDropdown}>
              <ManageHistoryOutlinedIcon />
              <span>Notice Manager</span>

              <span>{isNotice ? "⬇️" : "⬅️"}</span>
            </div>

            {isNotice && (
              <div className="menu-item-sub">
                <Link to="consultant-notice">
                  <div
                    className={`menu-item ${
                      activeItem === "consultant-notice" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("consultant-notice")}
                  >
                    <div className="dropdown-item">Notice List</div>
                  </div>
                </Link>
                <Link to="/assign-notice">
                  <div
                    className={`menu-item ${
                      activeItem === "assign-notice" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("assign-notice")}
                  >
                    <div className="dropdown-item">Manage Notice</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* notification setting */}

          <div className="menu-item-child">
            <div className="child" onClick={notificationDropdown}>
              <ManageHistoryOutlinedIcon />
              <span>Notification Manager</span>

              <span>{isNotification ? "⬇️" : "⬅️"}</span>
            </div>

            {isNotification && (
              <div className="menu-item-sub">
                <Link to="user-notification">
                  <div
                    className={`menu-item ${
                      activeItem === "user-notif" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("user-notif")}
                  >
                    <div className="dropdown-item">User Notification</div>
                  </div>
                </Link>
                <Link to="/notification-template">
                  <div
                    className={`menu-item ${
                      activeItem === "Notification-Template" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("Notification-Template")}
                  >
                    <div className="dropdown-item">Notification Template</div>
                  </div>
                </Link>
                <Link to="/send-notification">
                  <div
                    className={`menu-item ${
                      activeItem === "send-Notification" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("send-Notification")}
                  >
                    <div className="dropdown-item">Send Notification</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Quick Date */}

          <div className="menu-item-child">
            <div className="child" onClick={quickDateDropdown}>
              <img
                src="/adminPannel_icons/QD trips.png"
                width="24"
                height="24"
              />
              <span>Quick Date</span>

              <span>{isQuickDate ? "⬇️" : "⬅️"}</span>
            </div>

            {isQuickDate && (
              <div className="menu-item-sub">
                <Link to="qd-trips">
                  <div
                    className={`menu-item ${
                      activeItem === "qd-trips" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("qd-trips")}
                  >
                    <img
                      src="/adminPannel_icons/QD trips.png"
                      width="24"
                      height="24"
                    />
                    <div className="dropdown-item">QD Trips</div>
                  </div>
                </Link>
                <Link to="/qd-location">
                  <div
                    className={`menu-item ${
                      activeItem === "qd-location" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("qd-location")}
                  >
                    <img
                      src="/adminPannel_icons/QD_location.png"
                      width="24"
                      height="24"
                    />
                    <div className="dropdown-item">QD Location</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* support */}

          <div className="menu-item-child">
            <div className="child" onClick={supportDropdown}>
              <img
                src="/adminPannel_icons/support.png"
                width="24"
                height="24"
              />
              <span>Support</span>

              <span>{isShowSupport ? "⬇️" : "⬅️"}</span>
            </div>

            {isShowSupport && (
              <div className="menu-item-sub">
                <Link to="/user-support">
                  <div
                    className={`menu-item ${
                      activeItem === "user-support" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("user-support")}
                  >
                    {/* <img
                      src="/adminPannel_icons/QD trips.png"
                      width="24"
                      height="24"
                    /> */}
                    <div className="dropdown-item">User Support</div>
                  </div>
                </Link>
                <Link to="/consultant-support">
                  <div
                    className={`menu-item ${
                      activeItem === "consultant-support" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("consultant-support")}
                  >
                    {/* <img
                      src="/adminPannel_icons/QD_location.png"
                      width="24"
                      height="24"
                    /> */}
                    <div className="dropdown-item">Consultant Support</div>
                  </div>
                </Link>
              </div>
            )}
          </div>
          <div className="menu-group">
            <Link to="/blog-count">
              <div
                className={`menu-item ${
                  activeItem === "blog-count" ? "active" : ""
                }`}
                onClick={() => handleItemClick("blog-count")}
              >
                <img
                  src="/adminPannel_icons/support.png"
                  width="24"
                  height="24"
                />
                <span>Blog View Count</span>
              </div>
            </Link>

            <Link to="/action-log">
              <div
                className={`menu-item ${
                  activeItem === "action-log" ? "active" : ""
                }`}
                onClick={() => handleItemClick("action-log")}
              >
                {/* <img
                  src="/adminPannel_icons/support.png"
                  width="24"
                  height="24"
                /> */}
                <ManageHistoryOutlinedIcon />
                <span>Action log</span>
              </div>
            </Link>

            {/* <div
              className={`menu-item ${
                activeItem === "package Update" ? "active" : ""
              }`}
              onClick={() => handleItemClick("package Update")}
            >
              <Link to="/subs-package">
                <img
                  src="/adminPannel_icons/update.png"
                  width="24"
                  height="24"
                />
                <span>Package Update</span>
              </Link>
            </div> */}

            {/* <div
              className={`menu-item ${
                activeItem === "QD Trips" ? "active" : ""
              }`}
              onClick={() => handleItemClick("QD Trips")}
            >
              <Link to="/qd-trips">
                <img
                  src="/adminPannel_icons/QD trips.png"
                  width="24"
                  height="24"
                />
                <span>QD Trips</span>
              </Link>
            </div> */}

            {/* <div
              className={`menu-item ${
                activeItem === "qd-location" ? "active" : ""
              }`}
              onClick={() => handleItemClick("qd-location")}
            >
              <Link to="/qd-location">
                <img
                  src="/adminPannel_icons/QD_location.png"
                  width="24"
                  height="24"
                />
                <span>QD Location</span>
              </Link>
            </div> */}

            {/* <div
              className={`menu-item ${
                activeItem === "feedback" ? "active" : ""
              }`}
              onClick={() => handleItemClick("feedback")}
            >
              <Link to="/feedback-list">
                <img
                  src="/adminPannel_icons/feedback.png"
                  width="24"
                  height="24"
                />
                <span>Feedback</span>
              </Link>
            </div> */}

            {/* <div className="menu-item">
              <HistoryOutlinedIcon />
              <span>Next Entry</span>
            </div> */}
          </div>
        </div>
      ) : (
        <aside className="sidebar ">
          <div className="menu-btn" onClick={toggleMenu}>
            <MenuOutlinedIcon />
          </div>

          <div className="sidebar-items">
            {permissions?.["Dashboard"]?.includes("view_dashboard") && (
              <Link to="/dashboard">
                <div className="item">
                  <span className="icon">
                    <GridViewOutlinedIcon />
                  </span>
                  <span>Dashboard</span>
                </div>
              </Link>
            )}
            {permissions?.["user"] && (
              <Link to="/user">
                <div className="item">
                  <GroupOutlinedIcon />
                  <span>Users</span>
                </div>
              </Link>
            )}
            <Link to="auth-consultant">
              <div className="item">
                <img
                  src="/adminPannel_icons/Coach.png"
                  width="24"
                  height="24"
                />
                <span>Consultant</span>
              </div>
            </Link>
            {permissions?.["astrologer"]?.includes("view_astrologer_list") && (
              <Link to="astrologer">
                <div className="item">
                  <img
                    src="/adminPannel_icons/astrologers.png"
                    width="24"
                    height="24"
                  />
                  <span>Astrologer</span>
                </div>
              </Link>
            )}
            <Link to="/coaches">
              <div className="item">
                <img
                  src="/adminPannel_icons/Coach.png"
                  // src="/adminPannel_icons/astrologers.png"
                  width="24"
                  height="24"
                />
                <span>Coaches</span>
              </div>
            </Link>

            {/* {permissions?.["Listeners"] && ( */}
            <Link to="/listeners">
              <div className="item">
                <HeadphonesOutlinedIcon />
                <span>Listeners</span>
              </div>
            </Link>
            {/* )} */}
            {permissions?.["meta_data_section"] && (
              <Link to="/meta-data">
                <div className="item">
                  <CategoryOutlinedIcon />
                  <span>Meta Data</span>
                </div>
              </Link>
            )}

            {/* {permissions?.[("Dashboard", "Listeners")]?.includes(
              "Review Profilkem"
            ) && ( */}
            <Link to="/order">
              <div className="item">
                <CardGiftcardOutlinedIcon />
                <span>Orders</span>
              </div>
            </Link>

            <Link to="/gift-history">
              <div className="item">
                <CardGiftcardOutlinedIcon />
                <span>Gifts</span>
              </div>
            </Link>

            {permissions?.["user_recharge_list"]?.includes(
              "view_recharge_list"
            ) && (
              <Link to="/user-recharge">
                <div className="item">
                  <CardGiftcardOutlinedIcon />
                  <span>Recharge List</span>
                </div>
              </Link>
            )}
            {permissions?.["razorpay_list"]?.includes("view_razorpay_list") && (
              <Link to="/razorpay-recharge">
                <div className="item">
                  <CardGiftcardOutlinedIcon />
                  <span>Razorpay List</span>
                </div>
              </Link>
            )}

            <Link to="/onboarding-assign">
              <div className="item">
                <KeyRound />
                <span>Onboarding</span>
              </div>
            </Link>
            <Link to="/marketing-assignee">
              <div className="item">
                <KeyRound />
                <span>Assignee List</span>
              </div>
            </Link>

            <Link to="/session">
              <div className="item">
                <CardGiftcardOutlinedIcon />
                <span>Session</span>
              </div>
            </Link>
            {permissions?.["meta_data_section"] &&
              [1, 3, 4].includes(user?.id) && (
                <Link to="/cms-data">
                  <div className="item">
                    <CategoryOutlinedIcon />
                    <span>Cms Data</span>
                  </div>
                </Link>
              )}
          </div>
        </aside>
      )}
    </div>
  );
};

export default Sidebar;
