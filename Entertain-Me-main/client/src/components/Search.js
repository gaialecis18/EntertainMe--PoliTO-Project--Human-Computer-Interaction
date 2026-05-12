import { useEffect, useState } from "react";
import { FormControl, Row } from 'react-bootstrap/';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import API from '../API';



const Search = (props) => {
    const [originalList, setOriginalList] = useState([])
    const [filmList, setFilmList] = useState([])

    useEffect(() => {
        async function callApi() {
            try {
                let filmsResponse = await API.getFilmList();
                setFilmList(filmsResponse)
                setOriginalList(filmsResponse)
            }
            catch (error) {
                props.handleErrors(error.message)
            }
        }
        callApi()

    }, [])

    

    return (
        <div >  
            <div className="text-center">
            <FormControl style={{borderRadius:"15px", border:"0px solid rgba(11, 30, 36, 1)"}}
                        type="search"
                        placeholder="Search a title"
                        className="mr-2"
                        aria-label="Search"
                        onChange={(ev) => {
                            if (ev.target.value !== ' ' && ev.target.value !== '') { setFilmList(filmList.filter(f => f.name.toLowerCase().includes(ev.target.value.toLowerCase()))) }
                            else {
                                setFilmList(originalList)
                            }
                        }}
                    />
            </div>
            <div className="text-center">
                
                    <Row style={{display:"flex",alignItems:"center",paddingBottom:"1.5rem", overflowY:"scroll"}}>
                {
                    filmList.map(film => {
                        return <Col key={film.id} xs={4}> <div key={film.id} style={{ paddingTop: "1rem" }}><Link replace={true} className="link"  to={{ pathname: "/film-searched", state: { filmSelected: film, comingFromSearchFlow: true } }} ><Card style={{border:"0px", background: "transparent"}}>
                            <Card.Img variant="top" style={{ width: "100%",borderRadius:"7px",boxShadow: "0px 10px 20px rgba(0,0,0,0.1)", }} src={require('./../images/posters/' + film.picture).default} />
                            
                        </Card></Link></div></Col>
                    })
                }
                </Row>
            
                </div>
        </div>
    )
}

export default Search;