import { Button } from "@mui/material";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { logout } from "../../api/AuthApi";
import { FaCog, FaUserTie, FaUserGraduate, FaSignOutAlt, FaBook  } from 'react-icons/fa';

function HomePage() {
  const token = localStorage.getItem("token");
  let loggedIn = Boolean(token);

  let user = JSON.parse(localStorage.getItem("user"));
  

  return (
    <>
      <div className="navbar-container">
        <div className="flex-row navbar-wrapper">
          <div>
            <Link to="/">
              <img src="/logo/dotInstrukcije-logo.png" />
            </Link>
          </div>

          <div className="flex-row navbar-options">
            {loggedIn ? (
              <>
                {user.status === "professor" && (
                  <Link to="/new">
                  <Button variant="contained">Novi predmet</Button>
                </Link>
                )}
                <Link to="/subjects">
                  <Button variant="contained"><FaBook style={{ fontSize: '2em' }}/></Button>
                </Link>
                <Link to="/profile">
                  <Button variant="contained">Moje instrukcije</Button>
                </Link>
                <Link to="/settings" variant="contained" style={{ fontSize: '2em' }}>
                   <FaCog />
                </Link>
                <Link to="/" variant="contained" style={{ fontSize: '2em' }}>
                    {user.status  === "professor" ? (
                        <>
                        <FaUserTie />
                        </>
                      ) : user.status  === "student" ? (
                        <>
                        <FaUserGraduate />
                        </>
                      ) : null}
                </Link>
                <Button variant="contained" onClick={logout}>
                 <FaSignOutAlt style={{ fontSize: '2em' }} />
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="contained">Prijavi se</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
