import { useEffect, useState } from "react";
import api from "../services/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings");
      setBookings(res.data || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      alert("Failed to load your bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "—";
    try {
      const date = new Date(dateStr.endsWith("Z") ? dateStr : dateStr + "Z");
      return date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
    } catch {
      return "Invalid date";
    }
  };

  if (loading) return <p className="text-center mt-5">Loading your bookings...</p>;

  return (
    <div className="container mt-5">
      <h3 className="fw-bold text-primary mb-4">My Bookings</h3>
      {bookings.length === 0 ? (
        <p className="text-muted text-center">You haven’t booked any events yet.</p>
      ) : (
        <div className="row">
          {bookings.map((b) => (
            <div key={b.id} className="col-md-4 mb-4">
              <div className="card shadow-sm border-0" style={{ borderRadius: "12px" }}>
                {b.event?.imageUrl && (
                  <img
                    src={b.event.imageUrl}
                    alt={b.event.title}
                    className="card-img-top"
                    style={{
                      height: "160px",
                      objectFit: "cover",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title text-primary">{b.event?.title}</h5>
                  <p className="card-text mb-1">
                    <strong>Location:</strong> {b.event?.location}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Seats:</strong> {b.seats}
                  </p>
                  <p className="card-text text-muted mb-1">
                    <strong>Event Date:</strong> {formatDateTime(b.event?.startAt)}
                  </p>
                  <p className="card-text text-muted mb-0">
                    <strong>Booked On:</strong> {formatDateTime(b.bookedAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
