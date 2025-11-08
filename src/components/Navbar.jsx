import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <a
        className="navbar-brand fw-bold"
        href="/"
        style={{ letterSpacing: "0.5px" }}
      >
        Event Tracker
      </a>

      <div className="ms-auto d-flex align-items-center gap-3">
        {!token ? (
          <>
            <button
              className="btn btn-outline-light btn-sm"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="btn btn-light btn-sm text-primary fw-semibold"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </>
        ) : (
          <>
            {role === "ORGANIZER" && (
              <button
                className="btn btn-light btn-sm text-primary fw-semibold"
                onClick={() => navigate("/create-event")}
              >
                + Create Event
              </button>
            )}
            <span className="text-white small me-2">
              {role === "ORGANIZER" ? "Organizer" : "User"}
            </span>
            <button
              className="btn btn-outline-light btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
