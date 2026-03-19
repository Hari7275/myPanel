import { useState, useRef } from "react";
import "../cssfolder/sidebar.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import ManageHistoryOutlinedIcon from "@mui/icons-material/ManageHistoryOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import DeviceUnknownIcon from "@mui/icons-material/DeviceUnknown";
import usePermissions from "../_components/reuseComponents/permission/EmpPermission";
import { KeyRound } from "lucide-react";
import "aos/dist/aos.css";
import { Link, useLocation } from "react-router-dom";

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
  const menuRef = useRef(null);
  const permissions = usePermissions();
  const location = useLocation();

  // Normalize path and check if it matches current location
  const isActive = (path) => {
    const normalized = path.startsWith("/") ? path : `/${path}`;
    return (
      location.pathname === normalized ||
      location.pathname.startsWith(normalized + "/")
    );
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const paymentDropdown = () => setIsPayment(!isPayment);
  const adminDropdown = () => setIsAdmin(!isAdmin);
  const onboardingDropdown = () => setIsOnboarding(!isOnboarding);
  const marketingLeadsDropdown = () => setIsMarketingLeads(!isMarketingLeads);
  const noticeDropdown = () => setIsNotice(!isNotice);
  const notificationDropdown = () => setIsNotifications(!isNotification);
  const quickDateDropdown = () => setIsQuickDate(!isQuickDate);
  const supportDropdown = () => setIsShowSupport(!isShowSupport);

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
            {/* Admin Section */}
            {permissions?.["admin"] && (
              <div className="menu-item-child">
                <div className="child" onClick={adminDropdown}>
                  <SupervisorAccountIcon />
                  <span>Admin Section</span>
                  <span>{isAdmin ? "⬇️" : "⬅️"}</span>
                </div>

                {isAdmin && (
                  <div className="menu-item-sub">
                    {permissions?.["admin"]?.includes("view_admin_role") && (
                      <Link to="/admin-roles">
                        <div className={`menu-item ${isActive("/admin-roles") ? "active" : ""}`}>
                          <div className="dropdown-item">Roles</div>
                        </div>
                      </Link>
                    )}
                    {permissions?.["admin"]?.includes("view_admin_permission_group_section") && (
                      <Link to="/admin-permission">
                        <div className={`menu-item ${isActive("/admin-permission") ? "active" : ""}`}>
                          <div className="dropdown-item">Permission Group</div>
                        </div>
                      </Link>
                    )}
                    {permissions?.["admin"]?.includes("view_admin_users_section") && (
                      <Link to="/admin-user">
                        <div className={`menu-item ${isActive("/admin-user") ? "active" : ""}`}>
                          <div className="dropdown-item">Admin User</div>
                        </div>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Onboarding */}
            <div className="menu-item-child">
              <div className="child" onClick={onboardingDropdown}>
                <SupervisorAccountIcon />
                <span>Onboarding</span>
                <span>{isOnboarding ? "⬇️" : "⬅️"}</span>
              </div>

              {isOnboarding && (
                <div className="menu-item-sub">
                  <Link to="/onboarding-assign">
                    <div className={`menu-item ${isActive("/onboarding-assign") ? "active" : ""}`}>
                      <div className="dropdown-item">Onboarding Assign</div>
                    </div>
                  </Link>
                  <Link to="/action-log">
                    <div className={`menu-item ${isActive("/action-log") ? "active" : ""}`}>
                      <div className="dropdown-item">Action log</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Marketing Leads */}
            <div className="menu-item-child">
              <div className="child" onClick={marketingLeadsDropdown}>
                <SupervisorAccountIcon />
                <span>Marketing Leads</span>
                <span>{isMarketingLeads ? "⬇️" : "⬅️"}</span>
              </div>

              {isMarketingLeads && (
                <div className="menu-item-sub">
                  <Link to="/leads-list">
                    <div className={`menu-item ${isActive("/leads-list") ? "active" : ""}`}>
                      <div className="dropdown-item">Leads List</div>
                    </div>
                  </Link>
                  <Link to="/marketing-assignee">
                    <div className={`menu-item ${isActive("/marketing-assignee") ? "active" : ""}`}>
                      <div className="dropdown-item">Assignee List</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <div>
              {permissions?.["Dashboard"]?.includes("view_dashboard") && (
                <Link to="/dashboard">
                  <div className={`menu-item ${isActive("/dashboard") ? "active" : ""}`}>
                    <GridViewOutlinedIcon />
                    <span>Dashboard</span>
                  </div>
                </Link>
              )}
              {permissions?.["user"] && (
                <Link to="/user">
                  <div className={`menu-item ${isActive("/user") ? "active" : ""}`}>
                    <GroupOutlinedIcon />
                    <span>Users</span>
                  </div>
                </Link>
              )}

              <Link to="/untracked-user">
                <div className={`menu-item ${isActive("/untracked-user") ? "active" : ""}`}>
                  <GroupOutlinedIcon />
                  <span>Guest Device Info</span>
                </div>
              </Link>

              <Link to="/user-device-info">
                <div className={`menu-item ${isActive("/user-device-info") ? "active" : ""}`}>
                  <GroupOutlinedIcon />
                  <span>User Device Info</span>
                </div>
              </Link>

              <Link to="/consultant-device-info">
                <div className={`menu-item ${isActive("/consultant-device-info") ? "active" : ""}`}>
                  <DeviceUnknownIcon />
                  <span>Consultant device info</span>
                </div>
              </Link>
            </div>

            {/* Coaches / Listeners / Astrologer */}
            <div>
              {permissions?.["coach"] && (
                <Link to="/coaches">
                  <div className={`menu-item ${isActive("/coaches") ? "active" : ""}`}>
                    <img src="/adminPannel_icons/Coach.png" width="24" height="24" />
                    <span>Coaches</span>
                  </div>
                </Link>
              )}
              {permissions?.["listener"] && (
                <Link to="/listeners">
                  <div className={`menu-item ${isActive("/listeners") ? "active" : ""}`}>
                    <HeadphonesOutlinedIcon />
                    <span>Listeners</span>
                  </div>
                </Link>
              )}
              {permissions?.["astrologer"] && (
                <Link to="/astrologer">
                  <div className={`menu-item ${isActive("/astrologer") ? "active" : ""}`}>
                    <img src="/adminPannel_icons/astrologers.png" width="24" height="24" />
                    <span>Astrologer</span>
                  </div>
                </Link>
              )}
              <Link to="/profile-review">
                <div className={`menu-item ${isActive("/profile-review") ? "active" : ""}`}>
                  <img src="/adminPannel_icons/Coach.png" width="24" height="24" />
                  <span>Review Request</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Recharge / Subscription / Gifts */}
          <div className="menu-group">
            {permissions?.["user_recharge_list"]?.includes("view_recharge_list") && (
              <Link to="/user-recharge">
                <div className={`menu-item ${isActive("/user-recharge") ? "active" : ""}`}>
                  <CardGiftcardOutlinedIcon />
                  <span>User Recharge List</span>
                </div>
              </Link>
            )}

            {permissions?.["user_recharge_list"]?.includes("view_recharge_list") && (
              <Link to="/user-recharge-summary">
                <div className={`menu-item ${isActive("/user-recharge-summary") ? "active" : ""}`}>
                  <CardGiftcardOutlinedIcon />
                  <span>Recharge Summary</span>
                </div>
              </Link>
            )}

            <Link to="/user-subscription">
              <div className={`menu-item ${isActive("/user-subscription") ? "active" : ""}`}>
                <CardGiftcardOutlinedIcon />
                <span>User Subscription List</span>
              </div>
            </Link>

            {permissions?.["user_recharge_list"]?.includes("view_recharge_list") && (
              <>
                <Link to="/payable-History">
                  <div className={`menu-item ${isActive("/payable-History") ? "active" : ""}`}>
                    <CardGiftcardOutlinedIcon />
                    <span>Payable Log</span>
                  </div>
                </Link>
                <Link to="/payout-History">
                  <div className={`menu-item ${isActive("/payout-History") ? "active" : ""}`}>
                    <CardGiftcardOutlinedIcon />
                    <span>Payout History</span>
                  </div>
                </Link>
              </>
            )}

            <Link to="/gift">
              <div className={`menu-item ${isActive("/gift") ? "active" : ""}`}>
                <CardGiftcardOutlinedIcon />
                <span>Gifts</span>
              </div>
            </Link>

            <Link to="/refund-list">
              <div className={`menu-item ${isActive("/refund-list") ? "active" : ""}`}>
                <CardGiftcardOutlinedIcon />
                <span>Refund List</span>
              </div>
            </Link>
          </div>

          {/* Payments */}
          <div className="menu-item-child">
            <div className="child" onClick={paymentDropdown}>
              <img src="/adminPannel_icons/payment.png" width="24" height="24" />
              <span>Payments</span>
              <span>{isPayment ? "⬇️" : "⬅️"}</span>
            </div>

            {isPayment && (
              <div className="menu-item-sub">
                <Link to="/dating-products">
                  <div className={`menu-item ${isActive("/dating-products") ? "active" : ""}`}>
                    <div className="dropdown-item">Dating Products</div>
                  </div>
                </Link>
                <Link to="/qd-products">
                  <div className={`menu-item ${isActive("/qd-products") ? "active" : ""}`}>
                    <div className="dropdown-item">Qd Products</div>
                  </div>
                </Link>
                <Link to="/feature-list">
                  <div className={`menu-item ${isActive("/feature-list") ? "active" : ""}`}>
                    <div className="dropdown-item">Features</div>
                  </div>
                </Link>
                <Link to="/payment-transactions">
                  <div className={`menu-item ${isActive("/payment-transactions") ? "active" : ""}`}>
                    <div className="dropdown-item">Payment Transactions</div>
                  </div>
                </Link>
                <Link to="/recharge-plans">
                  <div className={`menu-item ${isActive("/recharge-plans") ? "active" : ""}`}>
                    <div className="dropdown-item">Recharge Plans</div>
                  </div>
                </Link>
                <Link to="/subscriptions-plans">
                  <div className={`menu-item ${isActive("/subscriptions-plans") ? "active" : ""}`}>
                    <div className="dropdown-item">Subscription Plans</div>
                  </div>
                </Link>
                <Link to="/coupon">
                  <div className={`menu-item ${isActive("/coupon") ? "active" : ""}`}>
                    <div className="dropdown-item">Coupon</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Dating Meta Data */}
          <div className="menu-item-child">
            <div className="child" onClick={toggleDropdown}>
              <ManageHistoryOutlinedIcon />
              <span>Dating Meta Data</span>
              <span>{isDropdownOpen ? "⬇️" : "⬅️"}</span>
            </div>

            {isDropdownOpen && (
              <div className="menu-item-sub">
                <Link to="/user-profile-option">
                  <div className={`menu-item ${isActive("/user-profile-option") ? "active" : ""}`}>
                    <div className="dropdown-item">Profile Options</div>
                  </div>
                </Link>
                <Link to="/prompt-question">
                  <div className={`menu-item ${isActive("/prompt-question") ? "active" : ""}`}>
                    <div className="dropdown-item">Prompt Questions</div>
                  </div>
                </Link>
                <Link to="/user-passion">
                  <div className={`menu-item ${isActive("/user-passion") ? "active" : ""}`}>
                    <div className="dropdown-item">Passion Options</div>
                  </div>
                </Link>
                <Link to="/user-desire">
                  <div className={`menu-item ${isActive("/user-desire") ? "active" : ""}`}>
                    <div className="dropdown-item">User Desire</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Notice Manager */}
          <div className="menu-item-child">
            <div className="child" onClick={noticeDropdown}>
              <ManageHistoryOutlinedIcon />
              <span>Notice Manager</span>
              <span>{isNotice ? "⬇️" : "⬅️"}</span>
            </div>

            {isNotice && (
              <div className="menu-item-sub">
                <Link to="/consultant-notice">
                  <div className={`menu-item ${isActive("/consultant-notice") ? "active" : ""}`}>
                    <div className="dropdown-item">Notice List</div>
                  </div>
                </Link>
                <Link to="/assign-notice">
                  <div className={`menu-item ${isActive("/assign-notice") ? "active" : ""}`}>
                    <div className="dropdown-item">Manage Notice</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Notification Manager */}
          <div className="menu-item-child">
            <div className="child" onClick={notificationDropdown}>
              <ManageHistoryOutlinedIcon />
              <span>Notification Manager</span>
              <span>{isNotification ? "⬇️" : "⬅️"}</span>
            </div>

            {isNotification && (
              <div className="menu-item-sub">
                <Link to="/user-notification">
                  <div className={`menu-item ${isActive("/user-notification") ? "active" : ""}`}>
                    <div className="dropdown-item">User Notification</div>
                  </div>
                </Link>
                <Link to="/notification-template">
                  <div className={`menu-item ${isActive("/notification-template") ? "active" : ""}`}>
                    <div className="dropdown-item">Notification Template</div>
                  </div>
                </Link>
                <Link to="/send-notification">
                  <div className={`menu-item ${isActive("/send-notification") ? "active" : ""}`}>
                    <div className="dropdown-item">Send Notification</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Quick Date */}
          <div className="menu-item-child">
            <div className="child" onClick={quickDateDropdown}>
              <img src="/adminPannel_icons/QD trips.png" width="24" height="24" />
              <span>Quick Date</span>
              <span>{isQuickDate ? "⬇️" : "⬅️"}</span>
            </div>

            {isQuickDate && (
              <div className="menu-item-sub">
                <Link to="/qd-trips">
                  <div className={`menu-item ${isActive("/qd-trips") ? "active" : ""}`}>
                    <img src="/adminPannel_icons/QD trips.png" width="24" height="24" />
                    <div className="dropdown-item">QD Trips</div>
                  </div>
                </Link>
                <Link to="/qd-location">
                  <div className={`menu-item ${isActive("/qd-location") ? "active" : ""}`}>
                    <img src="/adminPannel_icons/QD_location.png" width="24" height="24" />
                    <div className="dropdown-item">QD Location</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Support */}
          <div className="menu-item-child">
            <div className="child" onClick={supportDropdown}>
              <img src="/adminPannel_icons/support.png" width="24" height="24" />
              <span>Support</span>
              <span>{isShowSupport ? "⬇️" : "⬅️"}</span>
            </div>

            {isShowSupport && (
              <div className="menu-item-sub">
                <Link to="/user-support">
                  <div className={`menu-item ${isActive("/user-support") ? "active" : ""}`}>
                    <div className="dropdown-item">User Support</div>
                  </div>
                </Link>
                <Link to="/consultant-support">
                  <div className={`menu-item ${isActive("/consultant-support") ? "active" : ""}`}>
                    <div className="dropdown-item">Consultant Support</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <div className="menu-group">
            <Link to="/blog-count">
              <div className={`menu-item ${isActive("/blog-count") ? "active" : ""}`}>
                <img src="/adminPannel_icons/support.png" width="24" height="24" />
                <span>Blog View Count</span>
              </div>
            </Link>

            <Link to="/action-log">
              <div className={`menu-item ${isActive("/action-log") ? "active" : ""}`}>
                <ManageHistoryOutlinedIcon />
                <span>Action log</span>
              </div>
            </Link>

            <Link to="/chat-message">
              <div className={`menu-item ${isActive("/chat-message") ? "active" : ""}`}>
                <ManageHistoryOutlinedIcon />
                <span>Chat Message</span>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <aside className="sidebar">
          <div className="menu-btn" onClick={toggleMenu}>
            <MenuOutlinedIcon />
          </div>

          <div className="sidebar-items">
            {permissions?.["Dashboard"]?.includes("view_dashboard") && (
              <Link to="/dashboard">
                <div className={`item ${isActive("/dashboard") ? "active" : ""}`}>
                  <span className="icon"><GridViewOutlinedIcon /></span>
                  <span>Dashboard</span>
                </div>
              </Link>
            )}
            {permissions?.["user"] && (
              <Link to="/user">
                <div className={`item ${isActive("/user") ? "active" : ""}`}>
                  <GroupOutlinedIcon />
                  <span>Users</span>
                </div>
              </Link>
            )}
            <Link to="/auth-consultant">
              <div className={`item ${isActive("/auth-consultant") ? "active" : ""}`}>
                <img src="/adminPannel_icons/Coach.png" width="24" height="24" />
                <span>Consultant</span>
              </div>
            </Link>
            {permissions?.["astrologer"]?.includes("view_astrologer_list") && (
              <Link to="/astrologer">
                <div className={`item ${isActive("/astrologer") ? "active" : ""}`}>
                  <img src="/adminPannel_icons/astrologers.png" width="24" height="24" />
                  <span>Astrologer</span>
                </div>
              </Link>
            )}
            <Link to="/coaches">
              <div className={`item ${isActive("/coaches") ? "active" : ""}`}>
                <img src="/adminPannel_icons/Coach.png" width="24" height="24" />
                <span>Coaches</span>
              </div>
            </Link>

            <Link to="/listeners">
              <div className={`item ${isActive("/listeners") ? "active" : ""}`}>
                <HeadphonesOutlinedIcon />
                <span>Listeners</span>
              </div>
            </Link>

            {permissions?.["meta_data_section"] && (
              <Link to="/meta-data">
                <div className={`item ${isActive("/meta-data") ? "active" : ""}`}>
                  <CategoryOutlinedIcon />
                  <span>Meta Data</span>
                </div>
              </Link>
            )}

            <Link to="/order">
              <div className={`item ${isActive("/order") ? "active" : ""}`}>
                <CardGiftcardOutlinedIcon />
                <span>Orders</span>
              </div>
            </Link>

            <Link to="/gift-history">
              <div className={`item ${isActive("/gift-history") ? "active" : ""}`}>
                <CardGiftcardOutlinedIcon />
                <span>Gifts</span>
              </div>
            </Link>

            <Link to="/refund-list">
              <div className={`item ${isActive("/refund-list") ? "active" : ""}`}>
                <CardGiftcardOutlinedIcon />
                <span>Refund List</span>
              </div>
            </Link>

            {permissions?.["user_recharge_list"]?.includes("view_recharge_list") && (
              <Link to="/user-recharge">
                <div className={`item ${isActive("/user-recharge") ? "active" : ""}`}>
                  <CardGiftcardOutlinedIcon />
                  <span>Recharge List</span>
                </div>
              </Link>
            )}
            {permissions?.["razorpay_list"]?.includes("view_razorpay_list") && (
              <Link to="/razorpay-recharge">
                <div className={`item ${isActive("/razorpay-recharge") ? "active" : ""}`}>
                  <CardGiftcardOutlinedIcon />
                  <span>Razorpay List</span>
                </div>
              </Link>
            )}

            <Link to="/onboarding-assign">
              <div className={`item ${isActive("/onboarding-assign") ? "active" : ""}`}>
                <KeyRound />
                <span>Onboarding</span>
              </div>
            </Link>
            <Link to="/marketing-assignee">
              <div className={`item ${isActive("/marketing-assignee") ? "active" : ""}`}>
                <KeyRound />
                <span>Assignee List</span>
              </div>
            </Link>

            <Link to="/session">
              <div className={`item ${isActive("/session") ? "active" : ""}`}>
                <CardGiftcardOutlinedIcon />
                <span>Session</span>
              </div>
            </Link>

            <Link to="/cms-data">
              <div className={`item ${isActive("/cms-data") ? "active" : ""}`}>
                <CategoryOutlinedIcon />
                <span>Cms Data</span>
              </div>
            </Link>

            <Link to="/message-template">
              <div className={`item ${isActive("/message-template") ? "active" : ""}`}>
                <ManageHistoryOutlinedIcon />
                <span>MessageTemplate</span>
              </div>
            </Link>
          </div>
        </aside>
      )}
    </div>
  );
};

export default Sidebar;
