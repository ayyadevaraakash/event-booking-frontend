import { useEffect, useState } from "react";
import api from "../services/api";

function EventList() {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events", {
        params: { category, location },
      });
      setEvents(res.data.content || []); // backend returns a Page object
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [category, location]);

  // ✅ Helper: safely format LocalDateTime from backend
  const formatDateTime = (dateStr) => {
    if (!dateStr) return "—";
    try {
      // Add "Z" for LocalDateTime strings (e.g. 2026-01-20T10:00:00)
      const date = new Date(dateStr.endsWith("Z") ? dateStr : dateStr + "Z");
      return date.toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return "Invalid date";
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

      {/* Event Cards */}
      <div className="row">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="col-md-4 mb-4">
              <div
                className="card shadow-sm border-0"
                style={{ borderRadius: "15px" }}
              >
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
                  <span className="badge bg-success">
                    ₹{event.price?.toFixed(2)}
                  </span>
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
