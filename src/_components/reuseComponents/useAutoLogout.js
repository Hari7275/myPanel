import { useEffect, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../_store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useAutoLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inactivityTimer = useRef(null);
  const maxSessionTimer = useRef(null);

  // Configuration
  const INACTIVITY_TIMEOUT = 120 * 60 * 1000; // 120 minutes
  const MAX_SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
  // Handle logout
  const handleLogout = useCallback((reason = "inactivity") => {
    // Clear timers
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    if (maxSessionTimer.current) {
      clearTimeout(maxSessionTimer.current);
    }

    // Show appropriate message
    if (reason === "max_session") {
      toast.error("Your session has expired. Please login again.");
    } else {
      toast.error("You have been logged out due to inactivity");
    }

    // Clear storage
    sessionStorage.clear();
    localStorage.removeItem("sessionStartTime");

    // Dispatch logout
    dispatch(logout());

    // Redirect to login
    navigate("/", { replace: true });
  }, [dispatch, navigate]);

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    // Clear existing timer
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }

    // Set new timer
    inactivityTimer.current = setTimeout(() => {
      handleLogout("inactivity");
    }, INACTIVITY_TIMEOUT);
  }, [handleLogout, INACTIVITY_TIMEOUT]);

  // Initialize session start time and max session timer
  useEffect(() => {
    // Get or set session start time
    let sessionStartTime = localStorage.getItem("sessionStartTime");
    
    if (!sessionStartTime) {
      // First time - set the start time
      sessionStartTime = Date.now().toString();
      localStorage.setItem("sessionStartTime", sessionStartTime);
    }

    const startTime = parseInt(sessionStartTime, 10);
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;

    // Check if 24 hours already passed
    if (elapsedTime >= MAX_SESSION_DURATION) {
      handleLogout("max_session");
      return;
    }

    // Set timer for remaining time
    const remainingTime = MAX_SESSION_DURATION - elapsedTime;
    maxSessionTimer.current = setTimeout(() => {
      handleLogout("max_session");
    }, remainingTime);

    // Cleanup
    return () => {
      if (maxSessionTimer.current) {
        clearTimeout(maxSessionTimer.current);
      }
    };
  }, [handleLogout, MAX_SESSION_DURATION]);

  // Handle inactivity tracking
  useEffect(() => {
    // Activity events to track
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    // Initialize timer
    resetInactivityTimer();

    // Activity handler
    const handleUserActivity = () => {
      resetInactivityTimer();
    };

    // Add event listeners
    events.forEach((event) => {
      document.addEventListener(event, handleUserActivity);
    });

    // Cleanup
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleUserActivity);
      });
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [resetInactivityTimer]);

  // Handle tab visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Check if 24 hours have passed while tab was hidden
        const sessionStartTime = localStorage.getItem("sessionStartTime");
        if (sessionStartTime) {
          const startTime = parseInt(sessionStartTime, 10);
          const currentTime = Date.now();
          const elapsedTime = currentTime - startTime;

          if (elapsedTime >= MAX_SESSION_DURATION) {
            handleLogout("max_session");
            return;
          }
        }

        // User is back, reset the inactivity timer
        resetInactivityTimer();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [resetInactivityTimer, handleLogout, MAX_SESSION_DURATION]);
};

export default useAutoLogout;