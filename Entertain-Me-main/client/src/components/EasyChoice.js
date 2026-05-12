import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ArrowLeft,  House } from "react-bootstrap-icons";
import { Nav, Navbar, Row } from "react-bootstrap/";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FiSmartphone } from "react-icons/fi";
import { TbScreenShare } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import API from "../API";
import "./ComponentStyle.css";

const EasyChoice = (props) => {
  const [filmList, setFilmList] = useState([]);
  const [skip, setSkip] = useState(0);
  const [skipChanged,setSkipChanged] = useState(false)
  const [filmSelected, setFilmSelected] = useState();
  const [filmsLiked, setFilmsLiked] = useState([]);
  const [isFilmLiked, setIsFilmLiked] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [watchModalVisible, setWatchModalVisible] = useState(false);
  const [skipModalVisible, setSkipModalVisible] = useState(false);
  const [skipDirectorActive, setSkipDirectorActive] = useState(false);
  const [skipGenreActive, setSkipGenreActive] = useState(false);
  const [skipAlreadyWatchedActive, setSkipAlreadyWatchedActive] =
    useState(false);
  const [skipDirectorFilteredFilm, setSkipDirectorFilteredFilm] = useState([]);
  const [skipGenreFilteredFilm, setSkipGenreFilteredFilm] = useState([]);
  const [skipAlreadyWatchedFilteredFilm, setSkipAlreadyWatchedFilteredFilm] =
    useState([]);
  const [comingFromAnswerAndWatch, setComingFromAnswerAndWatch] =
    useState(false);
  const [skipCounter, setSkipCounter] = useState(0);
  const [filmSkippedList, setFilmSkippedList] = useState([]);

  const location = useLocation();

  const skipFilm = (goBack = false) => {
    let newIndex = 0;
    if (goBack) {
      setSkipCounter((old) => old - 1);
      setFilmSelected(filmSkippedList[filmSkippedList.length - 1]);
      setIsFilmLiked(() =>
        userLikesSelectedFilm(
          filmSkippedList[filmSkippedList.length - 1],
          filmsLiked
        )
      );
      setFilmSkippedList((old) => old.slice(0, -1));
    } else {
      setSkipCounter((old) => old + 1);
      newIndex = (skip + 1) % filmList.length;
      setFilmSkippedList((old) => [...old, filmSelected]);
      if (skip !== newIndex)
      {setSkip(newIndex);}
      else {
        setSkipChanged(old => !old)
      }
    }
  };

  const likeFilm = async () => {
    try {
      setIsFilmLiked((old) => !old);
      await API.addFilmLiked({
        film_id: filmList[skip].id,
        user_id: props.user.id,
        date: dayjs().toString(),
      });
      const filmsLikedResponse = await API.getFilmLiked(props.user.id);
      props.setSuccess("Added to your favourites!");
      setFilmsLiked(filmsLikedResponse);
    } catch (error) {
      setIsFilmLiked((old) => !old);
      props.handleErrors(error.message);
    }
  };

  const userLikesSelectedFilm = (selectedFilm, likedFilms) => {
    return (
      likedFilms?.filter((film) => film.film_id === selectedFilm.id).length !==
      0
    );
  };

  const unlikeFilm = async () => {
    try {
      setIsFilmLiked((old) => !old);
      await API.unlikeFilm(props.user.id, filmList[skip].id);
      const filmsLikedResponse = await API.getFilmLiked(props.user.id);
      props.setSuccess("Removed from your favourites!");
      setFilmsLiked(filmsLikedResponse);
    } catch (error) {
      setIsFilmLiked((old) => !old);
      props.handleErrors(error.message);
    }
  };

  const filtersFilms = (filmsList, durationFilter, genreFilter, kindFilter) => {
    if (durationFilter !== undefined) {
      filmsList = filmsList.filter(
        (f) =>
          f.duration >= durationFilter[0] && f.duration <= durationFilter[1]
      );
    }
    if (kindFilter !== undefined) {
      filmsList = filmsList.filter((f) => f.kind === kindFilter);
    }
    if (genreFilter !== undefined) {
      filmsList = filmsList.filter((f) => f.feeling === genreFilter);
    }
    return filmsList;
  };

  const skipGenreFilterActivated = (filterActive) => {
    // remove films that has the genres of the current film
    if (filterActive) {
      const genresToSkip = filmList[skip].genres.map((g) => g.genre);
      const newFilmList = filmList.filter(
        (film) =>
          !film.genres
            .map((g) => g.genre)
            .some((genre) => genresToSkip.includes(genre))
      );
      if (newFilmList.length > 0) {
        setSkipGenreFilteredFilm(
          filmList.filter((film) =>
            film.genres
              .map((g) => g.genre)
              .some((genre) => genresToSkip.includes(genre))
          )
        );
        setFilmList(newFilmList);
      } else {
        alert(
          "If you select this filter then no contents are available according to your filter parameters"
        );
        setSkipGenreActive((old) => !old);
      }
    } else {
      setFilmList((old) => [...old, ...skipGenreFilteredFilm]);
      setSkipGenreFilteredFilm([]);
    }
  };

  const alreadyWatchedFilter = (filterActive) => {
    if (filterActive) {
      const newFilmList = filmList.filter(
        (film) => film.name !== filmList[skip].name
      );
      if (newFilmList.length > 0) {
        setSkipAlreadyWatchedFilteredFilm(
          filmList.filter((film) => film.name === filmList[skip].name)
        );
        setFilmList(newFilmList);
      } else {
        alert(
          "If you select this filter then no contents are available according to your filter parameters"
        );
        setSkipAlreadyWatchedActive((old) => !old);
      }
    } else {
      setFilmList((old) => [...old, ...skipAlreadyWatchedFilteredFilm]);
      setSkipDirectorFilteredFilm([]);
    }
  };

  const skipDirectorFilterActivated = (filterActive) => {
    // remove films that has the genres of the current film
    if (filterActive) {
      const newFilmList = filmList.filter(
        (film) => film.director !== filmList[skip].director
      );
      if (newFilmList.length > 0) {
        setSkipDirectorFilteredFilm(
          filmList.filter((film) => film.director === filmList[skip].director)
        );
        setFilmList(newFilmList);
      } else {
        alert(
          "If you select this filter then no contents are available according to your filter parameters"
        );
        setSkipDirectorActive((old) => !old);
      }
    } else {
      setFilmList((old) => [...old, ...skipDirectorFilteredFilm]);
      setSkipDirectorFilteredFilm([]);
    }
  };

  function shuffleArray(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  useEffect(() => {
    async function callApi() {
      setComingFromAnswerAndWatch(location.state && location.state.discover);
      try {
        if (location.state && location.state.filmSkippedList) {
          let filmsResponse = await API.getFilmList();
          const durationFilter = location.state
            ? location.state.durationFilter
            : undefined;
          const genreFilter = location.state
            ? location.state.genreFilter
            : undefined;
          const kindFilter = location.state
            ? location.state.kindFilter
            : undefined;
          const skippedFilms = location.state.filmSkippedList;
          setFilmSkippedList(skippedFilms.slice(0, -1));
          setSkipCounter(skippedFilms.length - 1);
          filmsResponse = filtersFilms(
            filmsResponse,
            durationFilter,
            genreFilter,
            kindFilter
          );
          if (filmsResponse.length > 0) {
            filmsResponse = shuffleArray(filmsResponse);
            setFilmList(filmsResponse);
            setFilmSelected(skippedFilms[skippedFilms.length - 1]);
            const filmsLikedResponse = await API.getFilmLiked(props.user.id);
            setFilmsLiked(filmsLikedResponse);
            setIsFilmLiked(() =>
              userLikesSelectedFilm(
                skippedFilms[skippedFilms.length - 1],
                filmsLikedResponse
              )
            );
            setIsLoading((old) => !old);
          } else {
            props.handleErrors(
              "No content to show! please go back to the previous page"
            );
          }
        } else {
          let filmsResponse = await API.getFilmList();
          const durationFilter = location.state
            ? location.state.durationFilter
            : undefined;
          const genreFilter = location.state
            ? location.state.genreFilter
            : undefined;
          const kindFilter = location.state
            ? location.state.kindFilter
            : undefined;

          filmsResponse = filtersFilms(
            filmsResponse,
            durationFilter,
            genreFilter,
            kindFilter
          );
          if (filmsResponse.length > 0) {
            filmsResponse = shuffleArray(filmsResponse);
            setFilmList(filmsResponse);
            setFilmSelected(filmsResponse[skip]);
            const filmsLikedResponse = await API.getFilmLiked(props.user.id);
            setFilmsLiked(filmsLikedResponse);
            setIsFilmLiked(() =>
              userLikesSelectedFilm(filmsResponse[skip], filmsLikedResponse)
            );
            setIsLoading((old) => !old);
          } else {
            props.handleErrors(
              "No content to show! please go back to the previous page"
            );
          }
        }
      } catch (error) {
        props.handleErrors(error.message);
      }
    }
    callApi();
  }, []);

  useEffect(() => {
    try {
      if (filmList[skip] !== undefined) {
        setFilmSelected(filmList[skip]);
        setIsFilmLiked(() => userLikesSelectedFilm(filmList[skip], filmsLiked));
      }
    } catch (error) {
      props.handleErrors(error.message);
    }
  }, [skip,skipChanged]);

  const whiteFont = "#E9EFF0";
  const pinkFont = "#bb2a8d";
  const backgroundBlue = "#2496bf";

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
                    filmSkippedList: [...filmSkippedList, filmSelected],
                  },
                }}
              >
                <Button className="btnWatchNow" >
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
                    filmSkippedList: [...filmSkippedList, filmSelected],
                  },
                }}
              >
                <Button className="btnWatchNow" >
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

  const SkipModal = () => {
    return (
      <Modal
        className="text-center"
        style={{ paddingTop: "10rem" }}
        show
        onHide={() => {
          setSkipModalVisible(false);
        }}
        animation={false}
      >
        <Modal.Header closeButton style={{backgroundColor: whiteFont }}>
          <Modal.Title style={{paddingLeft:"25px",fontWeight:"600"}}>What's the issue with this content?</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body style={{backgroundColor: whiteFont}}>
            <div>
              <div>
                <Button
                 className="btnSkip"
                 style={{
                   fontSize: 20,
                   backgroundColor: skipGenreActive && "#3E546D",
                   color: skipGenreActive && whiteFont
                 }}
                 onClick={() => {
                   setSkipGenreActive((old) => !old);
                   skipGenreFilterActivated(!skipGenreActive);
                 }}
               >
                 {" "}
                 Genre
               </Button>
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <Button
                  className="btnSkip"
                  style={{
                    fontSize: 20,
                    backgroundColor: skipDirectorActive && "#3E546D",
                    color: skipDirectorActive && whiteFont
                  }}
                  onClick={() => {
                    skipDirectorFilterActivated(!skipDirectorActive);
                    setSkipDirectorActive((old) => !old);
                  }}
                >
                  {" "}
                  Director
                </Button>
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <Button
                className="btnSkip"
                  style={{
                    fontSize: 20,
                    backgroundColor: skipAlreadyWatchedActive && "#3E546D",
                    color: skipAlreadyWatchedActive && whiteFont
                  }}
                  onClick={() => {
                    setSkipAlreadyWatchedActive((old) => !old);
                    alreadyWatchedFilter(!skipAlreadyWatchedActive);
                  }}
                >
                  {" "}
                  Already watched
                </Button>
              </div>
            </div>
            <hr style={{width:"90%"}}></hr>
            {skipDirectorActive ||
            skipAlreadyWatchedActive ||
            skipGenreActive ? (
              <div >
                <Button className="btnOk"
                  
                  onClick={() => {
                    setSkipModalVisible(false);
                  }}
                >
                  {" "}
                  Cancel
                </Button>
                &nbsp;
                &nbsp;
                &nbsp;
                <Button className="btnOk"
                  
                  style={{ fontSize: 20 }}
                  onClick={() => {
                    skipFilm();
                    setSkipAlreadyWatchedActive(false);
                    setSkipDirectorActive(false);
                    setSkipGenreActive(false);
                    setSkipModalVisible(false);
                  }}
                >
                  {" "}
                  Ok
                </Button>
              </div>
            ) : (
              <div >
                <Button
                 className="btnOk"

                  onClick={() => {
                    setSkipModalVisible(false);
                  }}
                >
                  {" "}
                  Cancel
                </Button>
                &nbsp;
                &nbsp;
                &nbsp;
              
                <Button
                  className="btnOk"
                  onClick={() => {
                    skipFilm();
                    setSkipAlreadyWatchedActive(false);
                    setSkipDirectorActive(false);
                    setSkipGenreActive(false);
                    setSkipModalVisible(false);
                  }}
                >
                  {" "}
                  Skip
                </Button>
              </div>
            )}
            <div></div>
          </Modal.Body>
        </Form>
      </Modal>
    );
  };
  const EasyChoiceNavbar = () => {
    return (
      <Navbar style={{ fontSize: 30, color: whiteFont}} fixed="top">
        <Navbar.Toggle aria-controls="left-sidebar" />
        {skipCounter === 0 ? (
          <Link className="link" to={{ pathname: "/" }}>
            <ArrowLeft style={{ color: "#E9EFF0", height:"30px",width:"30px"}} />
          </Link>
        ) : (
          <>
            <ArrowLeft style={{ color: "#E9EFF0", height:"30px",width:"30px"}} onClick={() => skipFilm(true)} />
          </>
        )}

        <Form
          inline
          style={{ color: whiteFont, fontWeight: "bold" }}
          className="my-2 my-lg-0 mx-auto d-block"
          action="#"
          role="search"
          aria-label="Quick search"
        >
          {comingFromAnswerAndWatch === true
            ? "Answer and watch"
            : "Easy choice"}
        </Form>
        <Nav className="justify-content-end">
          <Form inline className="mx-2">
            <Link className="link" to={{ pathname: "/" }}>
              <House style={{ color: whiteFont }} />
            </Link>
          </Form>
        </Nav>
      </Navbar>
    );
  };

  return (
    <>
      <Row>
        <EasyChoiceNavbar />
      </Row>
      <div
        className="text-center"
        style={{
          fontSize: 25,
          paddingTop: "1rem",
          marginTop: "3rem",
          overflow: "hidden",
        }}
      >
        {isLoading ? (
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
                We chose this movie because you have appreciated many of{" "}
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
                      borderRadius: "7px",minWidth: "70%", display: "flex", flexDirection: "column"
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
                    <>
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
                    </>
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

            <div
              style={{
                paddingTop: "0.5rem",
                paddingBottom: "0",
                height: "10%",
                position: "fixed",
                bottom: "9px",
                width: "100%",
              }}
            >
              {isFilmLiked !== undefined && !isFilmLiked ? (
                <BsHeart
                  style={{ color: whiteFont }}
                  onClick={() => likeFilm()}
                />
              ) : (
                <BsHeartFill
                  style={{ color: pinkFont }}
                  onClick={() => unlikeFilm()}
                />
              )}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                id="standardButton"
                style={{ backgroundColor: backgroundBlue }}
                onClick={() => {
                  setWatchModalVisible(true);
                }}
              >
                {" "}
                Watch Now
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                id="standardButton"
                style={{ backgroundColor: backgroundBlue }}
                onClick={() => setSkipModalVisible(true)}
              >
                Skip
              </Button>
            </div>

            {watchModalVisible ? <WatchNowModal /> : <></>}
            {skipModalVisible ? <SkipModal /> : <></>}
          </>
        ) : (
          <>
            <Spinner animation="border" role="status"></Spinner>
          </>
        )}
      </div>
    </>
  );
};

export default EasyChoice;
