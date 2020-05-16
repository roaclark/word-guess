//@flow
import React from 'react';

import Button from './Button';

type Props = {
  word: ?string,
  guesser: ?string,
  username: string,
  getNewWord: () => void,
  style?: any,
};

const renderWord = (word) => (
  <div style={{ alignSelf: 'stretch', margin: '20px' }}>
    <div
      style={{
        textAlign: 'center',
        fontSize: '30px',
        fontFamily: 'monospace',
        margin: 'auto',
        background: '#232937',
        color: '#f9fbff',
        maxWidth: '300px',
        padding: '30px',
      }}
    >
      {word}
    </div>
  </div>
);

const renderHeader = (text) => <div style={{ padding: '10px' }}>{text}</div>;

const Content = ({ word, guesser, username, getNewWord }: Props) => {
  if (!word || !guesser) {
    return <Button onClick={getNewWord}>Start the game</Button>;
  }

  if (guesser == username) {
    return (
      <>
        {renderHeader('Try to guess the word!')}
        {renderWord('???')}
        <Button onClick={getNewWord}>Generate new word</Button>
      </>
    );
  }

  return (
    <>
      {renderHeader(`${guesser} is trying to guess`)}
      {renderWord(word)}
    </>
  );
};

const WordContent = (props: Props) => {
  return (
    <div
      style={{
        ...props.style,
        display: 'flex',
        padding: '0 20px',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Content {...props} />
    </div>
  );
};

export default WordContent;
