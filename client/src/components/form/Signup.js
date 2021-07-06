import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { API } from "../../config/api";

const Signin = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    gender: ""
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    const config = {
      'Content-Type': 'application/json'
    }

    const response = await API.post('/login', data, config );
    console.log(response)
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Your name</Form.Label>
        <Form.Control 
        type="text" 
        name="name" 
        value={data.name}
        onChange={handleChange}
        placeholder="Enter your name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
        type="email" 
        name="email" 
        value={data.email}
        onChange={handleChange}
        placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type="password" 
        name="password" 
        value={data.password}
        onChange={handleChange}
        placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Gender</Form.Label>
        <Form.Control 
        type="text" 
        name="gender" 
        value={data.gender}
        onChange={handleChange}
        placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Signin;