const { execSync } = require('child_process');
const { writeFileSync } = require('fs');
const path = require('path');

const deployToRegistry = async (newPackageJSON, componentFolderPath, component) => {
  let msg = [`${component} successfully published!`];

  try {
    const componentPackageJSONPath = path.join(__dirname, '../../src/', component, '/package.json');
    execSync(`npm publish ${componentFolderPath}`);
    writeFileSync(componentPackageJSONPath, newPackageJSON);
  } catch(err) {
    msg = ['Deployment error.', err];
  }
  return msg;
};

module.exports = deployToRegistry;