const parseProcessArgs = initialArguments => {
  let [flags, args] = initialArguments.slice(2).reduce((acc, str) => {
    let index = 1
    // is flag
    if (/(--[.*]{0,})/.test(str)) index = 0;
    acc[index].push(str);
  
    return acc;
  }, [[],[]]);
  flags = flags.map(flag => flag.slice(2));

  return {flags, args};
};

module.exports = parseProcessArgs;
