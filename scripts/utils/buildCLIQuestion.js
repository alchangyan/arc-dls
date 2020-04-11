const { green, yellow } = require('colors');

const buildCLIQuestion = (message, name, list, backButton = false) => {
  const choices = [...list];
  if (backButton) choices.push({ name: yellow('back'), value: 'back' });

  return {
    type: 'list',
    prefix: green('>'),
    name,
    message,
    choices,
  }
}

module.exports = buildCLIQuestion;
