import { useState } from "react";
import api from "../services/api";

function BookEventModal({ show, onClose, event, refreshEvents }) {
  const [seats, setSeats] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!show || !event) return null;

  const handleBooking = async () => {
    try {
      setLoading(true);
      setError("");
      await api.post("/bookings", {
        eventId: event.id,
        seats: Number(seats),
      });
      alert("Booking successful!");
      onClose();
      refreshEvents();
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Booking failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Book Event</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <p className="fw-bold">{event.title}</p>
            <p>Available Seats: {event.availableSeats}</p>
            <input
              type="number"
              className="form-control"
              placeholder="Number of seats"
              value={seats}
              min="1"
              max={event.availableSeats}
              onChange={(e) => setSeats(e.target.value)}
            />
            {error && <div className="text-danger mt-2">{error}</div>}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleBooking}
              disabled={loading}
            >
              {loading ? "Booking..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookEventModal;
