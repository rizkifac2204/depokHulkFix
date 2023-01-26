import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthContext = createContext({
  user: null,
  logout: () => {},
});

const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const logout = async () => {
    setUser(null);
    axios
      .get("/api/auth/logout")
      .then((res) => {
        console.log("Logged Out");
      })
      .catch((err) => {
        console.log("Error Something");
      })
      .finally(() => {
        window.open("/login", "_self");
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`/api/auth/isLogin`, { signal: controller.signal })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        // no action
      });

    return () => {
      controller.abort();
    };
  }, [router]);

  const context = { user, logout };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export { useAuthContext };
