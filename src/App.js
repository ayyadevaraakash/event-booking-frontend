import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import EventList from "./components/EventList";
import CreateEvent from "./components/CreateEvent";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-event" element={<CreateEvent />} />
      </Routes>
    </Router>
  );
}

export default App;
