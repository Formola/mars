import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { checkUsernameAvailability, registerUser } from "../utils/queries";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Signup() {
  const emailRef = useRef();
  const usernameRef = useRef();
  const displayNameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, signup, updateProfile} = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      const username = usernameRef.current.value
      checkUsernameAvailability(username)
      const signupResponse = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      const user = signupResponse.user
      await updateProfile(user, {displayName: displayNameRef.current.value})
      await registerUser(user.uid, user.email, user.displayName, username);
      history("/");
    } catch (e) {
      console.log(e);
      setError("Failed to create an account");
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
                  <label className="label">Username</label>
                  <div className="control">
                    <input
                      type="text"
                      placeholder="your username"
                      className="input"
                      ref={usernameRef}
                      required
                    />
                  </div>
                </div><div className="field">
                  <label className="label">Display Name</label>
                  <div className="control">
                    <input
                      type="text"
                      placeholder="your displayName"
                      className="input"
                      ref={displayNameRef}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Email</label>
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
                  <label className="label">Password</label>
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
                  <label className="label">Confirm your password</label>
                  <div className="control has-icons-left">
                    <input
                      type="password"
                      placeholder="*******"
                      className="input"
                      ref={passwordConfirmRef}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fa fa-lock"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <button
                    className="button is-success is-fullwidth"
                    disabled={loading}
                  >
                    Sign Up
                  </button>
                </div>
                Already have an account?{" "}
                <span className="has-text-primary">
                  <Link to="/login">Login</Link>
                </span>
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
