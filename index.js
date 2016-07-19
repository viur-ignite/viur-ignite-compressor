var gulp = require('gulp');
var rename = require('gulp-rename');

var svgmin = require('gulp-svgmin');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var favicons = require('gulp-favicons');

var path = require('path');


module.exports = {
	build: function(options, src, dest) {
		if (typeof(options)==='undefined')					options						= {};
		if (typeof(options.appName)==='undefined')			options['appName']			= 'My App';
		if (typeof(options.appURL)==='undefined')			options['appURL']			= 'myapp.com';
		if (typeof(options.appDescription)==='undefined')	options['appDescription']	= 'Description of My App';
		if (typeof(options.developerName)==='undefined')	options['developerName']	= 'Developer of My App';
		if (typeof(options.developerURL)==='undefined')		options['developerURL']		= 'URL of Developer';
		if (typeof(options.background)==='undefined')		options['background']		= '#ffffff';
		if (typeof(options.metaPath)==='undefined')			options['metaPath']			= '../static/meta';
		if (typeof(options.index)==='undefined')			options['index']			= './appengine/html/index.html';
		if (typeof(options.display)==='undefined')			options['display']			= 'standalone';
		if (typeof(options.orientation)==='undefined')		options['orientation']		= 'portrait';

		if (typeof(src)==='undefined') src = '/sources/';
		if (typeof(dest)==='undefined') dest = '/appengine/static/';

		src = dirname(dirname(__dirname)) + src; 
		dest = dirname(dirname(__dirname)) + dest;

		var ret = [];

		// reduce images for web
		ret.push(gulp.src(src+'/images/**/*')
			.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			}))
			.pipe(gulp.dest(dest+'/images'))
		);	

		// reduce icons for web
		ret.push(gulp.src(src+'/icons/**/*')
			.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			}))
			.pipe(gulp.dest(dest+'/icons'))
		);

		// crop and resize one meta image to different favicon formats. 
		ret.push(gulp.src(src+'/meta/*')
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
			.pipe(gulp.dest(dest+'/meta'))
		);

		return ret;
	}
};

function dirname(path) {
	return path.replace(/\\/g, '/')
		.replace(/\/[^\/]*\/?$/, '');
}