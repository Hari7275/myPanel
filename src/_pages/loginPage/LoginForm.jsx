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
      const response = await createLogin({ body: formData }).unwrap();

      if (response?.status) {
        const user = response?.data;

        const permissionsByGroup = {};
        user.results?.forEach((result) => {
          const groupName = result?.PermissionGroup?.name;
          const permissions = result?.PermissionGroup?.permissions?.map(
            (p) => p.name || []
          );
          if (groupName) {
            permissionsByGroup[groupName] = permissions;
          }
        });

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
            prod: prod, // You can set prod logic if needed
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

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./loginFrom.css";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../_store/slices/authSlice";
// import { useCreateAdminLoginMutation } from "../../_store/api";
// import toast from "react-hot-toast";

// import { MOCK_USERS } from "./users";

// const LoginForm = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const [createLogin, { isLoading }] = useCreateAdminLoginMutation();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   useEffect(() => {
//     // Redirect to user page if already logged in
//     if (isAuthenticated) {
//       navigate("/user", { replace: true });
//     }
//   }, [isAuthenticated, navigate]);

//   const handleLogin = () => {
//     const user = MOCK_USERS.find(
//       (u) => u.phoneNumber == phoneNumber && u.password == password
//     );

//     // console.log("user", user);
//     if (user) {
//       console.log("--- LOGIN DEBUG ---");
//       console.log("Found user:", user);
//       console.log("Dispatching login with:", {
//         user: {
//           id: user.id,
//           name: user.name,
//           phoneNumber: user.phoneNumber,
//         },
//         role: user.role,
//         permissions: user.permissions,
//         prod: user.phoneNumber == "1234567899",
//       });

//       dispatch(
//         login({
//           user: {
//             id: user.id,
//             name: user.name,
//             phoneNumber: user.phoneNumber,
//           },
//           role: user.role,
//           permissions: user.permissions,
//           prod: user.phoneNumber == "1234567899",
//         })
//       );
//       navigate("/dashboard");
//     } else {
//       toast.error("Invalid phone number or password");
//     }
//   };
//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       handleLogin();
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [password]);

//   return (
//     <div className="login-body">
//       <div className="login-container">
//         <div className="login-header">
//           <h4>Login</h4>
//           <p>Enter your phone number below to login to your account</p>
//         </div>

//         <div className="login-form">
//           <div>
//             <label htmlFor="phonenumber">Phone Number / Email</label>
//             <input
//               type="text"
//               placeholder="Phone number"
//               id="phonenumber"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               autoComplete="off"
//             />
//           </div>

//           <div>
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               placeholder="Password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               autoComplete="off"
//             />
//           </div>

//           <label className="forgotPassword" htmlFor="forgotPassword">
//             Forgot Password
//           </label>

//           <button className="button" onClick={handleLogin}>
//             Login
//           </button>
//         </div>

//         <div className="signup-text">
//           <p>
//             Don't have an account? <span>Sign up</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
