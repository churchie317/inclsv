#!/usr/bin/env node

import path from 'path'
import yargs from 'yargs';

import inclsv from '../index';

yargs
  .usage('Usage: $0 start [options]')
  .command('start', 'Begin searching for Markdown files', {
    dir: {
      default: process.cwd()
    }
  }, generate)
  .help('h')
  .alias('h', 'help')
  .argv;

function generate(options) {
  if (path.isAbsolute(options.dir)) {
    return inclsv(path.resolve(__dirname, options.dir.slice(1))).then(console.log);
  }
  return inclsv(path.resolve(__dirname, options.dir)).then(console.log);
}
