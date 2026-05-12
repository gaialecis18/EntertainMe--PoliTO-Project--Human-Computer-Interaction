import { useState } from 'react';
import { ArrowRight } from 'react-bootstrap-icons';
import { Form } from 'react-bootstrap/';

const whiteFont = "#E9EFF0";
const Info = (props) => {

  const [advice, setAdvice] = useState('')

  const handleSubmit = () => {
    if (advice !== '') {
      props.handleSuccess("Advice sent!")
      setAdvice('')
    }
    else {
      props.handleErrors('Please fill the field!')
    }
  }




return (<>
<div className="absoluteImageInfoC">
            <img
              className="absoluteInfoI"
              alt="background"
              src={require("./../images/background/wave-haikei (16).svg").default}
            />
          </div>
  <div style={{ paddingTop:"15px"}} className="text-center" ><img className="infoPicture" alt="timer" src={require('./../images/EM_logo.png').default} /></div>

<div style={{ color: whiteFont, fontSize: 20, padding: "0.7rem 2rem 0.7rem 2rem"}}>
  <div className="text-center">
   <b>Entertain Me</b> is a service that uses artificial intelligence to recommend <nobr>movies, documentaries, and TV shows</nobr>
  </div>   
  <hr style={{ width: "85%",border:"px solid #E9EFF0", background:whiteFont}} />
    <ul style={{paddingInlineStart:"30px",paddingTop:"0.7rem"}}> 
      <li><b>Easy Choice </b>feature quickly suggests content based on your preferences and viewing history. </li>
      <li style={{paddingTop:"1rem"}}><b>Answer and Watch</b> feature guides you to personalized suggestions through questions. </li>
      <li style={{paddingTop:"1rem"}}><b>Discover</b> section enables manual exploration and searching for specific titles. </li>
    </ul> 
   {/*  It covers a wide range of content including movies, TV series and documentaries. Each content has extras to enhance the experience. 
    <br></br> 
    <div style={{paddingTop:"1rem"}}>
    Our main goal is to make it easy to find the perfect viewing option for any mood or occasion.
    </div> */}
</div> 

  <div className="text-center" style={{ fontSize: 25, fontWeight: "bold",color: whiteFont, paddingTop:"0.5rem", zIndex:"10",position:"relative"}}>Any Advice? </div>
  <div className="text-center" style={{ fontSize: 20,color: whiteFont,paddingBottom:"0.3rem",zIndex:"10",position:"relative" }}>Feel free to contact us </div>
  <div className="inputWithButton" style={{padding:" 0 1rem",borderRadius:"15px"}}>
    <Form className="text-center" style={{borderRadius:"15px"}}>
      <Form.Group>
        <Form.Control as='textarea' style={{height:"5rem", borderRadius:"15px",backgroundColor:whiteFont, border:"0px"}} value={advice} placeholder='It could be interesting if ...' onChange={(ev) => {setAdvice(ev.target.value)}} />
      </Form.Group>
      <ArrowRight className="inputWithButton-Button" onClick={() => { handleSubmit() }} />
    </Form>

  </div>

</>
)
}

export default Info;