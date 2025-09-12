import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar">
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav_link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="nav_link">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/manage-events" className="nav_link">
              Manage events
            </Link>
          </li>
          <li>
            <Link to="/help" className="nav_link">
              Help
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
