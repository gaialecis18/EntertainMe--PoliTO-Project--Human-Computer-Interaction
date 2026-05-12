import { useEffect, useState } from "react";
import { ArrowLeft, House } from 'react-bootstrap-icons';
import { Form, Nav, Navbar } from 'react-bootstrap/';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { Link, useLocation } from 'react-router-dom';
import API from '../API';

const whiteFont = "#E9EFF0";

const FilmExtras = (props) => {

  const [filmSelected, setFilmSelected] = useState()
  const backstage = [{id:1,picture:"B1.png",type:"Backstage 1"},{id:2,picture:"B2.png",type:"Backstage 2"},{id:3,picture:"B3.png",type:"Backstage 3"},{id:4,picture:"B4.png",type:"Backstage 4"}]
  const interview = [{id:1,picture:"I1.png",type:"Interview 1"},{id:2,picture:"I2.png",type:"Interview 2"},{id:3,picture:"I3.png",type:"Interview 3"},{id:4,picture:"I4.png",type:"Interview 4"}]
  const toread = [{id:1,picture:"R1.png",type:"Article 1"},{id:2,picture:"R2.png",type:"Article 2"},{id:3,picture:"R3.png",type:"Article 3"},{id:4,picture:"R4.png",type:"Article 4"}]
  const [isLoading, setIsLoading] = useState(false)
  const [isFilmLiked, setIsFilmLiked] = useState(undefined)
  const [comingFromSearchFlow,setComingFromSearchFlow] = useState(false)
  const [watchingOnTelephone,setWatchingOnTelephone] = useState(false)
  const [skip,setSkip] = useState(0)
  const [filmList,setFilmList] = useState(undefined)
  const location = useLocation();


  const userLikesSelectedFilm = (selectedFilm, likedFilms) => {
    return likedFilms?.filter(film => film.film_id === selectedFilm.id).length !== 0
  }



  useEffect(() => {
    async function callApi() {
      try {
        setFilmSelected(location.state ? location.state.filmSelected : undefined)
        setIsLoading(old => !old)
        const filmsLikedResponse = await API.getFilmLiked(props.user.id)
        setIsFilmLiked(() => userLikesSelectedFilm(location.state ? location.state.filmSelected : undefined, filmsLikedResponse))
        setComingFromSearchFlow(location.state && location.state.comingFromSearchFlow)
        setWatchingOnTelephone(location.state && location.state.watchingOnTelephone)
        setSkip(location.state && location.state.skip ? location.state.skip : 0)
        setFilmList(location.state && location.state.filmList ? location.state.filmList : undefined)
      }
      catch (error) {
        props.handleErrors(error.message)
      }
    }
    callApi()

  }, [])

  const RepresentList = (props) => {
    const { list } = props;
    return (
      <>
        <ListGroup horizontal >{
          list.map(t => {
            return (
              <ListGroup.Item key={t.id} className="cardExtra">
                <Link to="external-link" className="link"  > 
                <Card className="border-0 cardExtra" style={{display:"flex",alignItems:"center",justifyItems:"center"}} >
                  <Card.Img variant="top" style={{ width: "90px", height: "90px",marginBottom:"0.5rem" }} src={require('./../images/extras/' + t.picture).default}  />
                  <Card.Body  style={{padding:0,paddingBottom:"0.5rem" }} >
                    <nobr  style={{color:"rgb(11, 30, 36)",margin:"0", fontWeight:500}} >{t.type} </nobr>
                  </Card.Body>
                </Card>
                </Link>
              </ListGroup.Item>
            )
          })
        }</ListGroup>
      </>
    )

  }


  const NavigationFilmExtras = (props) => {


    return (
      <Navbar style={{ fontSize: 30, color:whiteFont }} className="navSearch" fixed="top" >
        <Navbar.Toggle aria-controls="left-sidebar" />
        <Navbar.Brand >
          { comingFromSearchFlow ? 
            <Link className="link" replace={true} to={{ pathname: "/film-searched", state: {  filmSelected: filmSelected, comingFromSearchFlow: true }}} ><ArrowLeft style={{ color: "#E9EFF0", height:"30px",width:"30px"}} /></Link>
            : <Link className="link" replace={true} to={{ pathname: "/watch-film",  state: { filmSelected: filmSelected, isFilmLiked: isFilmLiked, isFilmWatched: true, watchingOnTelephone:watchingOnTelephone, skip:skip, filmSkippedList:filmList } }}><ArrowLeft style={{ color: "#E9EFF0", height:"30px",width:"30px"}} /></Link>
          }
        </Navbar.Brand>
        <Form inline style={{ color: whiteFont, fontWeight: "bold" }} className="my-2 my-lg-0 mx-auto d-block" action="#" role="search" aria-label="Quick search">
          Extras
        </Form>
        <Nav className="justify-content-end">
          <Form inline className="mx-2">
            <Link className='link' to={{ pathname: "/" }}><House /></Link>
          </Form>
        </Nav>
      </Navbar>
    )
  }


  return (
    <><div className="text-center below-nav"  style={{ fontSize: 25,width:"100VW", }}>{isLoading ? <>

      <div><NavigationFilmExtras /></div>
      <hr style={{ width: "65%",border:"px solid #E9EFF0", marginBottom:"0rem", marginTop:"0.6rem", background:whiteFont}} />
      
      <div ><h3 style={{color:whiteFont,fontWeight:"500",padding:"0.6rem",paddingBottom:"0rem",fontStyle:"italic"}}>{filmSelected?.name}</h3></div>
      <div className="text-left" style={{ fontSize: 20, paddingTop: "0.7rem",paddingLeft:"15px",paddingRight:"15px" }}>
        <div><h4 style={{color:whiteFont,fontWeight:"400"}}>Backstage</h4></div>
        <div style={{overflowX:"scroll"}}><RepresentList list={backstage} key={1} /></div>
        <div><h4 style={{color:whiteFont,fontWeight:"400",paddingTop:"0.7rem"}}>Interview</h4></div>
        <div style={{overflowX:"scroll"}}><RepresentList list={interview} key={2}/></div>
        <div><h4 style={{color:whiteFont,fontWeight:"400",paddingTop:"0.7rem"}}>To Read</h4></div>
        <div style={{overflowX:"scroll"}}><RepresentList list={toread}  key={3}/></div>
      </div>
    </> : <><Spinner animation="border" role="status">

    </Spinner></>}</div></>
  )
}

export default FilmExtras;