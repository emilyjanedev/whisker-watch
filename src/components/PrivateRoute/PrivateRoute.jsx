import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import PropTypes from "prop-types";

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/login" />;
}

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.array.isRequired,
};
