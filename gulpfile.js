var fs = require("fs");
/* ----------------------------------------------- 阶段一(页面制作) ----------------------------------*/
//我自己的css简写规则
function myCss(myLess) {
    for (var i = 0; i < myLess.length; i++) {
        var beforeLess = fs.readFileSync(myLess[i][0]);

        beforeLess = String(beforeLess).replace(/\s([@a-zA-Z0-9%\s#,\)\(\?_:/.-]*)\s\s;/g, "($1);")
            .replace(/{([a-z)]*)\(/g, "{.$1(")
            .replace(/;([a-z)]*)\(/g, ";.$1(")
            .replace(/;([a-z]+);/g, ";.$1();")
            .replace(/;([a-z0-9]+);/g, ";.$1();")
            .replace(/{([a-z0-9]+);/g, "{.$1();");

        fs.writeFile(myLess[i][1], beforeLess, function(err) {
            if (err) {
                return console.error(err);
            }
        });
    }
}

var gulp = require('gulp');
var ejs = require('gulp-ejs');
var del = require('del');
var flatten = require('gulp-flatten');//dest目标不保持目录
var less = require('gulp-less');
var browserSync = require('browser-sync').create();//本地服务

//编译ejs
gulp.task('html', function() {
    gulp.src(['./src/*.html'])
        .pipe(ejs())
        .pipe(gulp.dest('./dest'));
});

gulp.task('getlasthtml', function() {
    gulp.src(['./src2/page/*.html'])
        .pipe(ejs())
        .pipe(gulp.dest('./src2'));
});


//合并js,获得js
gulp.task('getJs', function() {
    gulp.src(['./src/common/common.js','./src/index/index.js'])
        .pipe(gulp.dest('./dest/js'));

});

//复制获得图片
gulp.task('getImg', function() {
    gulp.src('./src/*/images/*')
        .pipe(flatten())
        .pipe(gulp.dest('./dest/images'));
    gulp.src('./src/**/bg/*')
        .pipe(flatten())
        .pipe(gulp.dest('./dest/style/images'));
    gulp.src('./src/**/bg/ico/*')
        .pipe(flatten())
        .pipe(gulp.dest('./dest/style/images/ico'));
});


//清除dest文件夹
gulp.task('cleandest', function() {
    return del(['./dest']);
});


//合并完整的less
gulp.task('getEndLess', function() {
    myCss([['./src/common/common.css','./src/common/common.less'], ['./src/index/index.css','./src/index/index.less']]);
});

//编译less,获得css
gulp.task('getCss', ['getEndLess'], function() {

        gulp.src(['./src/common/common.less', './src/index/index.less'])
            .pipe(less())
            .pipe(flatten())
            .pipe(gulp.dest('./dest/style'));

});
gulp.task('reCss', ['getEndLess'], function() {

        gulp.src(['./src/common/common.less', './src/index/index.less'])
            .pipe(less())
            .pipe(flatten())
            .pipe(gulp.dest('./src2/style'));

});


// 构建出dest
gulp.task('build', ['getImg','html', 'getJs', 'getCss']);


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('serve', ['build'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch('src/**/*.js', ['getJs', 'html']);
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/**/*.css', ['getCss', 'getImg', 'html']);
    gulp.watch("dest/*.html").on('change', browserSync.reload);
});

/* ----------------------------------------------- 阶段二(压缩合并) ----------------------------------*/
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-minify-css');
var uglify = require('gulp-uglify');

/* 压缩html */
gulp.task('minhtml', function() {
    gulp.src(['./dist/**/*.html'])
		.pipe(htmlmin({
			removeComments: false,//清除HTML注释
			collapseWhitespace: true,//压缩HTML
			collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
			removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
			removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
			removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
			minifyJS: true,//压缩页面JS
			minifyCSS: true//压缩页面CSS
		}))
        .pipe(gulp.dest('./dist2'));
});

/* 压缩css */
gulp.task('mincss', function() {
    gulp.src(['./dist/**/*.css'])
		.pipe(cssmin({compatibility:'ie7'})) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'
        .pipe(gulp.dest('./dist2'));
});

/* 压缩js */
gulp.task('minjs', function() {
    gulp.src(['./dist/**/*.js'])
		//.pipe(uglify())
        .pipe(gulp.dest('./dist2'));
});

/* 拷贝images文件夹 */
gulp.task('copyimg',function(){
	return gulp.src('./dist/images/**/*')
		.pipe(gulp.dest('./dist2/images'));
});

/* 清除dist2文件夹 */
gulp.task('cleandist',function(cb){
	return del(['dist2']);
});

/* 压缩项目文件 */
gulp.task('min',["copyimg","minhtml","mincss","minjs"]);