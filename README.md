Angular Seed Frontend Project
=============================

Getting started
---------------

*   Git
*   Install [NodeJS](http://nodejs.org/)
*   Execute in a terminal `npm install -g grunt-cli bower`
	*   `-g` option for install in the global path
	*   Install [Grunt](http://gruntjs.com/)
	*   Install [Bower](http://bower.io/)
	*   This have to be executed only the first time you use the seed
*   Do a fork of the seed project for your project
*   Clone the new project forked
*   `cd project name` folder
*   `npm install`
*   `bower install`
*   Execute in the terminal `grunt build` in order to check that everything it is fine

Buid by environments
--------------------

The seed project use Grunt as task runner and bower as dependency management

### Build in DEV environment

*   Use [Connect](https://github.com/gruntjs/grunt-contrib-connect) as frontend server.
	Connect start a connect web server.
*   There are 2 different targets/types of builds
	*   `grunt dev` It's the task more indicated for development, do the build, watch and connect tasks
		*   build -> dev (connect + watch)
