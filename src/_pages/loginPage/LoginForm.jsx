import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./loginFrom.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../_store/slices/authSlice";
import { useCreateAdminLoginMutation } from "../../_store/api";
import { getDefaultRoute } from "./permissions";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, Shield } from "lucide-react";
const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [prod, setProd] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createLogin, { isLoading }] = useCreateAdminLoginMutation();
  const { isAuthenticated, permissions: storedPermissions } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) navigate(getDefaultRoute(storedPermissions), { replace: true });
  }, [isAuthenticated, navigate, storedPermissions]);

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password");
      return;
    }
    try {
      const response = await createLogin({ body: formData, prod }).unwrap();
      if (response?.status) {
        const user = response?.data;
        const permissionsByGroup = {};
        if (user?.results?.length > 0) {
          user.results.forEach((result) => {
            const groupName = result?.PermissionGroup?.name;
            const permissions = result?.PermissionGroup?.permissions?.map((p) => p?.name || []);
            if (groupName) permissionsByGroup[groupName] = permissions;
          });
        }
        dispatch(login({
          user: { id: user.id, name: user.name, email: user.email },
          role: user.role,
          token: user.auth_token,
          permissions: permissionsByGroup,
          prod,
        }));
        navigate(getDefaultRoute(permissionsByGroup));
      } else {
        toast.error(response?.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.data.message, "Something went wrong during login");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") handleLogin();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [formData]);

  return (
    <div className="login-body">
      <div className="login-card">

        {/* Brand */}
        <div className="login-brand">
          <div className="login-brand-icon">
            <Shield size={28} strokeWidth={1.8} />
          </div>
          <div>
            <h1 className="login-brand-name">Flute Admin</h1>
            <p className="login-brand-sub">Management Console</p>
          </div>
        </div>

        {/* Heading */}
        <div className="login-heading">
          <h2 className="login-title">Welcome back</h2>
          <p className="login-subtitle">Sign in to your admin account</p>
        </div>

        {/* Env Toggle */}
        <div className="login-env-toggle">
          <button
            type="button"
            className={`login-env-btn ${prod === true ? "active" : ""}`}
            onClick={() => setProd(true)}
          >
            Production
          </button>
          <button
            type="button"
            className={`login-env-btn ${prod === false ? "active" : ""}`}
            onClick={() => setProd(false)}
          >
            Testing
          </button>
        </div>

        {/* Form */}
        <div className="login-form">

          <div className="login-field">
            <label className="login-label" htmlFor="email">Email</label>
            <div className="login-input-wrap">
              <Mail size={17} className="login-input-icon" />
              <input
                className="login-input"
                type="email"
                id="email"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="login-field">
            <div className="login-label-row">
              <label className="login-label" htmlFor="password">Password</label>
              <span className="login-forgot">Forgot password?</span>
            </div>
            <div className="login-input-wrap">
              <Lock size={17} className="login-input-icon" />
              <input
                className="login-input"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                autoComplete="off"
              />
              <button
                type="button"
                className="login-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <button
            className="login-submit-btn"
            onClick={handleLogin}
            disabled={isLoading || !formData.email || !formData.password}
          >
            {isLoading ? (
              <span className="login-spinner" />
            ) : null}
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </div>

        <p className="login-footer">
          Flute Admin Panel &mdash; Authorized access only
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
