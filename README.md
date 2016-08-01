[![npm version](https://badge.fury.io/js/viur-ignite-compressor.svg)](https://badge.fury.io/js/viur-ignite-compressor)
[![Dependency Status](https://david-dm.org/viur-ignite/viur-ignite-compressor.svg)](https://david-dm.org/viur-ignite/viur-ignite-compressor)
[![GitHub license](https://img.shields.io/badge/license-GPL-blue.svg)](https://raw.githubusercontent.com/viur-ignite/viur-ignite-js/master/LICENSE)

# VIUR Ignite Compressor

>The ViUR Ignite Framework is the first attempt in building a sturdy foundation for ViUR products and Mausbrand projects.<br>This CSS toolkit is the very core of ViUR Ignite. It is built upon the principles of many CSS guides and frameworks.

VIUR Ignite compressor minfies images for web and builds meta tags.
You find a detailed introduction and examples on our [Website](http://ignite.viur.is).

## Install
```
$ npm install viur-ignite-compressor
```

## Usage
```js
const gulp = require('gulp');
const compressor = require('viur-ignite-compressor');

gulp.task('default', function() {
  return compressor.build();
});
```

Minify images and icons and build meta tags with
```
$ gulp
```


### Be individual
Call the function with an object of options
```js
gulp.task('default', function() {
  return compressor.build({
    appName: 'VIUR Ignite Project',
    appURL: 'viur.is',
  });
});
```

The Default options are:
```js
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
```

## Contribution guidelines
* Available for use under the GPL-3.0 license

## Who do I talk to?
* [@phneutral](https://github.com/phneutral)
* [@sveneberth](https://github.com/sveneberth)
