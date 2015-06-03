var config = require('./config.json');
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
//        uglify: {
            build: {
                files: {
                    'kk.min.js': ['drop-pod.js']
                }
            }
        }
    });

//    grunt.loadNpmTasks('grunt-contrib-uglify'); // load the given tasks
    grunt.loadNpmTasks('grunt-contrib-concat'); // load the given tasks
    grunt.registerTask('default', ['concat']); // Default grunt tasks maps to grunt
//    grunt.registerTask('default', ['uglify']); // Default grunt tasks maps to grunt

};
