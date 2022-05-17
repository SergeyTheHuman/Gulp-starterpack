import gulp from 'gulp'

// config
import { path } from './gulp/config/path.js'
import { plugins } from './gulp/config/plugins.js'

// tasks
import { copy } from './gulp/tasks/copy.js'
import { clean } from './gulp/tasks/clean.js'
import { pugToHtml } from './gulp/tasks/pugToHtml.js'
import { sassToCss } from './gulp/tasks/sassToCss.js'
import { javascript } from './gulp/tasks/javascript.js'
import { images } from './gulp/tasks/images.js'
import { otfToTtf, ttfToWoff, fontsInSass } from './gulp/tasks/fonts.js'
import { sprite } from './gulp/tasks/sprite.js'
import { addToZip } from './gulp/tasks/addToZip.js'
import { server } from './gulp/tasks/server.js'

global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	gulp: gulp,
	path: path,
	plugins: plugins,
}

function watcher() {
	gulp.watch(path.watch.files, copy)
	gulp.watch(path.watch.pug, pugToHtml)
	gulp.watch(path.watch.sass, sassToCss)
	gulp.watch(path.watch.js, javascript)
	gulp.watch(path.watch.images, images)
}

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsInSass)
const mainTasks = gulp.series(
	fonts,
	sprite,
	gulp.parallel(copy, pugToHtml, sassToCss, javascript, images)
)

const dev = gulp.series(clean, mainTasks, gulp.parallel(watcher, server))
const build = gulp.series(clean, mainTasks, server)
const zip = gulp.series(clean, mainTasks, addToZip)

gulp.task('default', dev)

export { sprite, dev, build, zip }

/*Если забыл, как что-то работает и тд - смотри видео https://youtu.be/jU88mLuLWlk (видос также есть на компе и в телеграме)*/
/*Если нужна задача с выгрузкой верстки на сервер - смотри в файл ftp.js*/
