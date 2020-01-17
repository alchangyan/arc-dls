const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const componentFolderPath = path.join(__dirname, '../core/', process.argv[2]);
const componentPackageJSONPath = path.join(__dirname, '../core/', process.argv[2], '/package.json');

if (fs.existsSync(componentFolderPath)) {
  if (fs.existsSync(componentPackageJSONPath)) {
    fs.readFile(componentPackageJSONPath, 'utf8', (err, oldPackageJSON) => {
      if (err) {
        console.log('ERROR');
        return;
      };

      const versionRegExp = new RegExp(/([0-9].[0-9].[0-9])/);
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

        // deployment
        // exec(`npm publish ${componentFolderPath} --access public`, (err, outputSuccess, outputError) => {
        //   if (err) console.log('ERROR');
        //   if (outputError) {
        //     console.log(outputError);
        //     fs.writeFile(componentPackageJSONPath, oldPackageJSON, err => {
        //       if (err) {
        //         console.log('ERROR');
        //         return;
        //       };
        //     })
        //   } else {
        //     console.log(outputSuccess)
        //   }
        // });
      })

    });
  } else {
    console.log(`\`package.json\` for ${componentFolderPath} doesn\'t exits`);
  }
} else {
  console.log('Package doesn\'t exits');
};
