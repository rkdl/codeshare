import React from 'react';
import {withRouter} from 'react-router-dom';
import {getDateNDaysFromNow} from '../utils/helpers';

const CodeContext = React.createContext();

const createTextAPI = async params => {
  return await fetch('/api/texts/create', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json',
    },
    credentials: 'include',
  }).then(resp => resp.json());
};

const readTextAPI = async params => {
  return await fetch('/api/texts/read', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json',
    },
    credentials: 'include',
  }).then(resp => resp.json());
};

const updateTextAPI = async params => {
  return await fetch('/api/texts/update', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json',
    },
    credentials: 'include',
  }).then(resp => resp.json());
};

function CodeContextProvider(props) {
  const [language, setLanguage] = React.useState('javascript');
  const [text, setText] = React.useState('');
  const [identifier, setIdentifier] = React.useState(null);

  // TODO: create control to set expire time
  const [expireTime, setExpireTime] = React.useState(getDateNDaysFromNow(2));
  const [userIdentifier, setUserIdentifier] = React.useState(null);
  const [isFetched, setIsFetched] = React.useState(false);

  const textLinesCount = [...text].reduce(
    (count, char) => (char === '\n' ? count + 1 : count),
    1
  );

  const saveText = async () => {
    const expireTimeFormatted = (
      expireTime.getDate() 
      + '-' 
      + (expireTime.getMonth() + 1) 
      + '-' 
      + expireTime.getFullYear()
    );

    if (identifier) {
      await updateTextAPI({
        text,
        language,
        expireTime: expireTimeFormatted,
        identifier,
      });
    } else {
      const {
        data: {identifier: newIdentifier},
      } = await createTextAPI({
        text,
        language,
        expireTime: expireTimeFormatted,
        identifier,
      });

      setIdentifier(newIdentifier);
      props.history.push(`/edit/${newIdentifier}`);
    }
  };

  const fetchText = async id => {
      const {
        data,
        errorType,
      } = await readTextAPI({
        identifier: id,
      });

      if (errorType && errorType === 'TEXT_IS_EXPIRED'){
        setIsFetched(false);
        alert('text is expired');
        window.location.replace('/');
        return;
      }

      const {
        text: newText,
        language: newLanguage,
        expireTime: newExpireTime,
        userIdentifier: newUserIdentifier,
      } = data;
  
      setText(newText);
      setLanguage(newLanguage);
      setExpireTime(newExpireTime);
      setUserIdentifier(String(newUserIdentifier));
      setIsFetched(true);

  };

  return (
    <CodeContext.Provider
      value={{
        language,
        text,
        setLanguage,
        setText,
        textLinesCount,
        saveText,
        identifier,
        setIdentifier,
        expireTime,
        setExpireTime,
        fetchText,
        userIdentifier,
        isFetched,
      }}
    >
      {props.children}
    </CodeContext.Provider>
  );
}

export {CodeContext};

export default withRouter(CodeContextProvider);
