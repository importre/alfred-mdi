#!/usr/bin/env node

const cp = require('child_process');
const fs = require('fs');
const rimraf = require('rimraf');
const common = require('./common');
const rootDir = common.rootDir;
const pngPath = common.pngPath;

function initNpm() {
  const params = ['i', 'alfy', 'material-design-icons', 'rimraf', '-S'];
  const code = cp.spawnSync('npm', params, {
    encoding: 'utf8'
  }).stdout;
  console.log(code);
}

function clearUnnecessaryFiles() {
  fs.readdirSync(rootDir)
    .filter(dir => fs.lstatSync(`${rootDir}/${dir}`).isDirectory())
    .map(parent => fs.readdirSync(`${rootDir}/${parent}`)
      .filter(dir => dir !== pngPath)
      .map(dir => `${rootDir}/${parent}/${dir}`)
    )
    .reduce((a, b) => a.concat(b), [])
    .forEach(dir => rimraf.sync(dir));
}

initNpm();
clearUnnecessaryFiles();

