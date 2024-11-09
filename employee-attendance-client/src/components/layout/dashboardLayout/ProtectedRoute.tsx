import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, TUserInfo } from "@/redux/slice/authSlice";
import { jwtDecode } from "jwt-decode";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  const user = jwtDecode(token) as TUserInfo;
  if (!role || role !== user.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
