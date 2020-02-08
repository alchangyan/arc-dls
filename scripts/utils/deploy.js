const { execSync } = require('child_process');
const { writeFileSync } = require('fs');

const deploy = async ({
  componentFolderPath,
  componentPackageJSONPath,
  oldPackageJSON,
}) => {
  let msg = [`${componentFolderPath} successfully published!`];

  try {
    execSync(`npm publish ${componentFolderPath}`);
  } catch(err) {
    msg = ['Deployment error.', err];

    try {
      writeFileSync(componentPackageJSONPath, oldPackageJSON)
    } catch(revertErr) {
      msg = ['Deployment and reverting error.', err];
    }
  }
  return msg;
};

module.exports = deploy;