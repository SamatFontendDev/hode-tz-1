const fs = require('fs');
const path = require('path');

const base = '../../../../MY_IMAGES';

const readDir = (base, level) => {
  const files = fs.readdirSync(base);
  fs.access('./myDir', err =>{
    if (err) {
      fs.mkdir('./myDir', () => {
        console.log('myDir created!');
      });
    }
  });
  
  files.forEach(item => {
    let localBase = path.join(base, item);
    
    let state = fs.statSync(localBase);
    let dirName = item[0];
    if (state.isDirectory()) {
      readDir(localBase, level + 1);
    } else {
      fs.access(`./myDir/${dirName}`, (err) => {
        if (err) {
          fs.mkdir(`./myDir/${dirName}`, () => {
            
            fs.link(localBase, `./myDir/${dirName}/${item}`, err => {
              if (err) {
                console.error(24,err.message);
              }
            });
          });

         } else {
          fs.link(localBase, `./myDir/${dirName}/${item}`, err => {
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



