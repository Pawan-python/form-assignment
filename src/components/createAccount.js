import {reduxForm,Field} from 'redux-form';
import fire from '../fire.js';
import {Link} from "react-router-dom";
import './login.css';


function Account(props){
    const {handleSubmit,reset}=props;
    function signUp(values){
      fire.auth().createUserWithEmailAndPassword(values['email'], values['password'])
    .then((userCredential) => {
      alert('account created');
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert('invalid: '+errorCode+' and '+errorMessage);
    });
    reset('account');
  }
    return(
        <div className="loginContainer">
            <form className="loginForm" onSubmit={handleSubmit(formValues=>signUp(formValues))}>
                <h2>Name</h2>
                <Field type="text" name="name" component="input"/>
                <h2>Email Id</h2>
                <Field type="email" name="email" component="input"/>
                <h2>Password</h2>
                <Field type="password" name="password" component="input"/>
                <button type="submit">Sign Up</button>
                <Link to='/'><button className="gotoButton">Go To Sign-In page</button></Link>
            </form>
        </div>
    )
}
var AccountPage = reduxForm({
        form:'account'
    })(Account)
export default AccountPage;