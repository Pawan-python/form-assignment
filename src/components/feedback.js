import { reduxForm, Field } from 'redux-form';
import './feedback.css';
import fire from '../fire';
var isValid=true;
var alertStr="";
function fieldChanges(event,key){
  alertStr="";
  let text = event.target.value;
  switch(key){
    case 'FIRST_NAME':
      if(text.length>64)
      {
        alertStr="you have exceeding 64 character for First Name";
        isValid=false;
      }
      else{
        isValid=true;
      }
      break;
    case 'LAST_NAME':
      if(text.length>64)
      {
        alertStr="you have exceeding 64 character for Last Name";
        isValid=false;
      }else{
        isValid=true;
      }
      break;
    case 'EMAIL':
      isValid=true;        
      break;
    case 'MOBILE':
      if(text.length>13)
      {
        alertStr="you have exceeding limit for Mobile number";
        isValid=false;
      }
      else{
        isValid=true;
      }
      break;
    case 'COMMENT':
      if(text.length>200)
      {
        alertStr="you have exceeding 200 character for Comment";
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

function Feedback(props){
  const {handleSubmit}=props;
  const {reset} =props;
  function myHandleSubmit(formValues){
    alert((isValid)?"Thanks for feedback "+formValues["first_name"]:alertStr);
    //let userRef = fire.database().ref(formValues["first_name"]).orderByKey().limitToLast
    fire.database().ref(`feedback/${formValues["first_name"]}`).set({
      username: formValues["first_name"],
      lastname: formValues["last_name"],
      email:formValues["email"],
      mobile:formValues["mobile"],
      howknow:formValues["select"],
      comment:formValues["comment"],
    });
    reset('feedback');
  }
    return (
      <div className="feedbackContainer">
        <form className="form" onSubmit={handleSubmit(formValues=>myHandleSubmit(formValues))}>
          <h1>Feedback</h1>
          <label>First Name</label>
          <Field onChange={(event)=>fieldChanges(event,'FIRST_NAME')} type="text" name="first_name" component="input"></Field>
          <label>Last Name</label>
          <Field onChange={(event)=>fieldChanges(event,'LAST_NAME')} type="text" name="last_name" component="input"></Field>
          <label>Email Id</label>
          <Field onChange={(event)=>fieldChanges(event,'EMAIL')} type="email" name="email" component="input"></Field>
          <label>Mobile No</label>
          <Field onChange={(event)=>fieldChanges(event,'MOBILE')} type="number" name="mobile" component="input"></Field>
          <label>How did you hear about us?</label>
          <Field onChange={(event)=>fieldChanges(event,'HOW_DID_KNOW')} name="select" component="select" >
            <option>Select</option><option>By social media</option><option>By internet</option><option>By news paper</option>
          </Field>
          <label>Comment</label>
          <Field onChange={(event)=>fieldChanges(event,'COMMENT')} type="text" name="comment" component="input"></Field>
          <button type="submit">Submit</button>
        </form>
        </div>
    );
}
let FeedbackPage = reduxForm({
  // a unique name for the form
  form: 'feedback'
})(Feedback)
export default FeedbackPage;