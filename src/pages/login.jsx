

import { useState, useContext } from "react";
import { loginHost } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Modal from "../components/Modal";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginHost({ email, password });
      login(
        { id: res.data.id, name: res.data.name, email: res.data.email },
        res.data.token
      );
      setModalMessage("Login successful!");
    } catch (err) {
      console.error(err.response?.data);
      setModalMessage(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    if (modalMessage === "Login successful!") {
      navigate("/sessions"); // redirect only after user clicks OK
    }
    setModalMessage("");
  };

  return (
    <>
    
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "auto" }}
      >
        <h2>Login</h2>
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <Modal message={modalMessage} onClose={handleCloseModal} />
    </>
  );
}
