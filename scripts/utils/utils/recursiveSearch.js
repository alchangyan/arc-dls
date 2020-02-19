const fs = require('fs');
const path = require('path');

const recursiveSearch = (dir, done) => {
  let results = [];
  fs.readdir(dir, (err, list) => {
    if (err) return done(err);
    let i = 0;
    (function next() {
      let file = list[i++];

      if (!file) return done(null, results);
      file = path.resolve(dir, file);

      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          recursiveSearch(file, (err, res) => {
            results = results.concat(res);
            next();
          });
        } else {
          if (file.slice(file.lastIndexOf('.') + 1) === 'js') {
            results.push(file);
          }
          next();
        }
      });
    })();
  });
};

module.exports = recursiveSearch;
