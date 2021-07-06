import { Row, Col } from "react-bootstrap";

import Sidebar from "../components/Sidebar";
import CardList from "../components/CardList";
import hello from "../assets/images/hello.svg";

const Home = () => {
  return (
    <div>
      <Row>
        <Col xs={4}>
          <Sidebar />
        </Col>
        <Col>
          <CardList />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
