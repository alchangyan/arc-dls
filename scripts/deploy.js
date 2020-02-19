const ora = require('ora');
const {
  copyFiles,
  transpileTS,
  processFlowHandler,
  parseProcessArgs,
  handleStyles,
  updatePackageJSON,
  deploy,
} = require('./utils');

const {flags, args} = parseProcessArgs(process.argv);

const run = async () => {
  let spinner = ora().start('Copying README.md files...');
  processFlowHandler(await copyFiles(), spinner);
  spinner.start('Transpiling files...');
  processFlowHandler(await transpileTS(), spinner);
  spinner.start('Updating styles...');
  processFlowHandler(await handleStyles(), spinner);
  spinner.start('Updating version in package.json file...');
  setTimeout(async () => {
    const deploymentData = processFlowHandler(await updatePackageJSON(args), spinner);
    spinner.start('Publishing to npm registry...');
    processFlowHandler(await deploy(deploymentData), spinner);
  }, 2000);
}

console.clear();
run();
