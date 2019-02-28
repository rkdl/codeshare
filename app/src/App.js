import React from 'react';
// import firebase from 'firebase/app';
// import {UserContext} from './store/User';
import { 
  Router, 
  Route, 
} from 'react-router';
import {createBrowserHistory} from 'history';
import MainScreen from './components/screens/Main';

const history = createBrowserHistory();

// const handleGoogleLoginButtonClick = async () => {
//   const provider = new firebase.auth.GoogleAuthProvider();
//   provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
//   await firebase.auth().signInWithPopup(provider);
// };

// const handleFacebookLoginButtonClick = async () => {
//   const provider = new firebase.auth.FacebookAuthProvider();
//   await firebase.auth().signInWithPopup(provider);
// };

// const handleLogoutButtonClick = () => {
//   firebase.auth().signOut();
// };

function App(props){
  return (
    <Router history={history}>
      <Route path="/" component={MainScreen}/>
    </Router>
  );
}

export default App;
