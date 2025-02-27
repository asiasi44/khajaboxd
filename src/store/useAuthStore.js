import { create } from "zustand";

const useAuthStore = create((set) => ({
  loggedIn: false,
  username: "",
  token: "",
  userId: "",

  initAuth: () => {
    if (typeof window !== "undefined") {
      set({
        loggedIn:
          typeof window !== "undefined"
            ? window.localStorage.getItem("loggedIn") == "true" || false
            : false,
        username:
          typeof window !== "undefined"
            ? window.localStorage.getItem("username") || ""
            : "",
        token:
          typeof window !== "undefined"
            ? window.localStorage.getItem("token") || ""
            : "",
        userId:
          typeof window !== "undefined"
            ? window.localStorage.getItem("userId") || ""
            : "",
      });
    }
  },
  login: (username, token, userId) => {
    localStorage.setItem("loggedIn", true);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    set({ loggedIn: true, username, userId, token });
  },

  logout: () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    set({ loggedIn: false, username: "", userId: "", token: "" });
  },
}));

export default useAuthStore;
