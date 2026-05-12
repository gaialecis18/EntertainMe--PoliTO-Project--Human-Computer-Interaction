import { ArrowLeft, House } from 'react-bootstrap-icons';
import { Form, Nav, Navbar, Row } from 'react-bootstrap/';
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import API from '../API';
import "./ComponentStyle.css";


const whiteFont = "#E9EFF0";
const Profile = (props) => {

    const [filmList, setFilmList] = useState([]);
    const [filmsLiked, setFilmsLiked] = useState([])
    const [filmsWatched, setFilmsWatched] = useState([])
    const [isLoading, setIsLoading] = useState(false)




    useEffect(() => {
        async function callApi() {
            const response = await API.getFilmList();
            setFilmList(response)
            const filmsLikedResponse = await API.getFilmLiked(props.user.id)
            setFilmsLiked(filmsLikedResponse)
            const filmsWatchedResponse = await API.getFilmWatched(props.user.id)
            setFilmsWatched(filmsWatchedResponse)
            setIsLoading(old => !old)
        }
        callApi()


    }, [])

    const findCorrespondingFilmDate = (filmId, list) => {
        return list.filter(t => t.film_id === filmId)[0]?.date
    }

    const DisplayFavourites = () => {
        const favourites = filmList.filter(f => filmsLiked.map(fl => fl.film_id).includes(f.id))
            .map(f => {
                return {
                    date: findCorrespondingFilmDate(f.id, filmsLiked),
                    ...f,
                }
            }).sort((f1, f2) => { return dayjs(f1.date).isBefore(dayjs(f2.date)) ? 1 : (dayjs(f1.date).isAfter(dayjs(f2.date)) ? -1 : 0) })
        return (
            <div  style={{overflowX:"scroll"}}>

                <ListGroup horizontal style={{alignItems:"center",paddingBottom:"0.5rem"}}>{
                    favourites.map(film => {
                        return (
                            <ListGroup.Item className="cardUser" key={film.name}>
                                <Card className="cardUser">
                                    <img variant="top" style={{ borderRadius:"7px",height: "120px",objectFit:"contain" }} src={require('./../images/posters/' + film.picture).default} />
                                    {/*<Card.Body>
                                        <Card.Title>{film.name}</Card.Title>
                        </Card.Body>*/}
                                </Card>
                            </ListGroup.Item>

                        )
                    }



                    )
                }
                </ListGroup>
            </div>)

    }

    const DisplayHistory = () => {
        const history = filmList.filter(f => filmsWatched.map(fl => fl.film_id).includes(f.id))
            .map(f => {
                return {
                    date: findCorrespondingFilmDate(f.id, filmsWatched),
                    ...f,
                }
            }).sort((f1, f2) => { return dayjs(f1.date).isBefore(dayjs(f2.date)) ? 1 : (dayjs(f1.date).isAfter(dayjs(f2.date)) ? -1 : 0) })

        return (
            <div style={{overflowX:"scroll" }}>
                <ListGroup horizontal style={{alignItems:"center",paddingBottom:"0.5rem"}}>
                    {
                        history.map(film => {
                            return (
                                <ListGroup.Item className="cardUser" key={film.name}>
                                    <Card className="border-0 cardUser">
                                        <img variant="top " className='cardUser' style={{ borderRadius:"7px",height: "120px",objectFit:"contain" }} src={require('./../images/posters/' + film.picture).default} />
                                    
                                    </Card>
                                </ListGroup.Item>
                            )
                        })
                    }
                </ListGroup>
            </div>)

    }

    const DisplayPlatform = () => {
        let platforms = filmList.filter(f => filmsLiked.map(fl => fl.film_id).includes(f.id)).map(f => f.platform)
        platforms = platforms.filter((item,
            index) => platforms.indexOf(item) === index);
        return (
            <div style={{overflowX:"scroll" }}>
                <ListGroup horizontal style={{alignItems:"center",paddingBottom:"0.5rem"}}>{
                    platforms.map(p => {
                        return (
                            <ListGroup.Item className="cardUser" style={{padding:"8px"}} key={p}>
                                {
                                    <img style={{ height: '70px',objectFit:"contain", borderRadius: 50, alignItems:"center" }} alt="platform" src={require('./../images/platforms/' + p).default} />
                                }
                            </ListGroup.Item>
                        )
                    })
                }
                </ListGroup>
            </div>)

    }

    const DisplayGenres = () => {
        let genres = filmList.filter(f => filmsLiked.map(fl => fl.film_id).includes(f.id)).map(f => f.genres).flat().map(g => g.genre)
        genres = genres.filter((item,
            index) => genres.indexOf(item) === index);

        return (
            <div style={{overflowX:"scroll" }}>
                <ListGroup horizontal style={{alignItems:"center",paddingBottom:"0.5rem"}}>{
                    genres.map(g => {
                        return (
                            <ListGroup.Item style={{background:"transparent",border:"0px", padding:"12px", alignItems:"center"}} key={g} >
                                <Card className="border-0 cardExtra" style={{borderRadius:"20px", padding:"1rem"}}>
                                    

                                    
                                        <Card.Title style={{marginBottom:"0"}}>{g}</Card.Title>
                                    
                                </Card>
                            </ListGroup.Item>
                        )
                    })
                }
                </ListGroup>
            </div>)


    }
    const DisplayDirectors = () => {

        let directors = filmList.filter(f => filmsLiked.map(fl => fl.film_id).includes(f.id)).map(f => f.director)
        directors = directors.filter((item,
            index) => directors.indexOf(item) === index);
        return (
            <div style={{overflowX:"scroll" }}>
                <ListGroup horizontal style={{alignItems:"center",paddingBottom:"0.5rem"}}>{
                    directors.map(d => {
                        return (
                            <ListGroup.Item className="cardUser text-center" style={{padding:"5px"}} key={d}>
                                <Card className="border-0 cardUser text-center" style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                                <img style={{ height: '100px', width: '100px', borderRadius: 50 }} alt="director" src={require('./../images/users/' + props.user.picture).default} />
                                    <Card.Body>
                                        <Card.Title className="text-center" style={{color:whiteFont, minWidth:"88px", marginBottom:"0px"}}>{d}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </ListGroup.Item>

                        )
                    })
                }
                </ListGroup>
            </div>)


    }



    const DisplayActors = () => {

        let actors = filmList.filter(f => filmsLiked.map(fl => fl.film_id).includes(f.id)).map(f => f.actors).flat()
        actors = actors.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.surname === value.surname && t.name === value.name
            ))
        )

        return (
            <div style={{overflowX:"scroll" }}><ListGroup horizontal style={{alignItems:"center",paddingBottom:"0.5rem"}}>{
                actors.map(a => {
                    return (
<ListGroup.Item className="cardUser text-center" style={{padding:"5px"}} key={a.surname}>
                                <Card className="border-0 cardUser text-center" style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                                <img style={{ height: '100px', width: '100px', borderRadius: 50 }} alt="actor" src={require('./../images/users/' + props.user.picture).default} />
                                    <Card.Body>
                                        <Card.Title className="text-center" style={{color:whiteFont, minWidth:"88px"}}>{a.name} {a.surname}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </ListGroup.Item>   )
                })
            }</ListGroup>
            </div>)

    }

    const FixedNavbar = (props) => {
        return (
        <Navbar style={{ fontSize: 30 }} className="navSearch" fixed="top">
            <Navbar.Toggle aria-controls="left-sidebar" />
            <Navbar.Brand >
            <Link className='link' to={{ pathname: "/" }}><ArrowLeft style={{ color: "#E9EFF0", height:"30px",width:"30px"}} /></Link>
            </Navbar.Brand>
            <Form inline style={{ color: whiteFont, fontWeight: "bold" }} className="my-2 my-lg-0 mx-auto d-block" action="#" role="search" aria-label="Quick search">
                My account
            </Form>
            <Nav className="justify-content-end">
                <Form inline className="mx-2">
                    <Link className='link' to={{ pathname: "/" }}><House /></Link>
                </Form>
            </Nav>
        </Navbar>)
    }



    return (
        <div style={{ width:"100VW",height:"100VH",overflowX:"clip" }} >
            <Row>
                <FixedNavbar  user={props.user} />
            </Row>
            <div className="text-center" style={{ fontSize: 25, paddingTop: "2rem"}}>
                {isLoading ? <><div><img style={{ height: '100px', width: '100px', borderRadius: 50 }} alt="user" src={require('./../images/users/' + props.user.picture).default} /></div>
                    <div><h2 style={{ fontWeight: "bold",color:whiteFont }}>{props.user.username}</h2></div>

                    <div className="text-left" style={{ fontSize: 20, paddingTop: "2rem",paddingRight:"15px", paddingLeft:"15px" }}>
                       
                        <div><hr style={{border:"px solid #E9EFF0", marginBottom:"0.2rem", marginTop:"0.6rem", background:whiteFont}} />
                        <h4 style={{color:whiteFont}}>Favorites</h4></div>
                        <DisplayFavourites />
                        <div><hr style={{border:"px solid #E9EFF0", marginBottom:"0.2rem", marginTop:"0.6rem", background:whiteFont}} />
                        <h4 style={{ paddingTop: "0.5rem",color:whiteFont }}>History</h4></div>
                        <DisplayHistory />
                        <div><hr style={{border:"px solid #E9EFF0", marginBottom:"0.2rem", marginTop:"0.6rem", background:whiteFont}} />
                        <h4 style={{ paddingTop: "0.5rem" ,color:whiteFont}}>My Platforms</h4></div>
                        <DisplayPlatform />
                        <div><hr style={{border:"px solid #E9EFF0", marginBottom:"0.2rem", marginTop:"0.6rem", background:whiteFont}} />
                        <h4 style={{ paddingTop: "0.5rem" ,color:whiteFont}}>My favourite genres</h4></div>
                        <DisplayGenres />
                        <div><hr style={{border:"px solid #E9EFF0", marginBottom:"0.2rem", marginTop:"0.6rem", background:whiteFont}} />
                        <h4 style={{ paddingTop: "0.5rem" ,color:whiteFont}}>My favourite directors</h4></div>
                        <DisplayDirectors />
                        <div><hr style={{border:"px solid #E9EFF0", marginBottom:"0.2rem", marginTop:"0.6rem", background:whiteFont}} />
                        <h4 style={{ paddingTop: "0.5rem" ,color:whiteFont}}>My favourite actors</h4></div>
                        <DisplayActors />
                    </div>
                </> : <><Spinner animation="border" role="status">

                </Spinner></>}
            </div>

        </div>
    )
}






export default Profile;