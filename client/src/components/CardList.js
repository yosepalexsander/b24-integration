import data from "../data/fakeData";
import { Col, Row } from "react-bootstrap";
import CardItem from "./CardItem";
import { API } from "../config/api";
import { useState, useEffect } from "react";

import not_found from "../assets/images/not_found.svg";
const CardList = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const getProducts = async () => {
    const response = await API.get("/products");
    setData(response.data.data);
    setLoading(false);
  };
  useEffect(() => {
    getProducts();
    return () => {
      setData(null);
    };
  }, []);

  if (loading) return <p>...loading</p>;
  return (
    <Row>
      {data.length <= 0 && (
        <img src={not_found} width="100%" height="100%" alt="not found" />
      )}
      {data.length > 0 &&
        data.map((item, index) => (
          <Col key={index}>
            <CardItem item={item} />
          </Col>
        ))}
    </Row>
  );
};

export default CardList;
