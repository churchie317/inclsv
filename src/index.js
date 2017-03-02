import fs from 'fs';
import path from 'path';

import pronouns from './pronouns.json';

export default inclsv;

Array.prototype.flatMap = function(lambda) {
  return Array.prototype.concat.apply([], this.map(lambda));
};

export function readPronouns() {
  return pronouns;
}

// traverse directory in parallel
// returns all files in directory as flat array
export function getFlatDirectoryTree(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        return reject(err);
      } else {
        const promisedFiles = files.map((file) =>
          new Promise((resolve, reject) => {
            file = path.resolve(dir, file);
            fs.stat(file, (err, stat) => {
              if (err) {
                reject(err);
              }
              if (stat && stat.isDirectory()) {
                getFlatDirectoryTree(file).then(resolve);
              }  else {
                resolve(file);
               }
            });
          })
        );
        return Promise.all(promisedFiles).then((f) => {
          resolve(f.flatMap((x) => x));
        }).catch(reject);
      }
    });
  });
}

function inclsv(dir) {
  return getFlatDirectoryTree(dir).then((filesArray) =>
    // filter filesArray for files ending in .md
    filesArray.filter((file) => (file.slice(-3)).toLowerCase() === '.md')
  )
  .catch(console.error);
}
