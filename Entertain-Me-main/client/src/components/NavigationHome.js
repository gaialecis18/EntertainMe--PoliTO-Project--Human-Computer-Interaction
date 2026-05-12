import { Form, Nav, Navbar } from "react-bootstrap/";
import { Person } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const NavigationHome = (props) => {
  const { user } = props;
  return (
    <Navbar style={{ fontSize: 30 }} bg="fcdb72" fixed="top">
      <Navbar.Toggle aria-controls="left-sidebar" />
      <Navbar.Brand href="/" style={{marginRight:"0px"}}>
        <img
          className="logo"
          alt="EntertainMe logo"
          src={require("./../images/EM_logo.png").default}
        />
      </Navbar.Brand>
      <Form
        inline
        style={{ color: "rgb(11, 30, 36)", fontWeight: "bold" }}
        className="my-2 my-lg-0 mx-auto d-block"
        action="#"
        role="search"
        aria-label="Quick search"
      >
        Hi {user !== undefined ? user.username : undefined}!
      </Form>
      <Nav className="justify-content-end">
        <Link to="/profile" className="linkHome">
      
          <Person className="mr-1 logo" style={{color:"rgb(11, 30, 36)",width:"50px",height:"50px"}} />
      
        </Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationHome;

