import words from './words';
import veryHard from './veryHard';

export default {
  normal: {
    wordList: words,
    label: 'Default',
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
