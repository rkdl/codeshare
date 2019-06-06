import React from 'react';
import {withRouter} from 'react-router-dom';

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
  const [expireTime, setExpireTime] = React.useState(null);
  const [userIdentifier, setUserIdentifier] = React.useState(null);
  const [isFetched, setIsFetched] = React.useState(false);
  const [isExpired, setIsExpired] = React.useState(false);
  const [totalStatistic, setTotalStatistic] = React.useState({});


  const textLinesCount = [...text].reduce(
    (count, char) => (char === '\n' ? count + 1 : count),
    1
  );

  const saveText = async () => {
    if (identifier) {
      await updateTextAPI({
        text,
        language,
        expireTime: '10-10-2019',
        identifier,
      });
    } else {
      const {
        data: {identifier: newIdentifier},
      } = await createTextAPI({
        text,
        language,
        expireTime: '10-10-2019',
        identifier,
      });

      setIdentifier(newIdentifier);
      props.history.push(`/edit/${newIdentifier}`);
    }
  };

  const fetchText = async id => {
    const response = await readTextAPI({
      identifier: id || identifier,
    });
    console.log(response.data !== undefined)
    if(response.data !== undefined){
      const {
        data: {
          text: newText,
          language: newLanguage,
          expireTime: newExpireTime,
          userIdentifier: newUserIdentifier,
        },
      } = response;
  
      setText(newText);
      setLanguage(newLanguage);
      setExpireTime(newExpireTime);
      setUserIdentifier(String(newUserIdentifier));
    }
    else{
      setIsExpired(true)
    }
    setIsFetched(true);
  };

  const getTotalStatistics = async () => {
    const response =  await fetch('/api/texts/total_statistics', {
      method: 'POST',
      body: JSON.stringify(),
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include',
    }).then(resp => resp.json());
    let result = Object.entries(response.data.textStats)
    result = result.map((item)=>[item[0].replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); }),item[1]]);
    setTotalStatistic(result);
  }

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
        isExpired,
        getTotalStatistics,
        totalStatistic
      }}
    >
      {props.children}
    </CodeContext.Provider>
  );
}

export {CodeContext};

export default withRouter(CodeContextProvider);
