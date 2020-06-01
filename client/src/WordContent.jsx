//@flow
import React, { useState, useEffect } from 'react';

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

const fetchCategories = async (callback) => {
  const result = await fetch('/api/categories');
  const data = await result.json();
  callback(data);
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

const Content = ({ word, guesser, category, username, getNewWord }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState(
    category || 'default',
  );
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories(setCategories);
  }, []);

  if (!word || !guesser) {
    return (
      <>
        <Select
          options={categories}
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
          options={categories}
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
