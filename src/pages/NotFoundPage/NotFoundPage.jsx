import { Link } from "react-router-dom";
import "./NotFoundPage.scss";

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <h1 className="not-found__heading">404</h1>
      <p className="not-found__text">Page Not Found</p>
      <Link to="/" className="not-found__link">
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
