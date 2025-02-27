"use client";
import { useEffect } from "react";
import axios from "axios";
import NotLoggedIn from "@/app/notLoggedIn";
import useAuthStore from "@/store/useAuthStore";

const CheckToken = (props) => {
  const { logout, loggedIn } = useAuthStore();

  const checkTokenValidation = async () => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get("/api/login", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.data.success) {
      logout();
    }
  };

  useEffect(() => {
    checkTokenValidation();
  }, []);

  return <>{loggedIn ? props.children : <NotLoggedIn />}</>;
};

export default CheckToken;
