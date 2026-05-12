import { React, useState } from 'react';
import { Button } from "react-bootstrap";
import { ArrowLeft, House } from 'react-bootstrap-icons';
import { Form, Nav, Navbar, Row } from 'react-bootstrap/';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import './ComponentStyle.css'



const Discover = (props) => {

    const history = useHistory();


    const handleBackNavigation = (param) => {
        switch (param) {
            case 0:
                return history.replace("/");
            case 1:
                return setSelectionStep(0);
            case 2:
                return setSelectionStep(1);
            case 3:
                return setSelectionStep(2);
            default:
                break;

        }

    }

    const NavigationDiscover = (props) => {


        return (
            <Navbar style={{ fontSize: 30 }} bg="transparent" fixed="top">
                <Navbar.Toggle aria-controls="left-sidebar" />
                <Navbar.Brand onClick={() => handleBackNavigation(selectionStep)}>
                    <ArrowLeft style={{ color: "#E9EFF0", height:"30px",width:"30px"}}/>
                </Navbar.Brand>
                <Form inline style={{ color: "#E9EFF0", fontWeight: "bold" }} className="my-2 my-lg-0 mx-auto d-block" action="#" role="search" aria-label="Quick search">
                    Answer and Watch
                </Form>
                <Nav className="justify-content-end">
                    <Form inline className="mx-2">
                        <Link className='link' to={{ pathname: "/" }}><House /></Link>
                    </Form>
                </Nav>
            </Navbar>
        )
    }

    const renderSwitch = (param) => {
        switch (param) {
            case 0:
                return <Genre />;
            case 1:
                return <Kind />;
            case 2:
                return durationRender();
            case 3:
                return <Redirect to={{ pathname: "/easy-choice", state: {discover:true, durationFilter: durationFilter, genreFilter: genreFilter, kindFilter: kindFilter } }} />;
            default:
                break;
        }
    }

    const Genre = () => {
        return (
            <>
                <div className='question'><h3 style={{paddingBottom:"33px"}}>How are you feeling?</h3></div>
                <div><Card className='text-center' style={{ marginLeft:"auto",marginRight:"auto", width: "210px", height: "210px", background:"transparent", border:"0px" }}>
                  <Card.Img variant="top" style={{ marginTop:"auto", marginLeft:"auto",marginRight:"auto",width: "200px", height: "200px",marginBottom:"1em" }} src={require('./../images/icons/mood.gif').default}  />
                </Card>
                </div>
                <div style={{ padding: "0.8rem",paddingBottom:"1.1rem",paddingTop:"2.5rem"   }}><Button id='answer'  

                onClick={() => {
                    setSelectionStep(old => old + 1)
                    setGenreFilter('happy')
                }}
                
                >Happy</Button></div>
                <div style={{ padding: "0.8rem",paddingBottom:"1.1rem"}}><Button id='answer' 
                 onClick={() => {
                    setSelectionStep(old => old + 1)
                    setGenreFilter('sad')
                }}>Sad</Button></div>
                <div style={{ padding: "0.8rem",paddingBottom:"1.1rem" }}><Button id='answer' 
                onClick={() => {
                    setSelectionStep(old => old + 1)
                    setGenreFilter('bored')
                }}>Bored</Button></div>
                <div style={{ padding: "0.8rem",paddingBottom:"1.1rem" }}><Button id='answer'  onClick={() => {
                    setSelectionStep(old => old + 1)
                }}>None</Button></div>
            </>
        )
    }

    const Kind = () => {
        return (
            <>
                <div className='question'><h3 style={{fontSize:"15"}}>What do you want to watch?</h3></div>
                <div><Card className='text-center' style={{ marginLeft:"auto",marginRight:"auto", width: "210px", height: "210px", background:"transparent", border:"0px" }}>
                  <Card.Img variant="top" style={{ marginTop:"auto", marginLeft:"auto",marginRight:"auto",width: "200px",height: "200px",marginBottom:"1em" }} src={require('./../images/icons/clapperboard.gif').default}  />
                </Card>
                </div>
                <div style={{ padding: "0.8rem",paddingBottom:"1.1rem",paddingTop:"2.5rem" }}><Button id='answer' onClick={() => {
                    setSelectionStep(old => old + 1)
                    setKindFilter('series')
                }}>TV series</Button></div>
                <div style={{ padding: "0.8rem",paddingBottom:"1.1rem" }}><Button id='answer'  onClick={() => {
                    setSelectionStep(old => old + 1)
                    setKindFilter('movie')
                }}>Movie</Button></div>
                <div style={{ padding: "0.8rem",paddingBottom:"1.1rem" }}><Button id='answer'  onClick={() => {
                    setSelectionStep(old => old + 1)
                    setKindFilter('documentary')
                }}>Documentary</Button></div>
                <div style={{ padding: "0.8rem",paddingBottom:"1.1rem" }}><Button id='answer' onClick={() => {
                    setSelectionStep(old => old + 1)
                }}>Surprise me!</Button></div>
            </>
        )
    }

    const DurationMovies = () => {
        return (
            <>
                <div className='question'><h3 style={{fontSize:"15"}} >How long should it last?</h3></div>
                <div><Card className='text-center' style={{ marginLeft:"auto",marginRight:"auto", width: "210px", height: "210px", background:"transparent", border:"0px" }}>
                  <Card.Img variant="top" style={{marginTop:"auto", marginLeft:"auto",marginRight:"auto",width: "200px",height: "200px",marginBottom:"1em" }} src={require('./../images/icons/hourglass.gif').default}  />
                </Card>
                </div>
                <div style={{ padding: "0.8rem",paddingBottom:"1.1rem",paddingTop:"2.5rem" }}><Button id='answer'  onClick={() => {
                    setSelectionStep(old => old + 1)
                    setDurationFilter([0, 90])
                }}>Less than 90 min</Button></div>
                <div style={{ padding: "0.8rem",paddingBottom:"1.1rem" }}><Button id='answer'  onClick={() => {
                    setSelectionStep(old => old + 1)
                    setDurationFilter([90, 120])
                }}>Between 90 min and 2h</Button></div>
                <div style={{ padding: "0.8rem",paddingBottom:"1.1rem" }}><Button id='answer'  onClick={() => {
                    setSelectionStep(old => old + 1)
                    setDurationFilter([120, 500])
                }}>More than 2h</Button></div>
                <div style={{ padding: "0.8rem",paddingBottom:"1.1rem" }}><Button id='answer' onClick={() => {
                    setSelectionStep(old => old + 1)
                }}>Surprise me!</Button></div>
            </>
        )
    }

    const DurationDocumentary = () => {
        return (
            <>
                <div className='question'><h3 style={{fontSize:"15"}}>How long should it last?</h3></div>
                <div><Card className='text-center' style={{ marginLeft:"auto",marginRight:"auto", width: "210px", height: "210px", background:"transparent", border:"0px" }}>
                  <Card.Img variant="top" style={{ marginTop:"auto", marginLeft:"auto",marginRight:"auto",width: "200px",height: "200px",marginBottom:"1em" }} src={require('./../images/icons/hourglass.gif').default}  />
                </Card>
                </div>
                <div style={{ padding: "0.8rem",paddingBottom:"1.1rem",paddingTop:"2.5rem" }}><Button id='answer' onClick={() => {
                    setSelectionStep(old => old + 1)
                    setDurationFilter([0, 60])
                }}>Less than 60 min</Button></div>
                <div style={{ padding: "0.8rem",paddingBottom:"1.1rem" }}><Button id='answer' onClick={() => {
                    setSelectionStep(old => old + 1)
                    setDurationFilter([60, 90])
                }}>Between 60 and 90 min</Button></div>
                <div style={{ padding: "0.8rem",paddingBottom:"1.1rem" }}><Button id='answer' onClick={() => {
                    setSelectionStep(old => old + 1)
                    setDurationFilter([90, 500])
                }}>More than 90 min</Button></div>
                <div style={{ padding: "0.8rem",paddingBottom:"1.1rem" }}><Button id='answer' onClick={() => {
                    setSelectionStep(old => old + 1)
                }}>Surprise me</Button></div>
            </>
        )
    }

    const DurationSeries = () => {
        return (
            <>
                <div className='question'><h3 style={{fontSize:"15"}}>How long should it last?</h3></div>
                <div><Card className='text-center' style={{ marginLeft:"auto",marginRight:"auto", width: "210px", height: "210px", background:"transparent", border:"0px"}}>
                  <Card.Img variant="top" style={{marginTop:"auto", marginLeft:"auto",marginRight:"auto",width: "200px",height: "200px",marginBottom:"1em" }} src={require('./../images/icons/hourglass.gif').default}  />
                </Card>
                </div>
                <div style={{ padding: "0.8rem",paddingBottom:"1.1rem",paddingTop:"2.5rem" }}><Button id='answer' onClick={() => {
                    setSelectionStep(old => old + 1)
                    setDurationFilter([0, 30])
                }}>Less than 30 min</Button></div>
                <div style={{ padding: "0.8rem",paddingBottom:"1.1rem" }}><Button id='answer'  onClick={() => {
                    setSelectionStep(old => old + 1)
                    setDurationFilter([30, 40])
                }}>Between 30 and 40 min</Button></div>
                <div style={{ padding: "0.8rem",paddingBottom:"1.1rem" }}><Button id='answer'  onClick={() => {
                    setSelectionStep(old => old + 1)
                    setDurationFilter([40, 500])
                }}>Between 40 and 60 min</Button></div>
                <div style={{ padding: "0.8rem",paddingBottom:"1.1rem" }}><Button id='answer' onClick={() => {
                    setSelectionStep(old => old + 1)
                }}>Surprise me!</Button></div>
            </>
        )
    }

    const durationRender = () => {
        switch (kindFilter) {
            case "movie":
                return <DurationMovies />
            case "series":
                return <DurationSeries />
            case "documentary":
                return <DurationDocumentary />
            default:
                return <DurationMovies />
        }
    }



    const [selectionStep, setSelectionStep] = useState(0)
    const [genreFilter, setGenreFilter] = useState(undefined)
    const [durationFilter, setDurationFilter] = useState(undefined)
    const [kindFilter, setKindFilter] = useState(undefined)
    return (
        <>
            <Row><NavigationDiscover /></Row>
            <div className="text-center" style={{padding:"1rem 2rem"}}><div><ProgressBar style={{borderRadius:"2rem"}} now={selectionStep * 40} visuallyhidden="true" /></div>
                <div style={{ paddingTop: "2rem",display:"flex",flexDirection:"column",justifyContent:"center" }}>
                    {
                     renderSwitch(selectionStep)
                    }
                </div>
            </div>
        </>
    )
}

export default Discover;