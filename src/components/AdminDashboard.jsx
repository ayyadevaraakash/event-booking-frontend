import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    await Promise.all([fetchStats(), fetchUsers(), fetchEvents(), fetchBookings()]);
  };

  const fetchStats = async () => {
    const res = await api.get("/admin/stats");
    setStats(res.data);
  };
  const fetchUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data);
  };
  const fetchEvents = async () => {
    const res = await api.get("/admin/events");
    setEvents(res.data);
  };
  const fetchBookings = async () => {
    const res = await api.get("/admin/bookings");
    setBookings(res.data);
  };

  // --- Delete handlers ---
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await api.delete(`/admin/users/${id}`);
    alert("User deleted");
    fetchAll();
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    await api.delete(`/admin/events/${id}`);
    alert("Event deleted");
    fetchAll();
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    await api.delete(`/admin/bookings/${id}`);
    alert("Booking deleted");
    fetchAll();
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold text-primary mb-4">Admin Dashboard</h2>

      {/* --- Stats Summary --- */}
      <div className="row text-center mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm p-3 border-0">
            <h5>Total Users</h5>
            <h3 className="text-success">{stats.totalUsers}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-3 border-0">
            <h5>Total Events</h5>
            <h3 className="text-info">{stats.totalEvents}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-3 border-0">
            <h5>Total Bookings</h5>
            <h3 className="text-warning">{stats.totalBookings}</h3>
          </div>
        </div>
      </div>

      {/* --- Users Table --- */}
      <h4 className="mt-5 text-primary">Users</h4>
      <table className="table table-striped align-middle">
        <thead className="table-light">
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteUser(u.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- Events Table --- */}
      <h4 className="mt-5 text-primary">Events</h4>
      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Available Seats</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id}>
              <td>{e.title}</td>
              <td>{e.location}</td>
              <td>{e.availableSeats}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteEvent(e.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- Bookings Table --- */}
      <h4 className="mt-5 text-primary">Bookings</h4>
      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>User</th>
            <th>Event</th>
            <th>Seats</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.user?.email}</td>
              <td>{b.event?.title}</td>
              <td>{b.seats}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteBooking(b.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
