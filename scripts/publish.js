const { exec } = require('child_process');
const path = require('path');
const { red, green } = require('colors');
// const fs = require('fs');

const componentFolderPath = path.join(__dirname, '../build/', process.argv[2]);
const componentPackageJSONPath = path.join(__dirname, '../build/', process.argv[2], '/package.json');

exec(`npm publish ${componentFolderPath}`, (err, outputSuccess, outputError) => {
  if (outputError) {
    // console.log(outputError);
    const msgIndex = outputError.indexOf("npm ERR!");
    console.log(red(outputError.slice(msgIndex)));
    // !!!!!!!!!! revert package.json version !!!!!!!!

    fs.writeFile(componentPackageJSONPath, oldPackageJSON, err => {
      if (err) {
        console.log('ERROR');
        return;
      };
    })
  } else {
    console.log(green(componentFolderPath), ' successfully published!');
  }
});