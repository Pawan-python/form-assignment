import fire from '../fire.js';
import {reduxForm,Field} from 'redux-form';
import HomePage from './homePage';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import './login.css';

function Login(props){
    const {reset}=props;
    function signIn(values,props){
        fire.auth().signInWithEmailAndPassword(values['email'], values['password'])
        .then((userCredential) => {
            console.log(userCredential.user.email)
            reset('login')
        })
        .catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage);
      });
    }
    const [email,setEmail] = useState("");
    fire.auth().onAuthStateChanged((user) => {
        if (user) {
            document.getElementById("authorisedUser").style.display = "grid";
            document.getElementById("loginSection").style.display = "none";
            setEmail(user.email);
        } else {
            document.getElementById("loginSection").style.display = "flex"; 
            document.getElementById("authorisedUser").style.display = "none";
        }
    });
    const {handleSubmit}=props;
    return(<div>
        <div id='loginSection' className="loginContainer">
            <form className="loginForm" onSubmit={handleSubmit(formValues=>signIn(formValues,props))}>
                <h2>Email Id</h2>
                <Field type="email" name="email" component="input"/>
                <h2>Password</h2>
                <Field type="password" name="password" component="input"/>
                <div id="toggle">
                    <button type="submit">SignIn</button>
                </div>
                <Link to='/sign-up'><button className="gotoButton" >Go To Sign-Up Page</button></Link>
            </form>
        </div>
            <HomePage id="authorisedUser" email={email}/>
        </div>
    )
}
var LoginPage = reduxForm({
        form:'login'
    })(Login)
export default LoginPage;