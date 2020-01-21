let fs = require('fs');
let moment = require('moment');

const wasFileChanged = (err,wasChanged) => {
  if (wasChanged){
    console.log('folder was changed, need to compare files');
    //need to update redis here
    //...comapre files to find what was changed
  }
  else{
    console.log('folder was not changed');
  }
};

/**
 * Checks if a file/folder was changed 
 */
const wasFileOrFolderChanged = (path, callback) => {
  fs.open(path, 'r', (err, fd) => {
    if (err) {
      return callback (err);
    } else {

      //obtain previous modified date of the folder (I would use redis to store/retrieve this data)
      let lastModifed = '2016-12-03T00:41:12Z'; //put the string value here, this is just example

      fs.stat(path, (err, data) => {
        console.log('check if file/folder last modified date, was it after my last check ');

        //I use moment module to compare dates
        let previousLMM = moment(lastModifed);
        let folderLMM = moment(data.mtime.toISOString());
        let res = !(folderLMM.isSame(previousLMM, 'second')); //seconds granularity
        return callback (null, res);
      });
    }
  });
}

module.exports = {
  wasFileChanged,
  wasFileOrFolderChanged,
}