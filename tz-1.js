const fs = require('fs');
const path = require('path');

const base = '../../../../MY_IMAGES';

const readDir = (base, level) => {
  const files = fs.readdirSync(base);

  files.forEach(item => {
    
    let localBase = path.join(base, item);
    
    let state = fs.statSync(localBase);
    let dirName = item[0];
    if (state.isDirectory()) {
      readDir(localBase, level + 1);
    } else {
      fs.access(`./${dirName}`, (err) => {
        if (err) {
          fs.mkdir(`./${dirName}`, () => {
            
            fs.link(localBase, `./${dirName}/${item}`, err => {
              console.log(dirName);
              if (err) {
                console.error(24,err.message);
              }
            });
          });

         } else {
          fs.link(localBase, `./${dirName}/${item}`, err => {
            console.log(dirName);
            if (err) {
              console.error(33,err.message);
            }
          });
        }
      });
    }
  })
}

readDir(base, 0);



