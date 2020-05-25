//@flow
import React, { useState } from 'react';

import Select from './Select';
import Button from './Button';

type Props = {
  word: ?string,
  guesser: ?string,
  category: ?string,
  username: string,
  getNewWord: (?string) => void,
  style?: any,
};

const wordListOptions = [
  { value: 'normal', name: 'Normal' },
  { value: 'default', name: 'Default' },
];

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

const Content = ({ word, guesser, category, username, getNewWord }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState(
    category || 'default',
  );

  if (!word || !guesser) {
    return (
      <>
        <Select
          options={wordListOptions}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
        <Button onClick={() => getNewWord(selectedCategory)}>
          Start the game
        </Button>
      </>
    );
  }

  if (guesser == username) {
    return (
      <>
        {renderHeader('Try to guess the word!')}
        {renderWord('???')}
        <Select
          options={wordListOptions}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
        <Button onClick={() => getNewWord(selectedCategory)}>
          Generate new word
        </Button>
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
