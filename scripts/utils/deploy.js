const ora = require('ora');

const copyFiles = require('./copyFiles');
const transpileTS = require('./transpileTS');
const processFlowHandler = require('./processFlowHandler');
const handleStyles = require('./handleStyles');
const updatePackageJSON = require('./updatePackageJSON');
const deployToRegistry = require('./deployToRegistry');

const deploy = async (component, versonType) => {
  let spinner = ora().start('Copying README.md files...');
  processFlowHandler(await copyFiles(), spinner);
  spinner.start('Transpiling files...');
  processFlowHandler(await transpileTS(), spinner);
  spinner.start('Updating styles...');
  processFlowHandler(await handleStyles(), spinner);
  spinner.start('Updating version in package.json file...');
  setTimeout(async () => {
    const { newPackageJSON, componentFolderPath } = processFlowHandler(
      await updatePackageJSON(component, versonType),
      spinner,
    );
    spinner.start('Publishing to npm registry...');
    processFlowHandler(
      await deployToRegistry(newPackageJSON, componentFolderPath, component),
      spinner,
    );
  }, 2000);
};

module.exports = deploy;
