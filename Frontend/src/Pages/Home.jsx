import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";

function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    !user && navigate("/login", { replace: true });
  });

  return (
      <div className="jumbotron">
        <h1>Welcome {user ? user.name : null}</h1>
        <hr className="my-4" />
        <Link className="btn btn-info" to="/create">
          Add Contacts
        </Link>
      </div>
  );
}

export default Home;
