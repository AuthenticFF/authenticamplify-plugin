// var mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Clean any pre-commit hooks in .git/hooks directory
    clean: {
      hooks: ['.git/hooks/pre-commit']
    },

    //
    // Style Tasks
    //

    sass: {
      options: {
        sourceMap: true,
        includePaths: [
          'node_modules/foundation-sites/scss'
        ],
        outputStyle: 'nested'
      },
      dist: {
        files: {
          'src/resources/styles/css/raw-app.css': 'src/resources/styles/sass/app.scss'
        },
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      dist: {
        files:{
          'src/resources/styles/css/app.css':'src/resources/styles/css/raw-app.css'
        }
      }
    },

    // Compressing CSS into minified file
    cssmin: {
      dist: {
        files: {
          "src/resources/styles/css/app.min.css": "src/resources/styles/css/app.css"
        }
      }
    },

    //
    // Javascript Tasks
    //

    // Compile javascript into a single file`
    browserify: {
      dist:{
        files:{
          "src/resources/scripts/built/scripts.js": "src/resources/scripts/main.js"
        },
        options: {
          watch : true,
          browserifyOptions : {
            debug : true
          }
        }
      }
    },

    // When we commit our code, compress it for production
    uglify: {
      dist:{
        files:{
          "src/resources/scripts/built/built.js": "src/resources/scripts/built/scripts.js"
        }
      }
    },



    //
    // Images and Icons
    //

    // compiling svg icons
    grunticon: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/resources/icons/original',
          src: ['*.svg', '*.png'],
          dest: "src/resources/icons/built"
        }],
        options: {
          enhanceSVG: true
        }
      }
    },


    //
    // Setting up our watch events
    //
    chokidar: {
      all: {
        files: ['app/**/*.html', 'app/**/*.twig'],
      },
      sass: {
        files: ['src/resources/styles/sass/**/*.scss'],
        tasks: [ 'sass', 'autoprefixer' ]
      }
    },

    //
    // Setting up Browser Sync
    //
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'src/resources/scripts/built/scripts.js',
            'src/resources/styles/css/app.css'
          ]
        },
        options: {
          watchTask: true,
          open:false,
          https: true,
          ghostMode: false,
          logSnippet: true,
          socket: {
            domain: 'localhost:3000'
          }
        }
      }
    },

    //
    // Some shell commands we're using to help with Vagrant and converting things to Craft
    //
    shell: {
      options: {
        stdout: true
      },
      syncdown: {
        command: 'bash ./scripts/pull_db.sh && bash ./scripts/pull_assets.sh'
      },
      addfiles: {
        command: 'git add -f src/resources/scripts/built && git add -f src/resources/scripts/built'
      },
      hooks: {
        command: 'cp pre-commit .git/hooks && chmod 777 .git/hooks/pre-commit'
      }
    }

  });

  // TASKS
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-chokidar');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-grunticon');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('hookmeup', ['clean:hooks', 'shell:hooks']);

  grunt.registerTask('compile', ['grunticon','uglify','cssmin']);

  grunt.registerTask('dev', ['grunticon', 'browserify', 'browserSync', 'chokidar']);

};
