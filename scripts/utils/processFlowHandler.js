const processFlowHandler = ([msg, err, data], spinner) => {
  if (err) {
    spinner.fail(msg);
  } else {
    spinner.succeed(msg);
  }
  return data;
};

module.exports = processFlowHandler;
