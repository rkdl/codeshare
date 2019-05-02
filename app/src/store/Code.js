import React from 'react';

const CodeContext = React.createContext();

function CodeContextProvider(props) {
  const [language, setLanguage] = React.useState('javascript');
  const [text, setText] = React.useState('');

  const textLinesCount = [...text].reduce(
    (count, char) => (char === '\n' ? count + 1 : count),
    1
  );

  return (
    <CodeContext.Provider
      value={{
        language,
        text,
        setLanguage,
        setText,
        textLinesCount,
      }}
    >
      {props.children}
    </CodeContext.Provider>
  );
}

export {CodeContext};

export default CodeContextProvider;
