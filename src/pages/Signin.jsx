import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import MUILink from "@mui/material/Link";
import { Navigate } from "react-router-dom";

function Copyright(props) {
  const { currentUser } = useAuth();

  return currentUser ? (
    <Navigate to="/" />
  ) : (
    <Typography
      fontFamily={"poppins"}
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <MUILink color="inherit" href="https://mui.com/">
        Rifqi Ahmad Fauzi
      </MUILink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default function Signin() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log(currentUser);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          <p className="text-center mb-2">Dummy Email: test@gmail.com</p>
          <p className="text-center mb-4">Dummy Password: test1234</p>
          <p className="text-center mb-4">Fitur Sign Up bisa digunakan</p>

          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </>
  );
}
