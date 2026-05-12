import { Button } from "react-bootstrap/";
import { Link } from "react-router-dom";
import {Question } from "react-bootstrap-icons";

const blueBackground = "#2496BF";
const whiteFont = "#E9EFF0";

const Home = () => {
  return (
    <div
      className="text-center"
      style={{
        fontSize: 30,
        color: whiteFont,
        height: "760px",
      }}
    >
      <div>
        <p style={{ color: whiteFont,fontWeight: 670, fontSize: 18, padding: "1.5rem 1.3rem 0 1.3rem", }}>
       Let's find well suited contents to watch on our AI-powered platform
        </p>
      </div>
      <div className="text-center" style={{ fontSize: 25, paddingTop: "7rem",}}>
        <div style={{ fontWeight: "bold" }}>
          <Link to="/easy-choice">
            <Button
              style={{
                fontSize: 25,
                fontWeight: "600",
                borderRadius: "50px",
                /*background:"#4ba4f2"*/ background: blueBackground,
                border: "0px",
                width: "250px",
              padding: "0.5rem"
              }}
            >
              Easy Choice
            </Button>
          </Link>
        </div>
        <div
          style={{
            fontSize: 15,
            paddingLeft: "2.5rem",
            paddingRight: "2.5rem",
            paddingTop:"0.1rem",
            color: whiteFont,
            
          }}
        >
          Quickly find content within your comfort zone with just one click
        </div>
        <div style={{ paddingTop: "2rem", fontWeight: "bold" }}>
          <Link to="/discover">
            <Button
              style={{
                fontSize: 25,
                fontWeight: "600",
                borderRadius: "50px",
                background: blueBackground /*background:"#4ba4f2"*/,
                border: "0px",
                width: "250px",
                padding: "0.5rem"
              }}
            >
              Answer and Watch
            </Button>
          </Link>
        </div>
        <div
          style={{
            fontSize: 15,
            paddingLeft: "2.5rem",
            paddingRight: "2.5rem",
            paddingTop:"0.1rem",
            color: whiteFont,
          }}
        >
          Discover tailored suggestions based on your current preferences and mood
        </div>
        <div style={{ paddingTop: "2rem", fontWeight: "bold" }}>
          <Link to="/search">
            <Button
              style={{
                fontSize: 25,
                fontWeight: "600",
                borderRadius: "50px",
                background: blueBackground /*background:"#4ba4f2"*/,
                border: "0px",
                width: "250px",
                padding: "0.5rem"
              }}
            >
              Discover
            </Button>
          </Link>
        </div>
        <div
          style={{
            fontSize: 15,
            paddingLeft: "2.5rem",
            paddingRight: "2.5rem",
            paddingTop:"0.1rem",
            color: whiteFont
          }}
        >
          Explore and find inspiration on your own
        </div>
        <Link to="/info">
        <div className="absoluteImageC">
            <img
              className="absoluteI"
              alt="background"
              src={require("./../images/background/graph.png").default}
            />
          </div>
          
            <Question style={{ position: "absolute",left: 0,
  bottom: 0,
  zIndex: 1030,
  margin:"0 1rem 1.5rem 1.3rem", color:whiteFont, fontSize:"50px"}}
  ></Question>
          
        </Link>
      </div>
    </div>
  );
};

export default Home;
