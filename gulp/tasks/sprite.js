import svgSprite from 'gulp-svg-sprite'

export const sprite = () => {
	return (
		app.gulp
			.src(app.path.src.svgIcons)
			.pipe(
				svgSprite({
					mode: {
						symbol: true, // Activate the «symbol» mode
					},
				})
			)
			//Нужно для того, чтобы автоматически все заливки менялись на currentColor, это позволит свободно перекрашивать спрайты через обычное свойство color в CSS
			.pipe(
				app.plugins.replace(
					/(fill=\"\#\w{1,6}\")|(fill=\"\")|(fill=\"\w{1,6}\")/g, //Ищет все варианты fill=""/fill="none"/fill="#000FFF"
					'fill="currentColor"'
				)
			)
			.pipe(app.gulp.dest(app.path.build.images))
	)
}
