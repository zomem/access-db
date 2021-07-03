var gulp = require('gulp');
var uglify = require('gulp-uglify'); //js压缩
var del = require('del')

/**
 * 压缩js(css压缩原理类同)
 * 解压文件路径： ['./src/index.js'] js多个文件进行压缩
 * 解出文件路径： ./js
 */



gulp.task('clean', async function(){
  await del([
    '../weapp/lib/**',
    '../tt/lib/**'
  ], {force: true})
})

gulp.task('copy', gulp.series('clean', async function() {
  let pathList = ['./lib/**']
  await gulp.src(pathList) //压缩多个文件
    // .pipe(uglify({
    //   mangle: true,  //是否代码混淆
    //   compress: true
    // }))  //压缩\
    .pipe(gulp.dest('../weapp/lib'))
    .pipe(gulp.dest('../tt/lib'))
}))

