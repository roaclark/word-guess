import words from './words';
import veryHard from './veryHard';
import hard from './hard';
import hard2 from './hard2';

export default {
  all: {
    wordList: [...words, ...hard, ...hard2, ...veryHard],
    label: 'Default',
  },
  normal: {
    wordList: words,
    label: 'Normal',
  },
  hardOne: {
    wordList: hard,
    label: 'Hard 1',
  },
  hardTwo: {
    wordList: hard2,
    label: 'Hard 2',
  },
  veryHard: {
    wordList: veryHard,
    label: 'Very hard',
  },
  test: {
    wordList: ['test'],
    label: 'Test',
  },
};
