import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {SwipeableDrawer,Button,List,Divider,ListItemIcon,ListItemText,ListItem} from '@material-ui/core';
import {AccountCircle,Train,Feedback,NotInterested} from '@material-ui/icons';
import fire from '../fire';
import FeedbackPage from './feedback';
import PersonalInfo from './personal';
import TicketPortal from './ticketPortal';
import './homePage.css';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function HomePage(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });
  const [tab,setTab] = React.useState("");
  function logout(){
    fire.auth().signOut().then(() => {
        alert(`${props.email} is logged out...`);
        setTab('');
      }).catch((error) => {
        alert(`something went wrong`);
      });
  }
  function didAction(key){
      switch(key){
          case 'Personal Details':
            setTab('PERSONAL');
            console.log(tab);
            break;
          case 'Train Ticket Portal':
            setTab('TICKET');
            console.log(tab);
            break;
          case 'Feedback Form':
            setTab('FEEDBACK');
            console.log(tab);
            break;
          default:
            console.log('do nothing');
            break;
      }
  }
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Personal Details', 'Train Ticket Portal', 'Feedback Form',].map((text, index) => (
          <ListItem onClick={()=>didAction(text)} button key={text}>
            <ListItemIcon>{(index === 0)? <AccountCircle />: (index===1)?<Train />: (index===2)?<Feedback/>: <NotInterested/>}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <Divider />
        <ListItem onClick={logout} button key='logout'>
           <ListItemIcon><NotInterested/></ListItemIcon>
           <ListItemText primary='Logout' />
        </ListItem>
      </List>
    </div>
  );
const togles = (
  <React.Fragment key={'left'}>
    <Button className="togle" variant="contained" color="inherit" onClick={toggleDrawer("left", true)}>|||</Button>
      <SwipeableDrawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}>
      {list('left')}
      </SwipeableDrawer>
  </React.Fragment>
)
 if(tab==='PERSONAL' ||tab===''){
  return(
    <div id='authorisedUser' className="container">
        {togles}
        <PersonalInfo/>
    </div>
)}
else if(tab==='TICKET'){
  return(
    <div id='authorisedUser' className="container">
        {togles}
        <TicketPortal/>
    </div>
)}
else if(tab==='FEEDBACK'){
  return(
    <div id='authorisedUser' className="container">
        {togles}
        <FeedbackPage/>
    </div>
)}
}