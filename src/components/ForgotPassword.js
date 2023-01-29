import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, Navigate } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { currentUser, resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
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
                {message && <p className="has-text-success mb-3">{message}</p>}
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
                  <button className="button is-success is-fullwidth" disabled={loading}>Recover Password</button>
                </div>
                <span className="has-text-primary">
                  <Link to="/login">Login</Link>
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
    // <>
    //   <div className="box">
    //     <Card.Body>
    //       <h2 className="text-center mb-4">Password Reset</h2>
    //       {error && <Alert variant="danger">{error}</Alert>}
    //       {message && <Alert variant="success">{message}</Alert>}
    //       <Form onSubmit={handleSubmit}>
    //         <Form.Group id="email">
    //           <Form.Label>Email</Form.Label>
    //           <Form.Control type="email" ref={emailRef} required />
    //         </Form.Group>
    //         <Button disabled={loading} className="w-100" type="submit">
    //           Reset Password
    //         </Button>
    //       </Form>
    //       <div className="w-100 text-center mt-3">
    //         <Link to="/login">Login</Link>
    //       </div>
    //     </Card.Body>
    //   </div>
    //   <div className="w-100 text-center mt-2">
    //     Need an account? <Link to="/signup">Sign Up</Link>
    //   </div>
    // </>
  ) : (
    <Navigate to="/" replace />
  );
}
