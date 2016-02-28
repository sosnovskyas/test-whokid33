'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();
const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;
const del = require('del');


// configuration and exports paths in 'config' variable
let config = {};

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

/*********************
 *
 *      CONFIGURATION
 *
 *********************/

/* destinations */
config.dest = {
    dev: './build/dev/',
    prod: './build/prod/'
};

config.dest = {
    styles: isDevelopment ? config.dest.dev : config.dest.prod,
    js: isDevelopment ? config.dest.dev : config.dest.prod,
    assets: isDevelopment ? config.dest.dev : config.dest.prod
};

/* sources */
config.src = {
    base: './src/frontend/'
};

config.src = {
    styles: [
        config.src.base + 'styles.scss'
    ],
    assets: [
        config.src.base + '**/*.html',
        config.src.base + 'Semantic-UI-CSS-master/**/*'

    ],
    js: config.src.base + '**/*.js'
};

config.webpack = {
    output: {
        publicPath: isDevelopment ? config.dest.dev : config.dest.prod,
        filename: '[name].js'
    },
    watch: isDevelopment,
    devtool: isDevelopment ? 'cheap-module-inline-source-map' : null,
    module: {
        loaders: [{
            test: /\.js$/,
            include: config.src.base,
            loader: 'babel?presets[]=es2015'
        }, {
            test: /\.html$/,
            loader: 'raw'
        }]
    }
};


/********************
 *
 *       TASKS
 *
 ********************/
gulp.task('serve', function (cb) {
    if (isDevelopment) {
        browserSync.init({
            server: './build/dev/'
        });

    } else {
        cb();
    }
});

gulp.task('styles', function () {
    return gulp.src(config.src.styles)
        .pipe($.if(isDevelopment, $.sourcemaps.init()))
        .pipe($.sass())
        .pipe($.if(isDevelopment, $.sourcemaps.write()))
        .pipe(gulp.dest(config.dest.styles));
});

gulp.task('assets', function () {
        return gulp.src(config.src.assets)
            .pipe(gulp.dest(config.dest.assets))
    }
);

gulp.task('clean', function () {
    return del(isDevelopment ? config.dest.dev : config.dest.prod);
});

gulp.task('js', function (cb) {
    return gulp.src('./src/frontend/app.js')
        .pipe(webpackStream(config.webpack, null, browserSync.reload))
        .pipe(gulp.dest(config.dest.js))
        .on('data', function () {
            cb();
        })
        ;
});

gulp.task('build',
    gulp.parallel(
        'assets',
        'styles',
        'js'
    )
);



gulp.task('watch', function () {
        gulp.watch(config.src.styles, gulp.series('styles', browserSync.reload));
        gulp.watch(config.src.assets, gulp.series('assets', browserSync.reload));
    }
);

gulp.task('default', gulp.series(
        'build',
        gulp.parallel(
            'watch',
            'serve'
        )
    )
);
