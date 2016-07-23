"use strict";

const PLUGIN_NAME = 'viur-ignite-compressor';

var	gulp = require('gulp'),
	svgmin = require('gulp-svgmin'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	favicons = require('gulp-favicons');


module.exports = {
	build: function(options) {

		// Set Default Options
		var defaultOptions = {
			src: './sources/',
			dest: './appengine/static/',
			appName: 'My App',
			appURL: 'myapp.com',
			appDescription: 'Description of My App',
			developerName: 'Developer of My App',
			developerURL: 'developer.com',
			background: '#ffffff',
			metaPath: '../static/meta',
			index: './appengine/html/index.html',
			display: 'standalone',
			orientation: 'portrait'
		};

		if (typeof(options)==='undefined') var options = {};
		for (var key in defaultOptions) {
			if (typeof(options[key])==='undefined') options[key] = defaultOptions[key];
		}


		var ret = []; // Return Array

		// reduce images for web
		ret.push(gulp.src(options.src+'/images/**/*')
			.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			}))
			.pipe(gulp.dest(options.dest+'/images'))
		);	

		// reduce icons for web
		ret.push(gulp.src(options.src+'/icons/**/*')
			.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			}))
			.pipe(gulp.dest(options.dest+'/icons'))
		);

		// crop and resize one meta image to different favicon formats. 
		ret.push(gulp.src(options.src+'/meta/*')
			.pipe(favicons({
				appName: options.appName,
				appDescription: options.appDescription,
				developerName: options.developerName,
				developerURL: options.developerURL,
				background: options.background,
				path: options.metaPath,
				url: options.appURL,
				display: options.display,
				orientation: options.orientation,
				version: 1.0,
				logging: false,
				online: false,
				html: options.index,
				replace: true
			}))
			.pipe(gulp.dest(options.dest+'/meta'))
		);

		return ret;
	}
};