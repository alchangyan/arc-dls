const copyFiles = require('./copyFiles');
const transpileTS = require('./transpileTS');
const processFlowHandler = require('./processFlowHandler');
const parseProcessArgs = require('./parseProcessArgs');
const updatePackageJSON = require('./updatePackageJSON');
const deploy = require('./deploy');
const handleStyles = require('./handleStyles');

module.exports = {
  copyFiles,
  transpileTS,
  processFlowHandler,
  parseProcessArgs,
  updatePackageJSON,
  deploy,
  handleStyles,
};