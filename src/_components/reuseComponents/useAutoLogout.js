import { useEffect, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../_store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useAutoLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inactivityTimer = useRef(null);

  // Configuration - 30 minutes of inactivity
  const INACTIVITY_TIMEOUT = 120 * 60 * 1000; // 30 minutes

  // Handle logout
  const handleLogout = useCallback(() => {
    // Clear timer
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }

    // Show message
    toast.error("You have been logged out due to inactivity");

    // Clear storage
    sessionStorage.clear();

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
      handleLogout();
    }, INACTIVITY_TIMEOUT);
  }, [handleLogout]);

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
        // User is back, reset the timer
        resetInactivityTimer();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [resetInactivityTimer]);
};

export default useAutoLogout;
