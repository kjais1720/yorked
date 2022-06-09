import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "contexts";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { USER_TOKEN } from "utilities";
export function RequiresAuth() {
  const navigate = useNavigate();
  const {
    userState: { isLoggedIn },
  } = useAuth();
  const location = useLocation();
  useEffect(() => {
    if (!localStorage.getItem(USER_TOKEN)) {
      navigate("/auth/login",{state:{from:location},replace:true})
      toast.error("You need to login to access this page!");
    }
  },[isLoggedIn]);
  return localStorage.getItem(USER_TOKEN) ? <Outlet /> : <Navigate to="/auth/login" state={{from:location}} replace />;
}
