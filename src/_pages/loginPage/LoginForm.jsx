import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./loginFrom.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../_store/slices/authSlice";
import { useCreateAdminLoginMutation } from "../../_store/api";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [prod, setProd] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createLogin, { isLoading }] = useCreateAdminLoginMutation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      const response = await createLogin({ body: formData, prod }).unwrap();

      console.log("login response....", response);

      if (response?.status) {
        const user = response?.data;

        const permissionsByGroup = {};

        if (user?.results && user?.results?.length > 0) {
          user.results?.forEach((result) => {
            const groupName = result?.PermissionGroup?.name;
            const permissions = result?.PermissionGroup?.permissions?.map(
              (p) => p?.name || []
            );
            if (groupName) {
              permissionsByGroup[groupName] = permissions;
            }
          });
        }

        dispatch(
          login({
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
            role: user.role,
            token: user.auth_token,
            permissions: permissionsByGroup,
            prod: prod, // for  radio button at the time of login
          })
        );

        // toast.success("Login successful");
        navigate("/dashboard");
      } else {
        toast.error(response?.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong during login");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [formData]);

  return (
    <div className="login-body">
      <div className="login-container">
        <div className="login-header">
          <h4>Login</h4>
          <p>Enter your email below to login to your account</p>
        </div>

        {/* Radio Button Group */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "20px",
          }}
        >
          <div>
            <label htmlFor="production">Production</label>
            <input
              type="radio"
              id="production"
              name="env"
              value="production"
              checked={prod === true}
              onChange={() => setProd(true)}
              style={{ marginLeft: "10px" }}
            />
          </div>
          <div>
            <label htmlFor="testing">Testing</label>
            <input
              type="radio"
              id="testing"
              name="env"
              value="testing"
              checked={prod === false}
              onChange={() => setProd(false)}
              style={{ marginLeft: "10px" }}
            />
          </div>
        </div>

        <div className="login-form">
          <div>
            <label htmlFor="email">Enter Email</label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              autoComplete="off"
            />
          </div>

          <label className="forgotPassword" htmlFor="forgotPassword">
            Forgot Password
          </label>

          <button className="button" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>

        <div className="signup-text">
          <p>
            Don't have an account? <span>Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
