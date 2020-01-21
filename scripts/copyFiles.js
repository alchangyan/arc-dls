const fs = require('fs');
const tsConfig = require('../tsconfig.json');

const {rootDir, outDir} = tsConfig.compilerOptions;
const filesForCopy = [
  'README.md',
];

const walkSync = async (dir = `./${rootDir}`) => {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      walkSync(dir + '/' + file);
    } else {
      if (filesForCopy.includes(file)) {
        const from = `${dir}/${file}`;
        const to = from.replace(rootDir, outDir);

        fs.copyFile(from, to, err => {
          if (err) throw err;
        });
      }
    }
  });
};

module.exports = walkSync;