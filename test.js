// given a list of words , form a chain of words such that the first word is the last word of the second word and so on.

// Example:
// Input: ['apple', 'eggs', 'snakes']
// Output: ['apple', 'eggs', 'snakes']

// write the code in javascript

function formChain(words) {
  let chain = [words[0]];
  let lastWord = words[0];
  for (let i = 1; i < words.length; i++) {
    let word = words[i];
    if (word[0] === lastWord[lastWord.length - 1]) {
      chain.push(word);
      lastWord = word;
    }
  }
  return chain;
}
