import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
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
                    className="input"
                    ref={emailRef}
                    defaultValue={currentUser.email}
                    disabled
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
              </div><div className="field">
                <label className="label">
                  Confirm your password
                </label>
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
                <button className="button is-success is-fullwidth" disabled={loading}>Update</button>
              </div>
              <span className="has-text-primary"><Link to="/login">Cancel</Link></span>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
    // <>
    //   <Card>
    //     <Card.Body>
    //       <h2 className="text-center mb-4">Update Profile</h2>
    //       {error && <Alert variant="danger">{error}</Alert>}
    //       <Form onSubmit={handleSubmit}>
    //         <Form.Group id="email">
    //           <Form.Label>Email</Form.Label>
    //           <Form.Control
    //             type="email"
    //             ref={emailRef}
    //             required
    //             defaultValue={currentUser.email}
    //           />
    //         </Form.Group>
    //         <Form.Group id="password">
    //           <Form.Label>Password</Form.Label>
    //           <Form.Control
    //             type="password"
    //             ref={passwordRef}
    //             placeholder="Leave blank to keep the same"
    //           />
    //         </Form.Group>
    //         <Form.Group id="password-confirm">
    //           <Form.Label>Password Confirmation</Form.Label>
    //           <Form.Control
    //             type="password"
    //             ref={passwordConfirmRef}
    //             placeholder="Leave blank to keep the same"
    //           />
    //         </Form.Group>
    //         <Button disabled={loading} className="w-100" type="submit">
    //           Update
    //         </Button>
    //       </Form>
    //     </Card.Body>
    //   </Card>
    //   <div className="w-100 text-center mt-2">
    //     <Link to="/">Cancel</Link>
    //   </div>
    // </>
  )
}
