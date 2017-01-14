var path = require('path');
var yargs = require('yargs');
var inquirer = require('inquirer');

var cwd = process.cwd();

var argv = yargs
  .help('help')
  .alias('h', 'help')
  .argv;

// FOR NOW:
// **
// TODO: load and read file
// TODO: look for instances of gender-binary pronouns
// TODO: make changes and write to file
// **
