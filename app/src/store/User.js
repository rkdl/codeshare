import React from 'react';

const UserContext = React.createContext();

const loginUserAPI = async params => {
  return await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json',
    },
  }).then(resp => resp.json());
};

const getStatistics = async () => {
  return await fetch('/api/texts/user_statistics', {
    method: 'POST',
    body: JSON.stringify(),
    headers: {
      'Content-type': 'application/json',
    },
    credentials: 'include',
  }).then(resp => resp.json());
}

const getAllSnippets = async () => {
  return await fetch('/api/texts/get_all', {
    method: 'POST',
    body: JSON.stringify(),
    headers: {
      'Content-type': 'application/json',
    },
    credentials: 'include',
  }).then(resp => resp.json());
}

function UserContextProvider(props) {
  const [userObject, setUserObject] = React.useState(null);
  const [identifier, setIdentifier] = React.useState(null);
  const [userStatistics, setUserStatistics] = React.useState([]);
  const [userSnippets, setUserSnipptes] = React.useState([])



  const setUser = async user => {
    setUserObject(user);

    const {providerId, uid} = user.providerData[0];
    const idToken = await user.getIdToken();

    if (!uid || !idToken || !providerId) {
      throw new Error('failed to fetch some data from firebase');
    }

    setIdentifier(String(uid));
    await loginUserAPI({
      service: providerId,
      identifier: uid,
      idToken,
    });
    const statistcs = await getStatistics();
    let result = Object.entries(statistcs.data.textStats)
    result = result.map((item)=>[item[0].replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); }),item[1]]); 
    const snippets = await getAllSnippets();
    setUserStatistics(result);    
    setUserSnipptes(snippets.data)
  };

  const resetUser = () => {
    setUserObject(null);
    setIdentifier(null);
  };

  return (
    <UserContext.Provider
      value={{
        identifier,
        user: userObject,
        setUser,
        resetUser,
        userStatistics,
        userSnippets
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export {UserContext};

export default UserContextProvider;
