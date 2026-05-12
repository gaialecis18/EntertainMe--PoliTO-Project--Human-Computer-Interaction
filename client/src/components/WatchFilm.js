import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import dayjs from "dayjs";
import { ArrowLeft, House } from 'react-bootstrap-icons';
import { Form, Nav, Navbar } from 'react-bootstrap/';
import Spinner from 'react-bootstrap/Spinner';
import { AiFillStar, AiOutlineSearch, AiOutlineStar } from 'react-icons/ai';
import { BsFillShareFill, BsHeart, BsHeartFill } from 'react-icons/bs';
import { Link, useHistory, useLocation } from 'react-router-dom';
import API from '../API';
import "./ComponentStyle.css";
const whiteFont = "#E9EFF0";
const pinkFont = "#bb2a8d";
const backgroundBlue = "#2496bf";
const WatchFilm = (props) => {

    const [filmSelected, setFilmSelected] = useState()
    const [filmWatched, setFilmWatched] = useState(undefined)
    const [isFilmLiked, setIsFilmLiked] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const [watchingOnTelephone, setWatchingOnTelephone] = useState(true)
    const [rate, setRate] = useState(0)
    const [skip,setSkip] = useState(0)
    const [filmList,setFilmList] = useState(undefined)
    const [comingFromSearchFlow,setComingFromSearchFlow] = useState(false)
    const history = useHistory();
    const location = useLocation();

    const watchFilm = async () => {
        try {
            await API.addFilmWatched({
                film_id: filmSelected.id,
                user_id: props.user.id,
                date: dayjs().toString(),
                rate: 0
            })
            setFilmWatched(true)
        }
        catch (error) {
            props.handleErrors(error.message)
        }
    }

    const likeFilm = async () => {
        try {
            setIsFilmLiked(old => !old)
            await API.addFilmLiked({
                film_id: filmSelected.id,
                user_id: props.user.id,
                date: dayjs().toString()
            })
            props.setSuccess("Added to your favourites")
        }
        catch (error) {
            setIsFilmLiked(old => !old)
            props.handleErrors(error.message)
        }
    }

    const unlikeFilm = async () => {
        try {
            setIsFilmLiked(old => !old)
            await API.unlikeFilm(
                props.user.id, filmSelected.id)
            props.setSuccess("Removed from your favourites!")
        }
        catch (error) {
            setIsFilmLiked(old => !old)
            props.handleErrors(error.message)
        }
    }

    const rateFilm = async (rate) => {
        try {
            await API.addFilmWatched({
                film_id: filmSelected.id,
                user_id: props.user.id,
                date: dayjs().toString(),
                rate: rate
            })
            setRate(rate)
            props.setSuccess("Content correctly rated!")
        }
        catch (error) {
            props.handleErrors(error.message)
        }
    }

    useEffect(() => {
        async function callApi() {
            try {
                const filmsWatchedByUser = await API.getFilmWatched(props.user.id)
                if (filmsWatchedByUser && location.state && filmsWatchedByUser.filter(film => film.film_id === location.state.filmSelected.id).length > 0) {
                    setRate(filmsWatchedByUser.filter(film => film.film_id === location.state.filmSelected.id)[0].rate)
                }
                setFilmSelected(location.state ? location.state.filmSelected : undefined)
                setIsFilmLiked(location.state ? location.state.isFilmLiked : undefined)
                setFilmWatched(location.state ? location.state.isFilmWatched : false)
                setWatchingOnTelephone(location.state ? location.state.watchingOnTelephone : false)
                setSkip(location.state && location.state.skip ? location.state.skip : 0)
                setFilmList(location.state && location.state.filmSkippedList ? location.state.filmSkippedList : undefined)
                setComingFromSearchFlow(location.state && location.state.comingFromSearchFlow ? location.state.comingFromSearchFlow : false)
                setIsLoading(old => !old)

            }
            catch (error) {
                props.handleErrors(error.message)
            }
        }
        callApi()
    }, [])

    const NavigationWatch = () => {

        return (
            <Navbar style={{ fontSize: 30,color:whiteFont,background:"transparent" }} fixed="top">
                <Navbar.Toggle aria-controls="left-sidebar" />
                <Navbar.Brand onClick={() => setFilmWatched(false)}>
                    <ArrowLeft style={{ color: "#E9EFF0", height:"30px",width:"30px"}}/>
                </Navbar.Brand>
                <Form inline style={{ color: whiteFont, fontWeight: "bold" }} className="my-2 my-lg-0 mx-auto d-block" action="#" role="search" aria-label="Quick search">
                    Just Watched
                </Form>
                <Nav className="justify-content-end">
                    <Form inline className="mx-2">
                        <Link className='link' to={{ pathname: "/" }}><House /></Link>
                    </Form>
                </Nav>
            </Navbar>
        )
    }

    const NavigationUnWatch = () => {

        return (
            <Navbar style={{ fontSize: 30,color:whiteFont,background:"transparent"  }} fixed="top">
                <Navbar.Toggle aria-controls="left-sidebar" />
                <Navbar.Brand >
                    {comingFromSearchFlow ? <ArrowLeft style={{ color: "#E9EFF0", height:"30px",width:"30px"}} onClick={() => { history.goBack() }} /> : <Link className="link" to={{pathname:"easy-choice", state:{ filmSkippedList:filmList,  skip:skip} }} ><ArrowLeft style={{ color: "#E9EFF0", height:"30px",width:"30px"}} /></Link>}
                </Navbar.Brand>
                <Form inline style={{ color: whiteFont, fontWeight: "bold" }} className="my-2 my-lg-0 mx-auto d-block" action="#" role="search" aria-label="Quick search">
                Watch Now
                </Form>
                <Nav className="justify-content-end">
                    <Form inline className="mx-2">
                        <Link className='link' to={{ pathname: "/" }}><House /></Link>
                    </Form>
                </Nav>
            </Navbar>
        )
    }


    const FilmUnwatched = () => {
        return (<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",paddingTop:"30%"}}>
            {!watchingOnTelephone ?
                <> <div>  <h3 style={{color:whiteFont, padding:"0px 15px"}}>Connecting to smart TV</h3> </div> <div style={{ paddingTop:"3rem"}}><Spinner style={{color:whiteFont,width:"6rem", height:"6rem"}} animation="border"  ></Spinner></div></>
                : <> <div><h3 style={{color:whiteFont, padding:"0px 15px"}}>Opening "{filmSelected && filmSelected.name}" on {filmSelected && filmSelected.platform.split(".")[0]}</h3><div style={{ paddingTop:"3rem"}}> <Spinner  style={{color:whiteFont,width:"6rem", height:"6rem"}} animation="border" ></Spinner> </div >  </div></>}
            <div className="text-center" style={{ paddingTop: "3rem" }}><Button id="standardButton" style={{ fontSize: 20,backgroundColor:backgroundBlue}} onClick={() => watchFilm()}>Review and more</Button></div>
        </div>
        )

    }

    const FilmWatched = () => {
        return (<div className="text-center">
            <h3 style={{color: whiteFont,fontStyle: "italic"}}>{filmSelected?.name}</h3>
            <div><img style={{ alignSelf: 'center',height:"450px",objectFit: "contain", borderRadius:"7px" }} alt="movie poster" src={require('./../images/posters/' + filmSelected.picture).default} /></div>
            <div style={{ paddingTop: "2rem", fontSize: 40,color:whiteFont }}>
                {rate > 0 ? <AiFillStar onClick={() => { rateFilm(1) }} /> : <AiOutlineStar onClick={() => { rateFilm(1) }} />}
                {rate > 1 ? <AiFillStar onClick={() => { rateFilm(2) }} /> : <AiOutlineStar onClick={() => { rateFilm(2) }} />}
                {rate > 2 ? <AiFillStar onClick={() => { rateFilm(3) }} /> : <AiOutlineStar onClick={() => { rateFilm(3) }} />}
                {rate > 3 ? <AiFillStar onClick={() => { rateFilm(4) }} /> : <AiOutlineStar onClick={() => { rateFilm(4) }} />}
                {rate > 4 ? <AiFillStar onClick={() => { rateFilm(5) }} /> : <AiOutlineStar onClick={() => { rateFilm(5) }} />}

            </div>
            <div style={{
                paddingTop: "1rem",
                paddingBottom: "0rem",
                height: "10%",
                position: "fixed",
                bottom: "3.6rem",
                width: "100%",
                left:"0",
                

              }}>
            
                {isFilmLiked !== undefined && !isFilmLiked ? (
                <BsHeart
                  style={{ color: whiteFont,height:"25px",width:"25px" }}
                  onClick={() => likeFilm()}
                />
              ) : (
                <BsHeartFill
                  style={{ color: pinkFont,height:"25px",width:"25px"  }}
                  onClick={() => unlikeFilm()}
                />
              )}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link replace={true} to={{ pathname: "/film", state: { filmSelected: filmSelected, watchingOnTelephone: watchingOnTelephone, skip:skip, filmList:filmList } }}><Button id="standardButton" ><AiOutlineSearch />Extras</Button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button id="standardButton" disabled ><BsFillShareFill /></Button>
            </div>
        </div>
        )

    }


    return (
        <>{isLoading ? <>
            {
                filmWatched ? <><div className="text-center">
                    <NavigationWatch />
                </div><FilmWatched /></> : <> <div className="text-center"><NavigationUnWatch /><FilmUnwatched /></div></>
            }
        </> : <div className="text-center"><Spinner className="text-center" animation="border" role="status">

        </Spinner></div>}</>
    )
}



export default WatchFilm;