// transpile SCSS to CSS
// change importing names in the deployed module

const { execSync } = require('child_process');

const transpileTS = async () => {
  let msg = ['Styles are transpiled.'];

  try {
    execSync('node-sass -q core/themes -o build/themes');
  } catch(err) {
    msg = ['SCSS transpiler error.', err];
  }

  return msg;
};

module.exports = transpileTS;
