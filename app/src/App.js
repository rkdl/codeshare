import React from 'react';
import firebase from 'firebase/app';
import {UserContext} from './store/User';

const handleGoogleLoginButtonClick = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
  await firebase.auth().signInWithPopup(provider);
};

const handleFacebookLoginButtonClick = async () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  await firebase.auth().signInWithPopup(provider);
};

const handleLogoutButtonClick = () => {
  firebase.auth().signOut();
};

function App(props){
  const userContext = React.useContext(UserContext);

  return (
    userContext.user 
      ? (
        <>
          <div>
            {userContext.user.displayName}
          </div>
          <div>
            {userContext.user.email}
          </div>
          <button
            onClick={handleLogoutButtonClick}
          >
            LOGOUT
          </button>
        </>
      )
      : (
        <>
          <button
            onClick={handleGoogleLoginButtonClick}
          >
            LOGIN WITH GOOGLE
          </button>
          <button
            onClick={handleFacebookLoginButtonClick}
          >
            LOGIN WITH FACEBOOK
          </button>
        </>
      )
  );
}

export default App;
