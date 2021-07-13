import AddProduct from "../components/form/AddProduct";
import CardList from "../components/CardList";
import { API } from "../config/api";
// import { useQuery } from "react-query";
import { Container } from "react-bootstrap";

import { useEffect, useState } from "react";

// import socket io
import { io } from "socket.io-client";
let socket;

function Product() {
  // const { isLoading, data, error, refetch } = useQuery("products", async () => {
  //   const response = await API.get("/products");
  //   return response.data.data;
  // });

  const [products, setProducts] = useState(null);

  // socket implementation
  const loadProducts = async () => {
    await socket.emit("load products");
    await socket.on("products", (data) => {
      console.log(data);
      setProducts(data);
      console.log(products);
    });
  };

  useEffect(() => {
    // connection on specific namespace / route
    socket = io("http://localhost:4000/products", {
      transports: ["websocket"],
      auth: {
        token: localStorage.getItem("token"), // token for validation in middleware
      },
    });

    loadProducts();

    // triggered if connection error
    socket.on("connect_error", (err) => {
      console.log(err.message); // prints the message associated with the error
    });
    return () => {
      socket.disconnect(); // always disconnect when component is unmount
      setProducts(null); // set to initial state (prevent memory leak)
    };
  }, []);

  const handleAddProduct = async (data, config) => {
    await API.post("/product", data, config);
  };
  return (
    <Container>
      <AddProduct onAddProduct={handleAddProduct} />
      <hr />
      {products?.length > 0 && <CardList data={products} />}
    </Container>
  );
}

export default Product;
