import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { API, setAuthToken } from "../../config/api";

const Signin = ({ handleSignin }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      "Content-Type": "application/json",
    };

    const response = await API.post("/login", data, config);
    console.log(response);
    setAuthToken(response.data.data.token);
    handleSignin({
      type: "LOGIN",
      payload: response.data.data,
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Password"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Signin;
