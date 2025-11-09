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
      alert("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await api.delete(`/bookings/${id}`);
      alert("Booking cancelled successfully!");
      fetchBookings();
    } catch (err) {
      alert("Cancel failed: " + (err.response?.data?.message || err.message));
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

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
              <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
                {b.event?.imageUrl && (
                  <img
                    src={b.event.imageUrl}
                    alt={b.event.title}
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
                  <h5 className="card-title text-primary">{b.event?.title}</h5>
                  <p className="card-text mb-1">
                    <strong>Location:</strong> {b.event?.location}
                  </p>
                  <p className="card-text text-muted mb-1">
                    <strong>Date:</strong>{" "}
                    {new Date(b.event?.startAt).toLocaleString([], {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Seats Booked:</strong> {b.seats}
                  </p>
                  <p className="card-text mb-2">
                    <strong>Price:</strong> ₹
                    {b.event?.price ? b.event.price.toFixed(2) : "N/A"}
                  </p>
                  <button
                    className="btn btn-danger btn-sm w-100"
                    onClick={() => handleCancel(b.id)}
                  >
                    Cancel Booking
                  </button>
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
