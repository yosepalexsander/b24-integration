import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function AddProduct(props) {
  const [data, setData] = useState({
    name: "",
    price: 0,
    description: "",
    imageFile: null,
    category: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const formData = new FormData();
      formData.set("name", data.name);
      formData.set("price", data.price);
      formData.set("description", data.description);
      formData.append("imageFile", data.imageFile, data.imageFile.name);
      formData.set("category", data.category);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      await props.onAddProduct(formData, config);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            name="name"
            type="text"
            value={data.name}
            required
            placeholder="product name"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            name="price"
            type="number"
            value={data.price}
            required
            placeholder="price"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            name="description"
            type="text"
            placeholder="description"
            required
            value={data.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            name="imageFile"
            type="file"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            name="category"
            type="text"
            required
            placeholder="category"
            value={data.category}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit">Add</Button>
      </Form>
    </div>
  );
}

export default AddProduct;
