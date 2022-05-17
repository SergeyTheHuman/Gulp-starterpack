import fs from 'fs'
import fonter from 'gulp-fonter'
import ttf2woff2 from 'gulp-ttf2woff2'

export const otfToTtf = () => {
	return app.gulp
		.src(`${app.path.srcFolder}/fonts/*.otf`)
		.pipe(
			fonter({
				formats: ['ttf'],
			})
		)
		.pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
	return app.gulp
		.src(`${app.path.srcFolder}/fonts/*.ttf`)
		.pipe(
			fonter({
				formats: ['woff'],
			})
		)
		.pipe(app.gulp.dest(app.path.build.fonts))
		.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
		.pipe(ttf2woff2())
		.pipe(app.gulp.dest(app.path.build.fonts))
}

export const fontsInSass = () => {
	let fontsFile = `${app.path.srcFolder}/sass/utils/fonts.sass`

	fs.readdir(app.path.build.fonts, function (error, fontsFiles) {
		if (fontsFiles) {
			if (!fs.existsSync(fontsFile)) {
				fs.writeFile(fontsFile, '', callback)
				let newFileOnly

				function getFontNameAndWeight(array) {
					let weightMap = {
						thin: 100,
						extralight: 200,
						light: 300,
						regular: 400,
						medium: 500,
						semibold: 600,
						bold: 700,
						extrabold: 800,
						heavy: 800,
						black: 900,
					}
					let font = {}
					for (const item of array) {
						let itemLowerCase = item.toLowerCase()
						if (itemLowerCase in weightMap) {
							font.fontWeight = weightMap[itemLowerCase]
							array.splice(array.indexOf(itemLowerCase), 1)
							font.fontName = array.join('-')
						} else {
							font.fontWeight = 400
							font.fontName = array.join('-')
						}
					}

					return font
				}

				for (let i = 0; i < fontsFiles.length; i++) {
					const fontFileName = fontsFiles[i].split('.')[0]
					if (newFileOnly !== fontFileName) {
						let fontArray = fontFileName.split('-')
						let font = getFontNameAndWeight(fontArray)

						fs.appendFile(
							fontsFile,
							`@font-face\n\tfont-family: ${font.fontName}\n\tfont-display: swap\n\tsrc: url('../fonts/${fontFileName}.woff2') format('woff2'), url('../fonts/${fontFileName}.woff') format('woff'),\n\tfont-weight: ${font.fontWeight}\n\tfont-style: normal\n`,
							callback
						)
						newFileOnly = fontFileName
					}
				}
			} else {
				console.log(
					'Файл шрифтов уже существует. Если вы хотите обновить его, то удалите существующий и запустите задачу заново'
				)
			}
		}
	})

	return app.gulp.src(app.path.srcFolder)
	function callback() {}
}
