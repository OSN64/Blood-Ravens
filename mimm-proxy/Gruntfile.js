var config = require('./config.json');
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: config.injected_file + config.injected_file_ext,
                dest: config.injected_fin_file
            }
        }
    });

    //grunt.initConfig({
    //    uglify: {
    //        my_target: {
    //            files: {
    //                'dest/minified.js': [config.injected_file]
    //            }
    //        }
    //    }
    //});

    grunt.loadNpmTasks('grunt-contrib-uglify'); // load the given tasks
    grunt.registerTask('default', ['uglify']); // Default grunt tasks maps to grunt

};
