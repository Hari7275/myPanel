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
import { KeyRound, ChevronDown } from "lucide-react";
import "aos/dist/aos.css";
import { Link, useLocation } from "react-router-dom";

// ─── Helper: icon from path string or React element ───
const Icon = ({ src }) => {
  if (typeof src === "string") {
    return <img src={src} width="24" height="24" />;
  }
  return src;
};

// ─── Reusable: single menu link (expanded sidebar) ───
const MenuLink = ({ to, label, icon, isActive }) => (
  <Link to={to}>
    <div className={`menu-item ${isActive(to) ? "active" : ""}`}>
      {icon && <Icon src={icon} />}
      <span>{label}</span>
    </div>
  </Link>
);

// ─── Reusable: dropdown sub-link (expanded sidebar) ───
const DropdownLink = ({ to, label, isActive }) => (
  <Link to={to}>
    <div className={`menu-item ${isActive(to) ? "active" : ""}`}>
      <div className="dropdown-item">{label}</div>
    </div>
  </Link>
);

// ─── Reusable: collapsible dropdown section (expanded sidebar) ───
const DropdownSection = ({ icon, label, isOpen, onToggle, children, isActive }) => (
  <div className="menu-item-child">
    <div className="child" onClick={onToggle}>
      <Icon src={icon} />
      <span>{label}</span>
      <ChevronDown size={18} className={`dropdown-arrow ${isOpen ? "open" : ""}`} />
    </div>
    <div className={`dropdown-collapse ${isOpen ? "dropdown-open" : ""}`}>
      <div className="dropdown-collapse-inner">
        <div className="menu-item-sub">
          {children.map(({ to, label: linkLabel }) => (
            <DropdownLink key={to} to={to} label={linkLabel} isActive={isActive} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─── Reusable: collapsed sidebar item ───
const SidebarItem = ({ to, icon, label, isActive }) => (
  <Link to={to}>
    <div className={`item ${isActive(to) ? "active" : ""}`}>
      <Icon src={icon} />
      <span>{label}</span>
    </div>
  </Link>
);

// ─── Main Component ───
const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const menuRef = useRef(null);
  const permissions = usePermissions();
  const location = useLocation();

  const isActive = (path) => {
    const normalized = path.startsWith("/") ? path : `/${path}`;
    return (
      location.pathname === normalized ||
      location.pathname.startsWith(normalized + "/")
    );
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const toggleDropdown = (key) =>
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));

  // ─── Expanded menu: dropdown sections config ───
  const dropdownSections = [
    {
      key: "admin",
      label: "Admin Section",
      icon: <SupervisorAccountIcon />,
      visible: !!permissions?.["admin"],
      links: [
        { to: "/admin-roles", label: "Roles", perm: permissions?.["admin"]?.includes("view_admin_role") },
        { to: "/admin-permission", label: "Permission Group", perm: permissions?.["admin"]?.includes("view_admin_permission_group_section") },
        { to: "/admin-user", label: "Admin User", perm: permissions?.["admin"]?.includes("view_admin_users_section") },
      ],
    },
    {
      key: "onboarding",
      label: "Onboarding",
      icon: <SupervisorAccountIcon />,
      links: [
        { to: "/onboarding-assign", label: "Onboarding Assign" },
        { to: "/action-log", label: "Action log" },
      ],
    },
    {
      key: "marketingLeads",
      label: "Marketing Leads",
      icon: <SupervisorAccountIcon />,
      links: [
        { to: "/leads-list", label: "Leads List" },
        { to: "/marketing-assignee", label: "Assignee List" },
      ],
    },
    {
      key: "payment",
      label: "Payments",
      icon: "/adminPannel_icons/payment.png",
      links: [
        { to: "/dating-products", label: "Dating Products" },
        { to: "/qd-products", label: "Qd Products" },
        { to: "/feature-list", label: "Features" },
        { to: "/payment-transactions", label: "Payment Transactions" },
        { to: "/recharge-plans", label: "Recharge Plans" },
        { to: "/subscriptions-plans", label: "Subscription Plans" },
        { to: "/coupon", label: "Coupon" },
      ],
    },
    {
      key: "datingMeta",
      label: "Dating Meta Data",
      icon: <ManageHistoryOutlinedIcon />,
      links: [
        { to: "/user-profile-option", label: "Profile Options" },
        { to: "/prompt-question", label: "Prompt Questions" },
        { to: "/user-passion", label: "Passion Options" },
        { to: "/user-desire", label: "User Desire" },
      ],
    },
    {
      key: "notice",
      label: "Notice Manager",
      icon: <ManageHistoryOutlinedIcon />,
      links: [
        { to: "/consultant-notice", label: "Notice List" },
        { to: "/assign-notice", label: "Manage Notice" },
      ],
    },
    {
      key: "notification",
      label: "Notification Manager",
      icon: <ManageHistoryOutlinedIcon />,
      links: [
        { to: "/user-notification", label: "User Notification" },
        { to: "/notification-template", label: "Notification Template" },
        { to: "/send-notification", label: "Send Notification" },
      ],
    },
    {
      key: "quickDate",
      label: "Quick Date",
      icon: "/adminPannel_icons/QD trips.png",
      links: [
        { to: "/qd-trips", label: "QD Trips" },
        { to: "/qd-location", label: "QD Location" },
      ],
    },
    {
      key: "support",
      label: "Support",
      icon: "/adminPannel_icons/support.png",
      links: [
        { to: "/user-support", label: "User Support" },
        { to: "/consultant-support", label: "Consultant Support" },
      ],
    },
  ];

  // ─── Collapsed sidebar items config ───
  const sidebarItems = [
    { to: "/dashboard", label: "Dashboard", icon: <GridViewOutlinedIcon />, visible: permissions?.["Dashboard"]?.includes("view_dashboard") },
    { to: "/user", label: "Users", icon: <GroupOutlinedIcon />, visible: !!permissions?.["user"] },
    { to: "/auth-consultant", label: "Consultant", icon: "/adminPannel_icons/Coach.png" },
    { to: "/astrologer", label: "Astrologer", icon: "/adminPannel_icons/astrologers.png", visible: permissions?.["astrologer"]?.includes("view_astrologer_list") },
    { to: "/coaches", label: "Coaches", icon: "/adminPannel_icons/Coach.png" },
    { to: "/listeners", label: "Listeners", icon: <HeadphonesOutlinedIcon /> },
    { to: "/meta-data", label: "Meta Data", icon: <CategoryOutlinedIcon />, visible: !!permissions?.["meta_data_section"] },
    { to: "/order", label: "Orders", icon: <CardGiftcardOutlinedIcon /> },
    { to: "/gift-history", label: "Gifts", icon: <CardGiftcardOutlinedIcon /> },
    { to: "/refund-list", label: "Refund List", icon: <CardGiftcardOutlinedIcon /> },
    { to: "/user-recharge", label: "Recharge List", icon: <CardGiftcardOutlinedIcon />, visible: permissions?.["user_recharge_list"]?.includes("view_recharge_list") },
    { to: "/razorpay-recharge", label: "Razorpay List", icon: <CardGiftcardOutlinedIcon />, visible: permissions?.["razorpay_list"]?.includes("view_razorpay_list") },
    { to: "/onboarding-assign", label: "Onboarding", icon: <KeyRound /> },
    { to: "/marketing-assignee", label: "Assignee List", icon: <KeyRound /> },
    { to: "/session", label: "Session", icon: <CardGiftcardOutlinedIcon /> },
    { to: "/cms-data", label: "Cms Data", icon: <CategoryOutlinedIcon /> },
    { to: "/message-template", label: "MessageTemplate", icon: <ManageHistoryOutlinedIcon /> },
  ];

  // ─── Expanded menu: flat links in the middle section ───
  const expandedTopLinks = [
    { to: "/dashboard", icon: <GridViewOutlinedIcon />, label: "Dashboard", visible: permissions?.["Dashboard"]?.includes("view_dashboard") },
    { to: "/user", icon: <GroupOutlinedIcon />, label: "Users", visible: !!permissions?.["user"] },
    { to: "/untracked-user", icon: <GroupOutlinedIcon />, label: "Guest Device Info" },
    { to: "/user-device-info", icon: <GroupOutlinedIcon />, label: "User Device Info" },
    { to: "/consultant-device-info", icon: <DeviceUnknownIcon />, label: "Consultant device info" },
  ];

  const expandedConsultantLinks = [
    { to: "/auth-consultant", icon: "/adminPannel_icons/Coach.png", label: "Consultant" },
    { to: "/coaches", icon: "/adminPannel_icons/Coach.png", label: "Coaches", visible: !!permissions?.["coach"] },
    { to: "/listeners", icon: <HeadphonesOutlinedIcon />, label: "Listeners", visible: !!permissions?.["listener"] },
    { to: "/astrologer", icon: "/adminPannel_icons/astrologers.png", label: "Astrologer", visible: !!permissions?.["astrologer"] },
    { to: "/profile-review", icon: "/adminPannel_icons/Coach.png", label: "Review Request" },
  ];

  const expandedRechargeLinks = [
    { to: "/order", icon: <CardGiftcardOutlinedIcon />, label: "Orders" },
    { to: "/user-recharge", icon: <CardGiftcardOutlinedIcon />, label: "User Recharge List", visible: permissions?.["user_recharge_list"]?.includes("view_recharge_list") },
    { to: "/user-recharge-summary", icon: <CardGiftcardOutlinedIcon />, label: "Recharge Summary", visible: permissions?.["user_recharge_list"]?.includes("view_recharge_list") },
    { to: "/razorpay-recharge", icon: <CardGiftcardOutlinedIcon />, label: "Razorpay List", visible: permissions?.["razorpay_list"]?.includes("view_razorpay_list") },
    { to: "/user-subscription", icon: <CardGiftcardOutlinedIcon />, label: "User Subscription List" },
    { to: "/payable-History", icon: <CardGiftcardOutlinedIcon />, label: "Payable Log", visible: permissions?.["user_recharge_list"]?.includes("view_recharge_list") },
    { to: "/payout-History", icon: <CardGiftcardOutlinedIcon />, label: "Payout History", visible: permissions?.["user_recharge_list"]?.includes("view_recharge_list") },
    { to: "/gift", icon: <CardGiftcardOutlinedIcon />, label: "Gifts" },
    { to: "/gift-history", icon: <CardGiftcardOutlinedIcon />, label: "Gift History" },
    { to: "/refund-list", icon: <CardGiftcardOutlinedIcon />, label: "Refund List" },
    { to: "/session", icon: <CardGiftcardOutlinedIcon />, label: "Session" },
  ];

  const expandedBottomLinks = [
    { to: "/meta-data", icon: <CategoryOutlinedIcon />, label: "Meta Data", visible: !!permissions?.["meta_data_section"] },
    { to: "/cms-data", icon: <CategoryOutlinedIcon />, label: "Cms Data" },
    { to: "/message-template", icon: <ManageHistoryOutlinedIcon />, label: "MessageTemplate" },
    { to: "/blog-count", icon: "/adminPannel_icons/support.png", label: "Blog View Count" },
    { to: "/action-log", icon: <ManageHistoryOutlinedIcon />, label: "Action log" },
    { to: "/chat-message", icon: <ManageHistoryOutlinedIcon />, label: "Chat Message" },
  ];

  // ─── Helper: render a list of flat MenuLinks, filtering by visibility ───
  const renderLinks = (links) =>
    links
      .filter(({ visible }) => visible === undefined || visible)
      .map(({ to, icon, label }) => (
        <MenuLink key={to} to={to} icon={icon} label={label} isActive={isActive} />
      ));

  return (
    <div className={`sideContainer ${isMenuOpen ? "menu-expanded" : "menu-collapsed"}`}>
      {/* Expanded menu — always in DOM, slides in/out via CSS */}
      <div id="menu" className={isMenuOpen ? "visible" : ""} ref={menuRef}>
        <div className="menu-header">
          <div className="menu-btn" onClick={toggleMenu}>
            <MenuOutlinedIcon />
          </div>
        </div>

        <div className="menu-grou">
          {/* Dropdown sections: Admin, Onboarding, Marketing Leads */}
          {dropdownSections.slice(0, 3).map((section) => {
            if (section.visible === false) return null;
            const visibleLinks = section.links.filter(
              ({ perm }) => perm === undefined || perm
            );
            if (visibleLinks.length === 0) return null;
            return (
              <DropdownSection
                key={section.key}
                icon={section.icon}
                label={section.label}
                isOpen={!!openDropdowns[section.key]}
                onToggle={() => toggleDropdown(section.key)}
                isActive={isActive}
                children={visibleLinks}
              />
            );
          })}

          {/* Dashboard, Users, Device Info */}
          <div>{renderLinks(expandedTopLinks)}</div>

          {/* Coaches, Listeners, Astrologer */}
          <div>{renderLinks(expandedConsultantLinks)}</div>
        </div>

        {/* Recharge / Subscription / Gifts */}
        <div className="menu-group">{renderLinks(expandedRechargeLinks)}</div>

        {/* Remaining dropdown sections: Payments, Dating Meta, Notice, Notification, Quick Date, Support */}
        {dropdownSections.slice(3).map((section) => {
          if (section.visible === false) return null;
          const visibleLinks = section.links.filter(
            ({ perm }) => perm === undefined || perm
          );
          if (visibleLinks.length === 0) return null;
          return (
            <DropdownSection
              key={section.key}
              icon={section.icon}
              label={section.label}
              isOpen={!!openDropdowns[section.key]}
              onToggle={() => toggleDropdown(section.key)}
              isActive={isActive}
              children={visibleLinks}
            />
          );
        })}

        {/* Bottom links */}
        <div className="menu-group">{renderLinks(expandedBottomLinks)}</div>
      </div>

      {/* Collapsed sidebar — hidden when menu is open */}
      <aside className={`sidebar ${isMenuOpen ? "sidebar-hidden" : ""}`}>
        <div className="menu-btn" onClick={toggleMenu}>
          <MenuOutlinedIcon />
        </div>

        <div className="sidebar-items">
          {sidebarItems
            .filter(({ visible }) => visible === undefined || visible)
            .map(({ to, icon, label }) => (
              <SidebarItem key={to} to={to} icon={icon} label={label} isActive={isActive} />
            ))}
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
