import { useEffect, useState } from "react";
import api from "../services/api";

function EventList() {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [editEvent, setEditEvent] = useState(null);

  const role = localStorage.getItem("role");

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events", {
        params: { category, location },
      });
      setEvents(res.data.content || []);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [category, location]);

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "—";
    try {
      const date = new Date(dateStr.endsWith("Z") ? dateStr : dateStr + "Z");
      return date.toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return "Invalid date";
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await api.delete(`/events/${id}`);
      alert("Event deleted successfully!");
      fetchEvents();
    } catch (err) {
      alert("Delete failed: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (event) => setEditEvent({ ...event });

  const handleChange = (e) => {
    setEditEvent({ ...editEvent, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/events/${editEvent.id}`, editEvent);
      alert("Event updated successfully!");
      setEditEvent(null);
      fetchEvents();
    } catch (err) {
      alert("Update failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container mt-5">
      {/* Filters */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-primary">Upcoming Events</h3>
        <div className="d-flex gap-2">
          <input
            type="text"
            placeholder="Category"
            className="form-control"
            style={{ width: "150px" }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            className="form-control"
            style={{ width: "150px" }}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button className="btn btn-outline-primary" onClick={fetchEvents}>
            Filter
          </button>
        </div>
      </div>

      {/* Edit Form */}
      {editEvent && (
        <div className="card shadow-sm mb-4 p-4">
          <h5 className="mb-3 text-primary">Edit Event</h5>
          <form onSubmit={handleUpdate} className="row g-3">
            <div className="col-md-6">
              <input
                name="title"
                value={editEvent.title}
                onChange={handleChange}
                placeholder="Title"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <input
                name="location"
                value={editEvent.location}
                onChange={handleChange}
                placeholder="Location"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <input
                name="category"
                value={editEvent.category}
                onChange={handleChange}
                placeholder="Category"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <input
                name="price"
                type="number"
                value={editEvent.price}
                onChange={handleChange}
                placeholder="Price (₹)"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <input
                name="startAt"
                type="datetime-local"
                value={editEvent.startAt?.slice(0, 16) || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <input
                name="endAt"
                type="datetime-local"
                value={editEvent.endAt?.slice(0, 16) || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <input
                name="totalSeats"
                type="number"
                value={editEvent.totalSeats}
                onChange={handleChange}
                placeholder="Total Seats"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <input
                name="availableSeats"
                type="number"
                value={editEvent.availableSeats}
                onChange={handleChange}
                placeholder="Available Seats"
                className="form-control"
              />
            </div>
            <div className="col-md-12">
              <input
                name="imageUrl"
                value={editEvent.imageUrl}
                onChange={handleChange}
                placeholder="Image URL"
                className="form-control"
              />
            </div>
            <div className="col-md-12">
              <textarea
                name="description"
                value={editEvent.description}
                onChange={handleChange}
                placeholder="Description"
                className="form-control"
                rows="3"
              />
            </div>

            <div className="col-12 text-end">
              <button type="submit" className="btn btn-success me-2">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditEvent(null)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}


      {/* Event Cards */}
      <div className="row">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="col-md-4 mb-4">
              <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
                {event.imageUrl && (
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="card-img-top"
                    style={{
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title text-primary">{event.title}</h5>
                  <p className="card-text mb-1">
                    <strong>Category:</strong> {event.category}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className="card-text text-muted mb-1">
                    <strong>Start:</strong> {formatDateTime(event.startAt)}
                  </p>
                  <p className="card-text text-muted mb-2">
                    <strong>End:</strong> {formatDateTime(event.endAt)}
                  </p>
                  <p className="text-secondary" style={{ fontSize: "0.9rem" }}>
                    {event.description?.length > 100
                      ? event.description.slice(0, 100) + "..."
                      : event.description}
                  </p>
                  <span className="badge bg-success">₹{event.price?.toFixed(2)}</span>

                  {/* Organizer actions */}
                  {role === "ORGANIZER" && (
                    <div className="mt-3 d-flex gap-2">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEdit(event)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(event.id)}
                      >
                        🗑 Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted text-center">No events found</p>
        )}
      </div>
    </div>
  );
}

export default EventList;
