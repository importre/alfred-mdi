#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const common = require('./common');
const alfy = common.alfy;
const rootDir = common.rootDir;
const pngPath = common.pngPath;
const pngTail = common.pngTail;

const data = common.getCategories()
  .filter(dir => fs.lstatSync(`${rootDir}/${dir}`).isDirectory())
  .filter(dir => fs.readdirSync(`${rootDir}/${dir}`).indexOf(pngPath) >= 0)
  .map(category => {
    return fs
      .readdirSync([rootDir, category, pngPath].join(path.sep))
      .filter(filename => filename.endsWith(pngTail))
      .map(filename => {
        const arg = filename.replace(pngTail, '');
        const title = arg.replace(/^ic_/, '').replace(/_/g, ' ');

        return {
          title: title,
          subtitle: category,
          icon: {
            path: [rootDir, category, pngPath, filename].join(path.sep),
          },
          arg: arg,
        };
      });
  })
  .reduce((a, b) => a.concat(b), []);

if (alfy.alfred.version) {
  const input = alfy.input;
  const items = data
    .filter(i => i.title.includes(input) || i.subtitle.includes(input))
  alfy.output(items);
} else {
  console.log(data[0]);
}

