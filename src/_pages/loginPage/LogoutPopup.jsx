import { useEffect, useRef } from "react";
import "../../cssfolder/LogoutPopup.css";
import { logout } from "../../_store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, Mail, Shield } from "lucide-react";

const LogoutPopup = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleLogoutClick = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  return (
    <section className="logout-popup" onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}>
      <div className="logout-popup-card" ref={popupRef}>
        {/* User Info */}
        <div className="logout-user-info">
          <div className="logout-avatar">
            {user?.name?.charAt(0)?.toUpperCase() || "A"}
          </div>
          <div className="logout-details">
            <span className="logout-name">{user?.name || "Admin User"}</span>
            {user?.email && (
              <span className="logout-email">
                <Mail size={12} />
                {user.email}
              </span>
            )}
            {role && (
              <span className="logout-role">
                <Shield size={12} />
                {role}
              </span>
            )}
          </div>
        </div>

        <div className="logout-divider" />

        {/* Logout Button */}
        <button className="logout-btn" onClick={handleLogoutClick}>
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </section>
  );
};

export default LogoutPopup;
