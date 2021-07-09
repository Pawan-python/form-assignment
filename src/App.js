import './App.css';
import Account from './components/createAccount';
import Login from './components/login';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
function App(props){
  return(
    <Router>
      <div className="App">
        <Switch>
          <Route path="/sign-up">
            <Account/>
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
)}
export default App;