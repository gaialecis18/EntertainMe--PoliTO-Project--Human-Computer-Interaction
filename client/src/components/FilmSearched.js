import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import dayjs from "dayjs";
import { ArrowLeft, House } from "react-bootstrap-icons";
import { Form, Modal, Nav, Navbar } from "react-bootstrap/";
import Spinner from "react-bootstrap/Spinner";
import { AiOutlineSearch } from "react-icons/ai";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FiSmartphone } from "react-icons/fi";
import { TbScreenShare } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import API from "../API";


const pinkFont = "#bb2a8d";


const FilmSearched = (props) => {
  const [filmSelected, setFilmSelected] = useState();
  const [isFilmLiked, setIsFilmLiked] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [watchModalVisible, setWatchModalVisible] = useState(false);
  const [watchingOnTelephone, setWatchingOnTelephone] = useState(true);
  const [skip, setSkip] = useState(0);
  const [filmList, setFilmList] = useState(undefined);

  const location = useLocation();

  const likeFilm = async () => {
    try {
      setIsFilmLiked((old) => !old);
      await API.addFilmLiked({
        film_id: filmSelected.id,
        user_id: props.user.id,
        date: dayjs().toString(),
      });
      props.setSuccess("Added to your favourites");
    } catch (error) {
      setIsFilmLiked((old) => !old);
      props.handleErrors(error.message);
    }
  };

  const unlikeFilm = async () => {
    try {
      setIsFilmLiked((old) => !old);
      await API.unlikeFilm(props.user.id, filmSelected.id);
      props.setSuccess("Removed from your favourites!");
    } catch (error) {
      setIsFilmLiked((old) => !old);
      props.handleErrors(error.message);
    }
  };

  const whiteFont = "#E9EFF0";

  useEffect(() => {
    async function callApi() {
      try {
        const filmsLikedByUser = await API.getFilmLiked(props.user.id);
        if (filmsLikedByUser && location.state && location.state.filmSelected) {
          setIsFilmLiked(
            filmsLikedByUser.filter(
              (film) => film.film_id === location.state.filmSelected.id
            ).length > 0
          );
        }
        setFilmSelected(
          location.state ? location.state.filmSelected : undefined
        );
        setWatchingOnTelephone(
          location.state ? location.state.watchingOnTelephone : false
        );
        setSkip(
          location.state && location.state.skip ? location.state.skip : 0
        );
        setFilmList(
          location.state && location.state.filmList
            ? location.state.filmList
            : undefined
        );
        setIsLoading((old) => !old);
      } catch (error) {
        props.handleErrors(error.message);
      }
    }
    callApi();
  }, []);

  const WatchNowModal = () => {
    return (
      <Modal
        className="text-center"
        style={{ paddingTop: "15rem" }}
        show
        onHide={() => {
          setWatchModalVisible(false);
        }}
        animation={false}
      >
        <Modal.Header closeButton style={{backgroundColor: whiteFont }}>
          <Modal.Title style={{fontWeight:600,paddingLeft:"25px"}}>Where do you want to watch it?</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body style={{backgroundColor: whiteFont }}>
            <div>
              <Link
                to={{
                  pathname: "/watch-film",
                  state: {
                    watchingOnTelephone: true,
                    filmSelected: filmSelected,
                    isFilmLiked: isFilmLiked,
                    isFilmWatched: false,
                    comingFromSearchFlow: true,
                  },
                }}
              >
                <Button className="btnWatchNow">
                  {" "}
                  <FiSmartphone /> On this device
                </Button>
              </Link>
            </div>
            <div style={{ paddingTop: "2rem" }}>
              <Link
                to={{
                  pathname: "/watch-film",
                  state: {
                    watchingOnTelephone: false,
                    filmSelected: filmSelected,
                    isFilmLiked: isFilmLiked,
                    isFilmWatched: false,
                    comingFromSearchFlow: true,
                  },
                }}
              >
                <Button className="btnWatchNow">
                  {" "}
                  <TbScreenShare /> On another device
                </Button>
              </Link>
            </div>
          </Modal.Body>
        </Form>
      </Modal>
    );
  };

  const NavigationFilmSearched = () => {
    return (
      <Navbar style={{ fontSize: 30, color: whiteFont }} fixed="top">
        <Navbar.Toggle aria-controls="left-sidebar" />
        <Navbar.Brand>
          <Link className="link" replace={true} to={{ pathname: "search" }}>
            <ArrowLeft style={{ color: whiteFont, height:"30px",width:"30px" }}/>
          </Link>
        </Navbar.Brand>
        <Form
          inline
          style={{ color: whiteFont, fontWeight: "bold" }}
          className="my-2 my-lg-0 mx-auto d-block"
          action="#"
          role="search"
          aria-label="Quick search"
        >
          Watch Now
        </Form>
        <Nav className="justify-content-end">
          <Form inline className="mx-2">
            <Link className="link" to={{ pathname: "/" }}>
              <House />
            </Link>
          </Form>
        </Nav>
      </Navbar>
    );
  };

  const FilmSearchedComponent = () => {
    return (

      <>
      <div style={{ height: "40%" }}>
        <img
          style={{ height: "300px", objectFit: "contain" }}
          alt="movie poster"
          src={
            require("./../images/posters/" + filmSelected.picture).default
          }
        />
      </div>
      <div
        style={{
          height: "380px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <h3 style={{ paddingTop: "1rem", color: whiteFont }}>
            {filmSelected && filmSelected.name}
          </h3>
        </div>
        <div style={{ fontSize: 15, color: whiteFont, width: "85%" }}>
                We think you may like it because you have already appreciated many of{" "}
                <nobr style={{ fontWeight: "bold" }}>
                  {filmSelected && filmSelected.director}
                </nobr>
                's contents
              </div>
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth:"85%"
          }}
        >
          <Card
          className="cardInfo"
            style={{
              backgroundColor: "rgba(146, 160, 197, .6)",
              borderRadius: "15px",
              color: "black",
              maxWidth: "90%"
            }}
          >
            <Card.Body
              // className="text-left"
              style={{
                fontSize: "18px",
                borderRadius: "7px",minWidth: "70%", display: "flex", flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column",fontSize:"17px" }}>
                  DIRECTED BY
                  <nobr style={{ fontWeight: 600 ,fontSize:"20px",paddingRight:"8px"}}>
                    {filmSelected.director}
                  </nobr>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{fontWeight:"400"}}>{filmSelected.year}</span>
                  <nobr style={{paddingTop:"3px"}}>{filmSelected.duration} min </nobr>
                </div>
              </div>
              <hr style={{ width: "90%", marginBottom:"0.4rem", marginTop:"0.6rem" }} />
              <div>
                <p style={{ margin: "0", fontWeight:500, display:"flex",
                 flexDirection:"row", justifyContent:"center", alignItems:"center", flexWrap: "wrap" }}>

                  {filmSelected.genres.length > 0 &&
                    filmSelected.genres
                      .slice(0, -1)
                      .map((g) => (
                        <div  key={g.genre}>{g.genre},&nbsp;</div>
                      ))}
                  {filmSelected.genres.length > 0 &&
                    filmSelected.genres.at(-1).genre}
                </p>
              </div>
              {/*<div>
                <p style={{ margin: "0", display:"flex",
                 flexDirection:"row", justifyContent:"center", alignItems:"center", flexWrap: "wrap"  }}>
                  <span style={{fontWeight:"500"}}>Cast:&nbsp;</span>
                  {filmSelected.actors.length > 0 &&
                    filmSelected.actors.slice(0, -1).map((a) => (
                      <nobr key={a.surname}>
                        {a.name} {a.surname},&nbsp;{" "}
                      </nobr>
                    ))}
                  {filmSelected.actors.length > 0 &&
                    filmSelected.actors.at(-1).name}{" "}
                  {filmSelected.actors.length > 0 &&
                    filmSelected.actors.at(-1).surname}
                </p>
              </div>
                  */}
              <div style={{display: "flex",justifySelf:"center", alignSelf:"center",paddingTop:"0.5rem"}}>
                <img style={{margin:"0"}}
                  className="platformImage"
                  alt="platform logo"
                  src={
                    require("./../images/platforms/" +
                      filmSelected.platform).default
                  }
                />
              </div> 
            </Card.Body>
          </Card>
        </div>
      </div>

      <div  style={{
                paddingTop: "1rem",
                paddingBottom: "0rem",
                height: "10%",
                position: "fixed",
                bottom: "-4px",
                width: "100%",
                left:"0"
              }}>
      &nbsp;
          {isFilmLiked !== undefined && !isFilmLiked ? (
                <BsHeart
                  style={{ color: whiteFont,width:"25px",height:"25px" }}
                  onClick={() => likeFilm()}
                />
              ) : (
                <BsHeartFill
                  style={{ color: pinkFont,width:"25px",height:"25px" }}
                  onClick={() => unlikeFilm()}
                />
              )}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            id="standardButton"
            onClick={() => {
              setWatchModalVisible(true);
            }}
          >
            {" "}
            Watch Now
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link
            replace={true}
            to={{
              pathname: "/film",
              state: {
                filmSelected: filmSelected,
                watchingOnTelephone: watchingOnTelephone,
                skip: skip,
                filmList: filmList,
                comingFromSearchFlow: true,
              },
            }}
          >
            <Button id="standardButton">
              <AiOutlineSearch />
              Extras
            </Button>
          </Link>   </div>

    </>
    );
  };

  return (
    <>
      {isLoading ? (
        <>
          {
            <>
              {" "}
              <div className="text-center">
                <NavigationFilmSearched />
                <FilmSearchedComponent />
              </div>
              {watchModalVisible ? <WatchNowModal /> : <></>}
            </>
          }
        </>
      ) : (
        <div className="text-center">
          <Spinner
            className="text-center"
            animation="border"
            role="status"
          ></Spinner>
        </div>
      )}
    </>
  );
};

export default FilmSearched;
