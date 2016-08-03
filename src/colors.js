#!/usr/bin/env node

const alfy = require('alfy');
const items = alfy.inputMatches([{
  title: 'white',
  icon: {
    path: 'images/white.png'
  },
  arg: 'white',
}, {
  title: 'black',
  icon: {
    path: 'images/black.png'
  },
  arg: 'black',
}], 'title');

alfy.output(items);

