const fs = require('fs');
const path = require('path');

const getCurrentVersion = async filePath => {
  const componentPackageJSONPath = path.join(__dirname, '../../src/', filePath, '/package.json');
  const oldPackageJSON = fs.readFileSync(componentPackageJSONPath, 'utf8');
  const versionRegExp = new RegExp(/([0-9]{1,}.[0-9]{1,}.[0-9]{1,})/);
  const currentVersion = oldPackageJSON.match(versionRegExp)[0];
  return currentVersion;
}

module.exports = getCurrentVersion;
