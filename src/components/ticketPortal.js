import { reduxForm, Field } from 'redux-form';
import fire from '../fire';
import './feedback.css';
var isValid=true;
var alertStr="";
var dateOfJourney="";
var arrivalDate="";
function fieldChanges(event,key){
  alertStr='';
  let text = event.target.value;
  switch(key){
    case 'SOURCE':
      if(text.length>64)
      {
        alertStr="you have exceeding 64 character for source";
        isValid=false;
      }
      else{
        isValid=true;
      }
      break;
    case 'DESTINATION':
      if(text.length>64)
      {
        alertStr="you have exceeding 64 character for destination";
        isValid=false;
      }else{
        isValid=true;
      }
      break;
    case 'D_O_JOURNEY':
      dateOfJourney = new Date(text);
      isValid=true;
      break;
    case 'D_TIME':
      dateOfJourney = new Date(`${dateOfJourney.getMonth()+1}/${dateOfJourney.getDate()}/${dateOfJourney.getFullYear()} ${text}`);
      if(dateOfJourney<new Date())
      {
        alertStr="You should not select journey date & time before todays date & time";
        isValid=false;
      }
      else{
        isValid=true;
      }
      break;
    case 'A_DATE':
      arrivalDate=new Date(text);
      isValid=true;
      break;
    case 'A_TIME':
      arrivalDate = new Date(`${arrivalDate.getMonth()+1}/${arrivalDate.getDate()}/${arrivalDate.getFullYear()} ${text}`);
      if(dateOfJourney>arrivalDate)
      {
        alertStr="You should not select arrival date & time before journey date";
        isValid=false;
      }else{
        isValid=true;
      }      
      break;
    case 'TRAIN_FARE':
      const patt = /^[0-9]*\.[0-9]{3}/;
      if(patt.test(text))
      {
        alertStr="enter valid ammount e.g : 49.20";
        isValid=false;
      }
      else{
        isValid=true;
      }
      break;
    default:
      console.log("do nothing");
      break;
  }
  if(!isValid)
  alert(alertStr);
}

function TicketPortal(props){
  const {handleSubmit,reset}=props;
  function myHandleSubmit(formValues){
    alert((isValid)?"Information submited sucessfully":alertStr);
    fire.database().ref(`ticketPortal/${formValues["source"]}To${formValues["destination"]}`).set({
      source: formValues["source"],
      destination: formValues["destination"],
      JourneyDateAndTime:""+dateOfJourney,
      arrivalDateAndTime:""+arrivalDate,
      noOfPassengers:formValues["passengers"],
      trainFare:formValues["train_fare"],
    });
    reset('ticket');
  }
    return (
      <div className="feedbackContainer">
        <form className="form" onSubmit={handleSubmit(formValues=>myHandleSubmit(formValues))}>
          <h1>Ticket Portal</h1>
          <label>Source</label>
          <Field onChange={(event)=>fieldChanges(event,'SOURCE')} type="text" name="source" component="input"></Field>
          <label>Destination</label>
          <Field onChange={(event)=>fieldChanges(event,'DESTINATION')} type="text" name="destination" component="input"></Field>
          <label>Date Of Journey</label>
          <Field onChange={(event)=>fieldChanges(event,'D_O_JOURNEY')} type="date" name="doj" component="input"></Field>
          <label>Departure Time</label>
          <Field onChange={(event)=>fieldChanges(event,'D_TIME')} type="time" name="d_time" component="input"></Field>
          <label>Arrival Date & Time</label>
          <Field onChange={(event)=>fieldChanges(event,'A_DATE')} placeholder="Arrival Date" type="date" name="a_date" component="input"></Field>
          <Field onChange={(event)=>fieldChanges(event,'A_TIME')} placeholder="Arrival time" type="time" name="a_time" component="input"></Field>
          <label>Number Of Passengers</label>
          <Field onChange={(event)=>fieldChanges(event,'PASSENGERS')} type="number" name="passengers" component="input"></Field>
          <label>Train Fare</label>
          <Field onChange={(event)=>fieldChanges(event,'TRAIN_FARE')} type="number" placeholder="$" name="train_fare" component="input"></Field>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
}
let TicketPage = reduxForm({
  // a unique name for the form
  form: 'ticket'
})(TicketPortal)
export default TicketPage;