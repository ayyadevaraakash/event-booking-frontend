import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [price, setPrice] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/events", {
        title,
        category,
        location,
        startAt,
        endAt,
        price: parseFloat(price),
        totalSeats: parseInt(totalSeats),
        availableSeats: parseInt(availableSeats),
        description,
        imageUrl
      });
      setMessage("✅ Event created successfully!");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create event. Check permissions or data.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow-lg border-0"
        style={{ width: "550px", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-4 text-primary fw-bold">
          Create New Event
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              placeholder="Write a short description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              required
            ></textarea>
          </div>

          {/* Category and Location */}
          <div className="row mb-3">
            <div className="col">
              <label className="form-label fw-semibold">Category</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Tech, Music"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div className="col">
              <label className="form-label fw-semibold">Location</label>
              <input
                type="text"
                className="form-control"
                placeholder="City / Venue"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Start and End Date-Time */}
          <div className="row mb-3">
            <div className="col">
              <label className="form-label fw-semibold">Start At</label>
              <input
                type="datetime-local"
                className="form-control"
                value={startAt}
                onChange={(e) => setStartAt(e.target.value)}
                required
              />
            </div>
            <div className="col">
              <label className="form-label fw-semibold">End At</label>
              <input
                type="datetime-local"
                className="form-control"
                value={endAt}
                onChange={(e) => setEndAt(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Price and Seats */}
          <div className="row mb-3">
            <div className="col">
              <label className="form-label fw-semibold">Price (₹)</label>
              <input
                type="number"
                className="form-control"
                min="0"
                step="0.01"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="col">
              <label className="form-label fw-semibold">Total Seats</label>
              <input
                type="number"
                className="form-control"
                min="1"
                placeholder="e.g. 300"
                value={totalSeats}
                onChange={(e) => setTotalSeats(e.target.value)}
                required
              />
            </div>
            <div className="col">
              <label className="form-label fw-semibold">Available Seats</label>
              <input
                type="number"
                className="form-control"
                min="0"
                placeholder="e.g. 300"
                value={availableSeats}
                onChange={(e) => setAvailableSeats(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Image URL</label>
            <input
              type="url"
              className="form-control"
              placeholder="https://example.com/banner.png"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>

          {/* Message */}
          {message && (
            <div
              className={`text-center fw-semibold mb-3 ${
                message.includes("success") ? "text-success" : "text-danger"
              }`}
            >
              {message}
            </div>
          )}

          {/* Submit */}
          <button className="btn btn-primary w-100 py-2 fw-semibold">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
