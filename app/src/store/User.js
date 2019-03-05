import React from 'react';

const UserContext = React.createContext();

const loginUserAPI = async params => {
  return await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json'
    },
  }).then(resp => resp.json());
};

function UserContextProvider(props) {
  const [userObject, setUserObject] = React.useState(null);
  const [userId, setUserId] = React.useState(null);

  const setUser = async user => {

    setUserObject(user);

    const {providerId, uid} = user.providerData[0];
    const service = providerId.substring(0, providerId.length - 4);

    if (!uid){
      throw new Error('uid is empty. login failed');
    }

    const {
      data: { userId } 
    } = await loginUserAPI({
      service,
      identifier: uid
    });

    setUserId(userId);
  };

  const resetUser = () => {
    setUserObject(null);
    setUserId(null);
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        user: userObject,
        setUser,
        resetUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export {
  UserContext
}

export default UserContextProvider;
