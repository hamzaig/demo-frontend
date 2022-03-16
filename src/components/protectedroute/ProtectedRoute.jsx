import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoute = () => {

  const userLogin = useSelector(state => state.userLogin);
  const { userData: { user } } = userLogin;

  return (
    user ? <Outlet /> : <Navigate to={"/login"} />
  )
}

export default ProtectedRoute