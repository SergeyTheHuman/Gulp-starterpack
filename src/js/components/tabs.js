/*
	Чтобы все работало нужно:
	1) При инициализации передать селектор враппера всего табов
	2) Кнопкам переключения дать класс .tabs__button + дата атрибуты для связи с табами data-tabs-path='first'
	3) Активной кнопке дать класс .tabs__button--active
	4) Контентным блокам дать класс .tabs__item + дата атрибуты для связа с кнопками data-tabs-target='first'
	5) Активному блоку дать класс .tabs__item--active
	6) Проинициализировать табы
	
	Необходимые Sass-классы
		.tabs__button
			&:not(.tabs__button--active)
				cursor: pointer !important
		.tabs__button--active
			pointer-events: none !important
		.tabs__item
			display: none !important
		.tabs__item--active
			display: block !important
*/

export class Tabs {
	constructor(tabsWrapper) {
		this.tabs = document.querySelector(tabsWrapper)
		this.currentBtn = this.tabs.querySelector('.tabs__button--active')
		this.currentItem = this.tabs.querySelector('.tabs__item--active')
	}
	changeTab(path) {
		this.currentBtn.classList.remove('tabs__button--active')
		this.currentItem.classList.remove('tabs__item--active')
		this.currentBtn = this.tabs.querySelector(`[data-tabs-path=${path}]`)
		this.currentItem = this.tabs.querySelector(`[data-tabs-target=${path}]`)
		this.currentBtn.classList.add('tabs__button--active')
		this.currentItem.classList.add('tabs__item--active')
	}
	init() {
		this.tabs.addEventListener('click', (e) => {
			if (e.target.classList.contains('tabs__button')) {
				const btn = e.target
				const tabPath = btn.dataset.tabsPath
				this.changeTab(tabPath)
			}
		})
	}
}
