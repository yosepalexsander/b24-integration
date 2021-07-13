import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Container } from "react-bootstrap";
import { UserContext } from "./contexts/userContext";
import PrivateRoute from "./components/route/PrivateRoute";
import Home from "./pages/Home";
import Header from "./components/Header";
import About from "./pages/About";
import DetailProduct from "./pages/DetailProduct";
import { API, setAuthToken } from "./config/api";
import { useContext, useEffect } from "react";
import Product from "./pages/Product";
import { Chat } from "./pages/Chat";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

const App = () => {
  const { dispatch } = useContext(UserContext);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status !== 200) {
        return dispatch({ type: "AUTH_ERROR" });
      }

      let payload = response.data.data;
      payload.token = localStorage.getItem("token");

      dispatch({
        type: "AUTH_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "AUTH_ERROR" });
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <Router>
        <Header />
        <Container fluid="lg">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/products" component={Product} />
            <PrivateRoute exact path="/product/:id" component={DetailProduct} />
            {/* socket implementation page */}
            <Route path="/chat">
              <Chat />
            </Route>
          </Switch>
        </Container>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
