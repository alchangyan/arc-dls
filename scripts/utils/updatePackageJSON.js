const fs = require('fs');
const path = require('path');

const updatePackageJSON = async (component, versonType) => {
  const componentFolderPath = path.join(__dirname, '../../build/', component);
  const componentPackageJSONPath = path.join(__dirname, '../../build/', component, '/package.json');

  let msg = [''];

  try {
    if (fs.existsSync(componentFolderPath)) {
      if (fs.existsSync(componentPackageJSONPath)) {
        try {
          const oldPackageJSON = fs.readFileSync(componentPackageJSONPath, 'utf8');
          const versionRegExp = new RegExp(/([0-9]{1,}.[0-9]{1,}.[0-9]{1,})/);
          const currentVersion = oldPackageJSON.match(versionRegExp)[0];
          let [ major, minor, patch ] = currentVersion.split('.');
    
          const oldVersion = [major, minor, patch].join('.');
          // if updating patch
          console.log(versonType)
          const newVersion = [major, minor, ++patch].join('.');
          const newPackageJSON = oldPackageJSON.replace(oldVersion, newVersion);
  
          try {
            fs.writeFileSync(componentPackageJSONPath, newPackageJSON);
            msg = [`package.json updated. Version ${newVersion}`, null, {
              componentFolderPath,
              componentPackageJSONPath,
              oldPackageJSON,
            }];
          } catch(err) {
            msg[0] = ('package.json write error', err);
          }
        } catch(err) {
          msg = [`\`package.json\` for ${componentFolderPath} doesn\'t exits`, err];
        }
      } else {
        msg = [`\`package.json\` for ${componentFolderPath} doesn\'t exits`, new Error('Something went wrong')];
      }
    } else {
      msg = ['Element doesn\'t exits', new Error('Something went wrong')];
    };

    return msg;
  } catch(err) {
    return ['Something went wring with updating package.json', err];
  }
};

module.exports = updatePackageJSON;
