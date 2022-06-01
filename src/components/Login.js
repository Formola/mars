import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { currentUser, login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/", { replace: true });
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return currentUser == null ? (
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form onSubmit={handleSubmit} className="box">
                {error && <p className="has-text-danger">{error}</p>}
                <div className="field">
                  <label className="label">
                    Email
                  </label>
                  <div className="control has-icons-left">
                    <input
                      type="email"
                      placeholder="e.g. bobsmith@gmail.com"
                      className="input"
                      ref={emailRef}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">
                    Password
                  </label>
                  <div className="control has-icons-left">
                    <input
                      type="password"
                      placeholder="*******"
                      className="input"
                      ref={passwordRef}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fa fa-lock"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <button className="button is-success is-fullwidth" disabled={loading}>Login</button>
                </div>
                <span className="has-text-primary">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </span>
                <div>
                  Need an account? <span className="has-text-primary"><Link to="/signup">Sign Up</Link></span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Navigate to="/" replace />
  );
}