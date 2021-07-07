import { Row, Col } from "react-bootstrap";

import Sidebar from "../components/Sidebar";
import CardList from "../components/CardList";
import { API } from "../config/api";
import { useQuery } from "react-query";

const Home = () => {
  const { isLoading, data, error } = useQuery("products", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });
  return (
    <div>
      <Row>
        <Col xs={4}>
          <Sidebar />
        </Col>
        <Col>
          <CardList data={data} isLoading={isLoading} error={error} />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
