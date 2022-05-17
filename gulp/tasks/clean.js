import del from 'del'

export const clean = function () {
	return del(app.path.clean)
}
