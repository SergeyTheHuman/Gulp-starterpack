import replace from 'gulp-replace'
import pug from 'gulp-pug'
import browsersync from 'browser-sync'
import newer from 'gulp-newer'
import ifPlugin from 'gulp-if'

export const plugins = {
	replace: replace,
	pug: pug,
	browsersync: browsersync,
	newer: newer,
	if: ifPlugin,
}
