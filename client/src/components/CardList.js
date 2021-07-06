import { Col, Row } from "react-bootstrap";
import CardItem from "./CardItem";
import { API } from "../config/api";
import { useQuery } from "react-query";

import not_found from "../assets/images/not_found.svg";
const CardList = () => {
  const { isLoading, data, error } = useQuery("products", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  if (isLoading) return <p>...loading</p>;
  if (error) return <h1>Error occured: {error.response.data.message}</h1>;
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
