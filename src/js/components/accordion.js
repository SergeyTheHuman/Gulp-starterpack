/*
	Чтобы все работало нужно:
	1) При инициализации передать селектор враппера всего аккордеона
	2) Айтемам дать класс .accordion__item
	3) Заголовкам дать класс .accordion__title
	4) Контентным блокам дать класс .accordion__content
	5) Айтемам в Sass дать высоту такую же, как и у заголовка .accordion__title
	5) Проинициализировать аккордеон
*/
export class Accordion {
	constructor(accordionWrapper) {
		this.accordion = document.querySelector(accordionWrapper)
		this.accordionItemsNodes = this.accordion.querySelectorAll('.accordion__item')
		this.accordionItems = []
	}

	openAccordionItem(element) {
		element.node.style.height = `${element.itemHeight + element.contentHeight}px`
		element.title.classList.add('accordion__title--active')
		element.opened = true
	}
	closeAccordionItem(element) {
		element.node.style.height = `${element.itemHeight}px`
		element.title.classList.remove('accordion__title--active')
		element.opened = false
	}

	init() {
		for (const item of this.accordionItemsNodes) {
			const element = {
				node: item,
				content: item.querySelector('.accordion__content'),
				title: item.querySelector('.accordion__title'),
				itemHeight: item.offsetHeight,
				contentHeight: item.querySelector('.accordion__content').offsetHeight,
				opened: false,
			}

			this.accordionItems.push(element)
		}

		this.accordionItems.forEach((element) => {
			element.node.addEventListener('click', (e) => {
				if (element) {
					!element.opened ? this.openAccordionItem(element) : this.closeAccordionItem(element)
				}
			})
		})
	}
}
