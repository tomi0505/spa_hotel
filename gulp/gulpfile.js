const gulp = require("gulp");
const browserSync = require("browser-sync");



// BROWSER-SYNC
gulp.task("reload", () => {
    browserSync.reload();
});


gulp.task("serve", () => {
    browserSync({
        server: "../"
    });
    gulp.watch("../*.html", ["reload"]);
});




// DEFAULT_TASK
gulp.task("default", ["serve"]);