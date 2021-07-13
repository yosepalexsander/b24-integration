import { useParams } from "react-router-dom";

import { Row, Col } from "react-bootstrap";

import { useState, useEffect } from "react";
import { API } from "../config/api";

const DetailProduct = () => {
  const params = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const getProduct = async () => {
    const response = await API.get(`/product/${params.id}`);
    console.log(response);
    setData(response.data.data);
    setLoading(false);
  };
  useEffect(() => {
    getProduct();
    return () => {
      setData(null);
      setLoading(true);
    };
  }, []);

  if (loading) return <p>loading...</p>;
  return (
    <Row>
      <Col xs={6}>
        <img src={data?.image} alt="product" className="img-fluid" />
      </Col>
      <Col>
        <p>{data?.name}</p>
        <p>price: </p>
        <p>{data?.price}</p>
        <p>description: </p>
        <p>{data?.description}</p>
      </Col>
    </Row>
  );
};

export default DetailProduct;
