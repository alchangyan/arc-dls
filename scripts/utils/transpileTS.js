const { execSync } = require('child_process');

const transpileTS = async () => {
  let msg = ['Files are transpiled.'];

  try {
    execSync('tsc');
  } catch(err) {
    msg = ['Transpiler error.', err];
  }

  return msg;
};

module.exports = transpileTS;
