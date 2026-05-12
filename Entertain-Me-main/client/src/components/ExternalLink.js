
import Spinner from 'react-bootstrap/Spinner';
const whiteFont = "#E9EFF0";
const ExternalLink = () => {
  return (
    <div className="text-center" style={{ fontSize: 30, paddingTop: "15rem", color:whiteFont }}>

      <div>
      <h3 style={{color:whiteFont, padding:"0px 1.5rem"}}>You are being redirected to the extra content</h3>

      </div>
      
      

       <div className="text-center" style={{ paddingTop:"2rem"}}> <Spinner style={{color:whiteFont,width:"5rem", height:"5rem"}} animation="border" ></Spinner>  </div>
       {/*<div style={{ paddingTop:"1rem" }}><a href="https://www.youtube.com/watch?v=g7toqQCTsdA" target="_blank"><Button   id="standardButton" >Navigate</Button></a></div>*/}

    </ div>
  )
}

export default ExternalLink;