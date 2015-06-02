var config = require('./config.json');
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
//        uglify: {
        concat: {
            build: {
                files: {
                    'kk.min.js': ['jquery.min.js','drop-pod.js']
                }
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

//    grunt.loadNpmTasks('grunt-contrib-uglify'); // load the given tasks
    grunt.loadNpmTasks('grunt-contrib-concat'); // load the given tasks
    grunt.registerTask('default', ['concat']); // Default grunt tasks maps to grunt
//    grunt.registerTask('default', ['uglify']); // Default grunt tasks maps to grunt

};
