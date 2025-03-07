import "./layout.scss";
import Navbar from "./../../components/navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

function Layout() {
  return (
    <div>
      <div className="layout">
        <div className="navar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function RequireAuth() {
  const { currentUser } = useContext(AuthContext);

  // useEffect(() => {
  //   if (!currentUser) {
  //     <Navigate to="/login" />;
  //   }
  // }, [currentUser]);

  return !currentUser ? (
    <Navigate to="/login" />
  ) : (
    <div>
      <div className="layout">
        <div className="navar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export { Layout, RequireAuth };
