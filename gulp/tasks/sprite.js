import svgSprite from 'gulp-svg-sprite'

function findFillNone() {
	const fillNoneRegex = /(fill=\"none\")/g
	const withColorRegex = /(fill=\"\#\w{1,6}\")|(fill=\"\")|(fill=\"\w{1,6}\")/g
}

export const sprite = () => {
	return (
		app.gulp
			.src(app.path.src.svgIcons)
			.pipe(
				svgSprite({
					mode: {
						symbol: {
							// Activate the «symbol» mode
							dest: 'svg-sprite', // Mode specific output directory
							sprite: 'sprite.svg', // Sprite path and name
						},
					},
				})
			)
			//Нужно для того, чтобы автоматически все заливки менялись на currentColor, это позволит свободно перекрашивать спрайты через обычное свойство color в CSS
			.pipe(
				app.plugins.replace(
					// /(fill=\"\#\w{1,6}\")|(fill=\"\")|(fill=\"\w{1,6}\")/g, //Ищет все варианты fill=""/fill="none"/fill="#000FFF"
					/(fill=\"\#\w{1,6}\")/g,
					'fill="currentColor"'
				)
			)
			.pipe(
				app.plugins.replace(
					// /(stroke=\"\#\w{1,6}\")|(stroke=\"\")|(stroke=\"\w{1,6}\")/g, //Ищет все варианты stroke=""/stroke="none"/stroke="#000FFF"
					/(stroke=\"\#\w{1,6}\")/g,
					'stroke="currentColor"'
				)
			)
			.pipe(app.gulp.dest(app.path.build.images))
	)
}
