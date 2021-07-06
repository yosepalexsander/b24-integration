import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Container } from "react-bootstrap";
import { UserContextProvider } from "./contexts/userContext";
import PrivateRoute from "./components/route/PrivateRoute";
import Home from "./pages/Home";
import Header from "./components/Header";
import About from "./pages/About";
import DetailProduct from "./pages/DetailProduct";

const App = () => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <Router>
        <UserContextProvider>
          <Header />
          <Container fluid="lg">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <PrivateRoute
                exact
                path="/product/:id"
                component={DetailProduct}
              />
            </Switch>
          </Container>
        </UserContextProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
