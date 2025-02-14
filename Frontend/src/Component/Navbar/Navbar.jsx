import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useContext } from "react";
import AuthContext from "../../context/authContext";
import ToastContext from "../../context/toastContext";

function Navbar() {
  const navigate = useNavigate()
  const {toast} = useContext(ToastContext)
  const { user , setUser } = useContext(AuthContext);
  return (
    <div className="uk">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link to="/">
            <a className="navbar-brand">CMS</a>
          </Link>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav ms-auto">
              {user ? (
                <>
                  <li className="nav-item">
                    <Link to="/mycontact">
                      <a className="nav-link">All Contact</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/create">
                      <a className="nav-link">Create</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-danger" onClick={() => {
                      setUser(null)
                      localStorage.clear()
                      toast.success("Logged Out.")
                      navigate("/login", { replace: true });
                    }}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login">
                      <a className="nav-link">Login</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register">
                      <a className="nav-link">Register</a>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
