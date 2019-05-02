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

function UserContextProvider(props) {
  const [userObject, setUserObject] = React.useState(null);
  const [identifier, setIdentifier] = React.useState(null);

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
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export {UserContext};

export default UserContextProvider;
