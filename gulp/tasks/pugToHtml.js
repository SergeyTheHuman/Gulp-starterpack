import fileinclude from 'gulp-file-include'
import webpHtmlNosvg from 'gulp-webp-html-nosvg'
import versionNumber from 'gulp-version-number'

export const pugToHtml = () => {
	return (
		app.gulp
			.src(app.path.src.pug)
			.pipe(
				app.plugins.pug({
					pretty: true,
					verbose: true,
				})
			)
			.pipe(app.plugins.replace(/@img\//g, 'images/'))
			.pipe(
				app.plugins.replace(
					/@svg\//g,
					'images/symbol/svg/sprite.symbol.svg#'
				)
			)
			.pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
			.pipe(
				app.plugins.if(
					app.isBuild,
					versionNumber({
						value: '%DT%',
						append: {
							key: '_v',
							cover: 0,
							to: ['css', 'js'],
						},
						output: {
							file: 'gulp/version.json',
						},
					})
				)
			)
			// .pipe(webpHtmlNosvg())
			// .pipe(
			// 	versionNumber({
			// 		value: '%DT%',
			// 		append: {
			// 			key: '_v',
			// 			cover: 0,
			// 			to: ['css', 'js'],
			// 		},
			// 		output: {
			// 			file: 'gulp/version.json',
			// 		},
			// 	})
			// )
			.pipe(app.gulp.dest(app.path.build.html))
			.pipe(app.plugins.browsersync.stream())
	)
}
