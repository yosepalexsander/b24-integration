import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../contexts/userContext";
import {
  Button,
  FormControl,
  InputGroup,
  Form,
  Navbar,
  Nav,
} from "react-bootstrap";

import ModalSignin from "./ModalSignin";
import ModalSignup from "./ModalSignup";
import brand from "../assets/images/brand.svg";

import "../styles/customStyle.css";
import { setAuthToken } from "../config/api";
const Header = () => {
  const [search, setSearch] = useState("");
  const { state, dispatch } = useContext(UserContext);
  const [showSignin, setshowSignin] = useState(false);
  const [showSignup, setshowSignup] = useState(false);

  useEffect(() => {
    if (!state.isLogin) {
      setshowSignin(true);
    }
    return () => {
      setshowSignin(false);
      setshowSignup(false);
    };
  }, [state]);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSignout = (e) => {
    dispatch({
      type: "LOGOUT",
    });
    setAuthToken();
  };

  return (
    <Navbar expand="lg">
      <Link to="/" className="navbar-brand">
        <img src={brand} alt="brand" />
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/About" className="nav-link">
            About
          </Link>
          <Link to="/property" className="nav-link">
            Profile
          </Link>
        </Nav>
        <Form className="d-flex mr-auto">
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-auto"
              aria-describedby="search-button"
              name="search"
              value={search}
              onChange={handleChange}
            />
            <InputGroup.Append>
              <Button id="search-button">search</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
        {state.isLogin && (
          <>
            <p>{state.user.name}</p>
            <Button
              className="mr-3 my-2"
              variant="danger"
              onClick={handleSignout}
            >
              Sign out
            </Button>
          </>
        )}
        {!state.isLogin && (
          <>
            <Button className="mr-3 my-2" onClick={() => setshowSignup(true)}>
              Sign up
            </Button>
            <Button className="my-2" onClick={() => setshowSignin(true)}>
              Sign in
            </Button>
            <ModalSignin
              show={showSignin}
              handleClose={() => setshowSignin(false)}
              handleSignin={dispatch}
            />
            <ModalSignup
              show={showSignup}
              handleClose={() => setshowSignup(false)}
            />
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

// class Header extends Component {
//   constructor(props) {
//     super();
//     this.title = "Dumbways Batch 24"
//   }

//   render() {
//     return (
//       <header className="header">
//         <h1>{this.title}</h1>
//       </header>
//     )
//   }
// }

export default Header;
