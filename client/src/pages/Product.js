import AddProduct from "../components/form/AddProduct";
import CardList from "../components/CardList";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { Container } from "react-bootstrap";
function Product() {
  const { isLoading, data, error, refetch } = useQuery("products", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  const handleAddProduct = async (data, config) => {
    await API.post("/product", data, config);
    refetch();
  };
  return (
    <Container>
      <AddProduct onAddProduct={handleAddProduct} />
      <hr />
      <CardList data={data} isLoading={isLoading} error={error} />
    </Container>
  );
}

export default Product;
