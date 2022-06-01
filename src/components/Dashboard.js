import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <div className="box">
                <p className="is-size-3 mb-2">Profile</p>
                <p>
                  <strong>Email: </strong>
                  {currentUser.email}
                </p>
                <p>
                  <strong>Display Name: </strong>
                  {currentUser.displayName}
                </p>
                <div className="button is-fullwidth is-success mt-2">
                  <Link to="/update-profile">Update Profile</Link>
                </div>
                <button onClick={handleLogout} className="button is-fullwidth mt-2">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
