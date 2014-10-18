module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/<%= pkg.name %>.js',
				dest: 'build/<%= pkg.name %>.min.js'
			}
		},
		nggettext_extract: {
			pot: {
				files: {
					'po/template.pot': ['app/**/*.html']
				}
			},
		},
		nggettext_compile: {
			all: {
				options: {
					module: 'myApp'
				},
				files: {
					'app/js/translations.js': ['po/*.po']
				}
			},
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Load plugin gettext
	grunt.loadNpmTasks('grunt-angular-gettext');

	// Default task(s).
	grunt.registerTask('default', ['uglify']);

};