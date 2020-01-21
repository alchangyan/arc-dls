const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const { red, green } = require('colors');
const ora = require('ora');
const copyFiles = require('./copyFiles');

const componentFolderPath = path.join(__dirname, '../core/', process.argv[2]);
const componentPackageJSONPath = path.join(__dirname, '../core/', process.argv[2], '/package.json');
let spinner = ora('Copying README.md files...').start();

console.clear();
copyFiles();

setTimeout(() => {
  spinner.succeed('README.md files are copied.');
  spinner = ora('Transpiling files...').start();

  exec('tsc', (err, outputSuccess, outputError) => {
    if (!err) {

      spinner.succeed('Files are transpiled.');
      spinner = ora('Searching selected element...').start();

      if (fs.existsSync(componentFolderPath)) {
        if (fs.existsSync(componentPackageJSONPath)) {
          fs.readFile(componentPackageJSONPath, 'utf8', (err, oldPackageJSON) => {
            if (err) {
              console.log('ERROR');
              return;
            };

            spinner.succeed('Element found.');
            spinner = ora('Updating version in package.json file...').start();
      
            const versionRegExp = new RegExp(/([0-9]{1,}.[0-9]{1,}.[0-9]{1,})/);
            const currentVersion = oldPackageJSON.match(versionRegExp)[0];
            let [ major, minor, patch ] = currentVersion.split('.');
      
            // if updating patch
            const oldVersion = [major, minor, patch].join('.');
            const newVersion = [major, minor, ++patch].join('.');
            const newPackageJSON = oldPackageJSON.replace(oldVersion, newVersion);

            fs.writeFile(componentPackageJSONPath, newPackageJSON, err => {
              if (err) {
                console.log('ERROR');
                return;
              };

              spinner.succeed(`package.json updated. Version ${newVersion}`);
              spinner = ora('Publishing to npm registry...').start();
      
              // deployment
              exec(`npm publish ${componentFolderPath}`, (err, outputSuccess, outputError) => {
                if (err) {
                  const msgIndex = outputError.indexOf("npm ERR!");
                  console.log(red(outputError.slice(msgIndex)));
      
                  fs.writeFile(componentPackageJSONPath, oldPackageJSON, err => {
                    if (err) {
                      console.log(err);
                      return;
                    };
                  })
                } else {
                  setTimeout(() => {
                    spinner.succeed(`${componentFolderPath} successfully published!`);
                  }, 0);
                }
              });
            })
          });
        } else {
          spinner.fail(`\`package.json\` for ${componentFolderPath} doesn\'t exits`);
        }
      } else {
        spinner.fail('Element doesn\'t exits');
        console.log(red(outputError));
      };
    } else {
      spinner.fail('Transpiler error.');
      console.log(red(outputError));
    }
  });
}, 0);
