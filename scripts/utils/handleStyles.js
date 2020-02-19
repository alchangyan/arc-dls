const fs = require('fs');
const { execSync } = require('child_process');
const recursiveSearch = require('./utils/recursiveSearch');

const handleStyles = async () => {
  let msg = ['Styles are updated.'];
  
  try {
    execSync('node-sass -q core/themes -o build/themes');
    recursiveSearch('build/', (err, jsFiles) => {
      if (err) throw err;
      // founded all JS files from build
      jsFiles.forEach(path => {
        try {
          const data = fs.readFileSync(path, 'utf8');
          const results = data.match(/(require.*.scss)/);
  
          if (results) {
            const initialStirng = results[1];
            const modifiedStirng = initialStirng.replace(/(require\("[\.\.\/]{0,}themes)/, 'require("@arc-dls').replace('.scss', '.css');
            const newData = data.replace(initialStirng, modifiedStirng);
  
            // updating file
            try {
              fs.writeFileSync(path, newData);
            } catch(err) {
              throw new Error('Unexpected error while writing file from build folder.');
            }
          }
        } catch(err) {
          throw new Error('Unexpected error while reading file from build folder.');
        }
      });
    });
  } catch(err) {
    msg = ['SCSS transpiler error.', err];
  }

  return msg;
};

module.exports = handleStyles;
