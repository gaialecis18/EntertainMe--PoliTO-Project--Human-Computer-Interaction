import { ArrowLeft, House } from "react-bootstrap-icons";
import { Form, Nav, Navbar } from "react-bootstrap/";
import { Link, useLocation } from "react-router-dom";

import { useHistory } from "react-router-dom";
import "./ComponentStyle.css";

const NavigationOtherPages = (props) => {
  const location = useLocation();
  const history = useHistory();

  const pageName = (pathname) => {
    switch (pathname) {
      case "/easy-choice":
        return "Easy choice";
      case "/watch-film":
        return "Watch Now";
      case "/film":
        return "Extras  ";
      case "/info":
        return "About us";
      case "/profile":
        return "My account";
      case "/search":
        return "Discover";
      case "/external-link":
        return "Extra Content";
      default:
        return "page name";
    }
  };


  const whiteFont = "#E9EFF0";

  return (
    <Navbar className="navSearch"
      style={{ fontSize: 30,  color: whiteFont }}
      fixed="top"
    >
      <Navbar.Toggle aria-controls="left-sidebar" />
      <Navbar.Brand
        onClick={() => {
          history.goBack();
        }}
      >
        <ArrowLeft style={{ color: "#E9EFF0", height:"30px",width:"30px"}} />
      </Navbar.Brand>
      <Form
        inline
        style={{ color: whiteFont, fontWeight: "bold" }}
        className="my-2 my-lg-0 mx-auto d-block"
        action="#"
        role="search"
        aria-label="Quick search"
      >
        {pageName(location.pathname)}
      </Form>
      <Nav className="justify-content-end">
        <Form inline className="mx-2">
          <Link className="link" to={{ pathname: "/" }}>
            {" "}
            <House />
          </Link>
        </Form>
      </Nav>
    </Navbar>
  );
};

export default NavigationOtherPages;
