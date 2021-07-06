import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function CardItem({ item }) {
  const router = useHistory();

  const handlePushToDetail = (id) => {
    console.log(id);
    router.push(`product/${id}`);
  };
  return (
    <Card style={{ width: "18rem", marginBottom: "10px" }}>
      <Card.Img
        variant="top"
        src={item.image}
        height={200}
        style={{ objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>{item.price}</Card.Text>
        <Button variant="secondary" onClick={() => handlePushToDetail(item.id)}>
          Go somewhere
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CardItem;
