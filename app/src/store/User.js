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

function UserContextProvider(props){
  const [userObject, setUserObject] = React.useState(null);
  const [userId, setUserId] = React.useState(null);

  const setUser = async user => {

    setUserObject(user);

    const serviceRaw = user.providerData[0].providerId;
    const service = serviceRaw.substring(0, serviceRaw.length - 4);
    const identifier = user.email;

    if (!identifier){
      // TODO: choose the right identifier
      throw new Error(
        'Email is empty for this user. please try another method'
      );
    }

    const {
      data: { userId } 
    } = await loginUserAPI({
      service,
      identifier
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
