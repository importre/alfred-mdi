#!/usr/bin/env node

const fs = require('fs');
const alfy = require('alfy');

const rootDir = './node_modules/material-design-icons';
const pngPath = 'drawable-xxhdpi';
const iconColor = getColor();
const pngTail = `_${iconColor}_48dp.png`;

function getColor() {
  if (alfy.alfred.version) {
    const color = alfy.config.get('color');
    return color ? color : 'white';
  }
  return 'white';
}

function getCategories() {
  return fs
    .readdirSync(rootDir)
    .filter(dir => fs.lstatSync(`${rootDir}/${dir}`).isDirectory())
    .filter(dir => fs.readdirSync(`${rootDir}/${dir}`).indexOf(pngPath) >= 0)
    .sort();
}

module.exports = {
  alfy,
  rootDir,
  pngPath,
  iconColor,
  pngTail,
  getCategories,
};

