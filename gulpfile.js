'use strict';

const config = {
	ROOT_PATH: __dirname
};

const path = require( 'path' );
const gulp = require( 'gulp' );
const del = require( 'del' );
const utils = require( 'battleships-dev-tools/lib/utils.js' )( config );
const lintTasks = require( 'battleships-dev-tools/lib/tasks/lint.js' )( config );
const testTasks = require( 'battleships-dev-tools/lib/tasks/test.js' )( config );
const compileTasks = require( 'battleships-dev-tools/lib/tasks/compile.js' )( config );

const options = utils.parseArgs( process.argv.slice( 3 ) );

// Compile engine to esnext format.
gulp.task( 'clean:compile:utils', () => del( './lib/utils' ) );
gulp.task( 'compile:utils', [ 'clean:compile:utils' ], () => compileTasks.compile( '../battleships-utils/src', './lib/utils' ) );
gulp.task( 'compile', [ 'compile:utils' ], ( done ) => done() );

// JS code sniffer.
const jsFiles = [ path.join( config.ROOT_PATH, '**', '*.js' ) ];

gulp.task( 'lint', () => lintTasks.lint( jsFiles ) );
gulp.task( 'pre-commit', () => lintTasks.lintStaged( jsFiles ) );

// JS unit tests.
gulp.task( 'test', ( done ) => testTasks.test( options, done ) );
