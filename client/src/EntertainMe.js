import { React, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./EntertainMe.css";

import { Container, Row, Toast } from "react-bootstrap/";

import { Route, Switch } from "react-router-dom";
import NavigationHome from "./components/NavigationHome";

import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import Discover from "./components/Discover";
import EasyChoice from "./components/EasyChoice";
import ExternalLink from "./components/ExternalLink";
import FilmExtras from "./components/FilmExtras";
import FilmSearched from "./components/FilmSearched";
import Home from "./components/Home";
import Info from "./components/Info";
import NavigationOtherPages from "./components/NavigationOtherPages";
import Profile from "./components/Profile";
import Search from "./components/Search";
import WatchFilm from "./components/WatchFilm";
dayjs.extend(isToday);



const EntertainMe = () => {
  return (
    <Router>
      <Main></Main>
    </Router>
  );
};

const Main = () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const user = {
    id: 1,
    username: "User",
    picture: "user.png",
  };

  // show error message in toast
  const handleErrors = (err) => {
    setMessage(err);
    console.log(err);
  };

  // show success message in toast
  const handleSuccess = (err) => {
    setSuccess(err);
  };

  return (
    <Container
      fluid
      maxwidth="sm"
      style={{ padding: 0, width: "100VW" }}
      className="background"
    >
      <Toast
        show={message !== ""}
        onClose={() => setMessage("")}
        delay={2000}
        autohide
        style={{borderRadius:"15px"}}
      >
        <Toast.Body style={{ backgroundColor: "rgb(188, 210, 227)", color: "white",borderRadius:"15px" }}>
          <nobr>{message}</nobr>
        </Toast.Body>
      </Toast>

      <Toast
        show={success !== ""}
        onClose={() => setSuccess("")}
        delay={2000}
        autohide
        style={{borderRadius:"15px"}}
      >
        <Toast.Body style={{ backgroundColor: "#cb4da3", color: "white",fontSize:"18px",borderRadius:"15px" }}>
          <nobr> {success}</nobr>
        </Toast.Body>
      </Toast>

      <Switch>
        <Route path="/profile">
          <div >
            <div className="below-nav">
              <Profile user={user} />
            </div>
          </div>
        </Route>

        <Route exact path="/discover">
          <div className="vh-100" style={{ padding: "15px" }}>
            <div className=" below-nav">
              <Discover user={user} handleErrors={handleErrors} />
            </div>
          </div>
        </Route>

        <Route path="/easy-choice">
          <div className="vh-100 below-nav" style={{ padding: "15px" }}>
            <EasyChoice
              user={user}
              setSuccess={setSuccess}
              handleErrors={handleErrors}
            />
          </div>
        </Route>

        <Route path="/watch-film">
          <div className="vh-100" style={{ padding: "15px" }}>
            <div className=" below-nav">
              <WatchFilm
                user={user}
                handleErrors={handleErrors}
                setSuccess={setSuccess}
              />
            </div>
          </div>
        </Route>

        <Route path="/film-searched">
          <div className="vh-100 below-nav" style={{ padding: "15px" }}>
            <div className=" below-nav">
              <FilmSearched
                user={user}
                handleErrors={handleErrors}
                setSuccess={setSuccess}
              />
            </div>
          </div>
        </Route>

        <Route path="/film">
          <div className="vh-100" >
            <FilmExtras user={user} handleErrors={handleErrors} />
          </div>
        </Route>

        <Route path="/search">
          <div style={{ padding: "15px"}}>
            
            <Row>
              <NavigationOtherPages user={user} />
            </Row>
            
            <div className="vh-100 below-nav" >
              <Search user={user} handleErrors={handleErrors} />
            </div>
          </div>
        </Route>

        <Route path="/external-link">
          <Row>
            <NavigationOtherPages />
          </Row>
          <div className="vh-100 below-nav">
            <ExternalLink />
          </div>
        </Route>

        <Route path="/info">
          <div className="vh-100" >
            <Row>
              <NavigationOtherPages user={user} />
            </Row>
            <div style={{paddingTop:"4.5rem"}}>
              <Info handleSuccess={handleSuccess} handleErrors={handleErrors} />
            </div>
          </div>
        </Route>

        <Route path="/">
          <div className="absoluteImageContainer">
            <img
              className="absoluteImage"
              alt="background"
              src={require("./images/background/wave-haikei (10).svg").default}
            />
          </div>
          <Container
            fluid
            maxwidth="sm"
            className="home" 
          >
            <Row>
              <NavigationHome user={user} />
            </Row>
            <div className="below-nav">
              <Home />
            </div>
          </Container>
        </Route>
      </Switch>
    </Container>
  );
};

export default EntertainMe;
