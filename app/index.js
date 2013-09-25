'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var SinglePageAppGenerator = module.exports = function SinglePageAppGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(SinglePageAppGenerator, yeoman.generators.Base);

SinglePageAppGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'appName',
    message: 'What would you like to name your app?',
    default: 'A Simple Single Page App'
  }]; 

  this.prompt(prompts, function (props) {
    this.someOption = props.someOption;

    cb();
  }.bind(this));
};

SinglePageAppGenerator.prototype.app = function app() {
  this.mkdir('app');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('_Gruntfile.js', 'Gruntfile.js');
};

SinglePageAppGenerator.prototype.project = function project(){
  this.copy('_bowerrc', '.bowerrc');
  this.copy('_gitignore', '.gitignore');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
