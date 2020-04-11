const copyFiles = require('./copyFiles');
const transpileTS = require('./transpileTS');
const processFlowHandler = require('./processFlowHandler');
const updatePackageJSON = require('./updatePackageJSON');
const handleStyles = require('./handleStyles');
const buildCLIQuestion = require('./buildCLIQuestion');
const getCurrentVersion = require('./getCurrentVersion');
const deploy = require('./deploy');

module.exports = {
  copyFiles,
  transpileTS,
  processFlowHandler,
  updatePackageJSON,
  handleStyles,
  buildCLIQuestion,
  getCurrentVersion,
  deploy,
};