

import { useState, useContext } from "react";
import { registerHost } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Modal from "../components/Modal";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await registerHost({ name, email, password });

      // Automatically log in the user
      login(
        { id: res.data.id, name: res.data.name, email: res.data.email },
        res.data.token
      );

      setModalMessage("Registration successful!");
    } catch (err) {
      console.error(err.response?.data);
      setModalMessage(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    if (modalMessage === "Registration successful!") {
      navigate("/sessions"); // redirect only after user clicks OK
    }
    setModalMessage(null);
  };

  return (
    <div className="register-form">

    <div>
      <div className="register-text">
        <h2>Register or Joint as a participant</h2>
        <img src="" alt="" />
      </div>
    </div>
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: "400px", margin: "auto" }}
        >
          <h2>Register</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
    

      {/* Reusable Modal */}
      <Modal message={modalMessage} onClose={handleCloseModal} />
    </div>
  );
}
