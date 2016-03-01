var gulp = require('gulp'),
    sass   = require('gulp-sass'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    angularFilesort = require('gulp-angular-filesort'),
    wiredep = require('wiredep').stream,
    run = require('run-sequence'),
    watch = require('gulp-watch')
    


gulp.task('default', function(){
    
    run(
        
        'serve',
        'css',
        'bower',
        'js',
        'watch'
        
    )
    
});



gulp.task('build-css', function(done) {
	
  return gulp.src('app/css/src/style.scss')
    .pipe(sass()).on('error', done)
    .pipe(gulp.dest('./app/css'))
   
	
});

gulp.task('bower', function () {
    

    
  return gulp.src('./app/index.html')
    .pipe(wiredep({
      devDependencies: true,

      
    
    }))

    .pipe(gulp.dest('./app'));
});

gulp.task('css', function () {
    
   return gulp.src('./app/index.html')
  .pipe(inject(
    gulp.src(['./app/**/*.css']),{
      
      ignorePath:'/app'
      
      
  }
  ))
  .pipe(gulp.dest('./app'))


})
 

gulp.task('js', function () {
    
   
  return gulp.src('./app/index.html')
  .pipe(inject(
    gulp.src(['./app/**/*.js']).pipe(angularFilesort()),{
      
      ignorePath:'/app',
  
      
      
  }
  ))
  .pipe(gulp.dest('./app'))


})





gulp.task('serve', function(){
   
   connect.server({
       
       root:'app',
       port:3000,
       host:'localhost',
       fallback:'app/index.html',
       livereload: true,
       middleware: function(connect) {
        return [connect().use('/bower_components', connect.static('bower_components'))];
    }
       
   }); 
    
});

gulp.task('reload', function(){
   
   return gulp.src('./app/')
   .pipe(connect.reload());
    
});

/* updated watch task to include sass */

gulp.task('watch', function() {
	
  watch('app/css/src/**/*.scss', function(){
      
      gulp.start('build-css')
  });
  watch('app/**/*.js', function(){
      
      gulp.start('js')
  })
  watch('app/**/*.css', function(){
      
      gulp.start('css')
  });
  watch('app/**/*.html', function(){
      
      gulp.start('reload')
  });

  
});