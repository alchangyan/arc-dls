const ora = require('ora');

const copyFiles = require('./copyFiles');
const transpileTS = require('./transpileTS');
const processFlowHandler = require('./processFlowHandler');
const handleStyles = require('./handleStyles');
const updatePackageJSON = require('./updatePackageJSON');;

const deploy = async (component, versonType) => {
  let spinner = ora().start('Copying README.md files...');
  processFlowHandler(await copyFiles(), spinner);
  spinner.start('Transpiling files...');
  processFlowHandler(await transpileTS(), spinner);
  spinner.start('Updating styles...');
  processFlowHandler(await handleStyles(), spinner);
  spinner.start('Updating version in package.json file...');
  setTimeout(async () => {
    const deploymentData = processFlowHandler(await updatePackageJSON(component, versonType), spinner);
    spinner.start('Publishing to npm registry...');
    processFlowHandler(await deploy(deploymentData), spinner);
  }, 2000);
}

module.exports = deploy;
