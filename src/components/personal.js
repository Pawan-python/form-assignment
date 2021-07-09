import { reduxForm, Field } from 'redux-form';
import MapContainer from './map';
//import fire from '../fire';
import './personal.css';
    
var isValid=true;
var alertStr="";
function fieldChanges(event,key){
    let text = event.target.value;
    alertStr="";
    
    switch(key){
      case 'FULL_NAME':
        if(text.length>255)
        {
          alertStr="you have exceeding 255 character for First Name";
          isValid=false;
        }
        else{
          isValid=true;
        }
        break;
      case 'PINCODE':
        if(text.length>6)
        {
          alertStr="you have exceeding limit for Pincode";
          isValid=false;
        }
        else{
          isValid=true;
        }
        break;
      case 'EMAIL':
        isValid=true;        
        break;
      case 'P_MOBILE':
        if(text.length>13)
        {
          alertStr="you have exceeding limit for primary Mobile number";
          isValid=false;
        }
        else{
          isValid=true;
        }
        break;
      case 'O_MOBILE':
        if(text.length>13)
        {
          alertStr="you have exceeding limit for Other Mobile number";
          isValid=false;
        }
        else{
          isValid=true;
        }
        break;
      case 'ADDRESS':
        if(text.length>500)
        {
          alertStr="you have exceeding 500 character for addess";
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
const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength255 = maxLength(255)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
const dob = value =>
  value && new Date(value)>new Date()?'You should select date before todays date':undefined
const maxLength6 = maxLength(6)
const phoneNumber = value => value && (value.length<10 || value.length>13) ? 'number length without country code should be 10 or 13 if country code ':undefined
const maxLength500 = maxLength(500)


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/><br/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>)



function PersonalInfo(props){
  const {handleSubmit}=props;
    /*function myHandleSubmit(formValues){
      alert((isValid)?"Submited Sucessfully "+formValues["full_name"]:alertStr);
      fire.database().ref(`personal_Info/${formValues["full_name"]}`).set({
        fullName: formValues["full_name"],
        dateOBirth: formValues["dob"],
        pincode:formValues["pincode"],
        gender:formValues["select"],
        email:formValues["email"],
        pMobile:formValues["pmobile"],
        oMobile:(formValues["omobile"])?(formValues["omobile"]):"not provided",
        address:formValues["address"],
      });
      reset('personal');
    }*/
      return (
        <div className="personalContainer">
          <form className="personalForm" onSubmit={handleSubmit}>
            <h1>Personal Details</h1>
            <label>Full Name</label>
            <Field onChange={(event)=>fieldChanges(event,'FULL_NAME')} component={renderField} validate={[required,maxLength255]} type="text" name="full_name" />
            <label>Date Of Birth</label>
            <Field onChange={(event)=>fieldChanges(event,'D_O_B')} type="date" name="dob" validate={[dob]} component={renderField}></Field>
            <label>Pincode</label>
            <Field onChange={(event)=>fieldChanges(event,'PINCODE')} type="number" name="pincode" validate={[maxLength6]} component={renderField}></Field>
            <label>Gender</label>
            <Field onChange={(event)=>fieldChanges(event,'GENDER')} name="select" component="select" >
            <option>Select</option><option>Male</option><option>Femail</option><option>Other</option>
            </Field>
            <label>Email Id</label>
            <Field onChange={(event)=>fieldChanges(event,'EMAIL')} validate={[required,email]} component={renderField} type="email" name="email" />
            <label>Primary Mobile No</label>
            <Field onChange={(event)=>fieldChanges(event,'P_MOBILE')} type="number" name="pmobile" validate={[required,phoneNumber]} component={renderField}></Field>
            <label>Other Mobile No</label>
            <Field onChange={(event)=>fieldChanges(event,'O_MOBILE')} type="number" name="omobile" component="input"></Field>
            <label>Address</label>
            <Field onChange={(event)=>fieldChanges(event,'ADDRESS')} type="text" name="address" validate={[required,maxLength500]} component={renderField}></Field>
            <button type="submit">Submit</button>
          </form>
          <MapContainer/>
        </div>
    )}
const Personal = reduxForm({
    form:'personal'
})(PersonalInfo);
export default Personal;