import { Navigate } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";

const App = () => {
  const user = useAppSelector((state) => state.auth.user);
  const role = user?.role;
  if (role === "Admin") {
    return <Navigate to="/dashboard/admin" />;
  } else if (role === "Employee") {
    return <Navigate to="/dashboard/employee" />;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default App;
