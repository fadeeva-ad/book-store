// svg4everybody(); // иницализация полифила для IE

// $(document).ready(function(){
//   AOS.init();
// });

// Если на проекте нет jQuery, но хочется $( document ).ready... (IE9+)

function ready(fn) {
	if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

ready(function(){
	const classWrap = `books__content`;
	const  classList = `books__list`;
	const  classItem = `books__item`;
	const  classTitle = `books__title`;
	const  classPrice = `books__price`;
	const classListPagination = `b-pages__list`;
	const classItemPagination = `b-pages__number`;
	const classLinkPagination = `b-pages__link`;
	const classWrapPagination =  `b-pages`;

		// кол-во книг для мобилы от 768
	const countTablet = 8;
	// кол-во книг для мобилы до 768
	const countMobile = 3;


	const books = {
		count: 256,
		items: [
			{
				title: 'Правила мозга',
				price: 700
			},
			{
				title: 'Всегда вовремя',
				price: 920
			},
			{
				title: 'Супермен по привычке',
				price: 590
			},
			{
				title: 'Работа как внутренняя игра',
				price: 700
			},
			{
				title: 'Дзен-камера',
				price: 840
			},
			{
				title: 'Быть интровертом',
				price: 680
			}
		]
	};
	// добавление элемента на страницу
	function addToPage(element, targetClass) {
		const wrap = document.querySelector(`.${targetClass}`);
		wrap.appendChild(element);
	}
	// удаление  элемента из DOM
	function removeFromPage(targetClass) {
		const element = document.querySelector(`.${targetClass}`);
		const parent = element.parentElement;
		parent.removeChild(element);
	}

	// создание элемента с классом
	function createElement(tag, classElement) {
		const element = document.createElement(tag);
		element.classList.add(classElement);
		return element;
	}

// добавление элементы кнги в общую обертку
	function addItems(data) {
		const booksListNode = createElement('div', classList);
		const items = data.items;

		for (let i = 0; items.length > i; i++) {
			const booksItemNode = createElement('div', classItem);
			booksItemNode.classList.add(classItem);
			booksItemNode.innerHTML = `
			<strong class="${classTitle}">
			${items[i].name.title}
			</strong>
		<p class="${classPrice}">
			${items[i].price}</p>`;

		booksListNode.appendChild(booksItemNode);
	}
	return booksListNode;
}
//  создает айтемы пагинации
	function addItemsPagination(count) {
		const paginationListNode = createElement('ul', classLinkPagination);
		for (let i = 0; i > count; i++) {
			const paginationItemNode = createElement('li', classItemPagination);
			paginationItemNode.innerHTML = `
			<a href="#" class="${classLinkPagination}">${i+1}</a>`;
			paginationListNode.appendChild(paginationItemNode);
		}
	}

// Удаление старого контента и добавление нового
	function toggleContent(button) {
		const btn = document.querySelector(button);

		if(!btn) {
			return;
		}

		btn.addEventListener('click', function() {
			removeFromPage(classList);
			addToPage(addItems(), 'books__content');
		});
	}


	toggleContent('.j-view-books');

	function calculatePageNumber(data) {
		if (window.matchMedia("(min-width: 768px)").matches) {
			return countTablet;
		}
		else {
			return countMobile;
		}
	}

	function getItemsPerPage() {
		if (window.matchMedia("(min-width: 768px)").matches) {
			return Math.ceil(data.count / countTablet);
		}
		else {
			return Math.ceil(data.count / countMobile);
		}
	}
	function generateListener() {
		const paginationItems = document.querySelectorAll(`.${classItemPagination}`);
		paginationItems.forEach(function(elem, index) {
			elem.addEventListener('click', function() {
				getServerData(index + 1);
			});
		});
	}
	function getServerData(page, type = '') {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', `http://api.do-epixx.ru/htmlpro/bookstore/books/get/${page}/${perPage}/${type}`);
		xhr.send();


	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4 && xhr.status === 200) {
			const data = JSON.parse(xhr.responseText);
			// кол-во пунктов пагинации:
			const countPage = calculatePageNumber(data);
			const panginationNode = addItemsPagination(countPage);
			removeFromPage(classLinkPagination);
			addToPage(panginationNode, `${classWrapPagination}`);
			const booksNode = addItems(data);
			removeFromPage(classLinkPagination);
			addToPage(booksNode, `.${classWrap}`);
 			generateListener(classList);
		}
		else if (xhr.readyState !== 4) {
			console.log(`жду загрузки: ${xhr.readyState}`);
		}
	};
}


	// getServerData(3, 6);

//   const booksItems = createItems;

// 	for (let i = 0; items.length > i; i++) {
// 		const booksItemNode = createElement('div', classItem);
// 		booksItemNode.classList.add(classItem);
// 		booksItemNode.innerHTML = `
// 		<strong class="${classTitle}">
// 		${items[i].title}
// 		</strong>
// 		<p class="${classPrice}">
// 		${items[i].price}</p>`;

// 		booksListNode.appendChild(booksItemNode);

// 	}
// 	const content = document.querySelector('.books__content');
// 	content.appendChild(booksListNode);
// });

// const arrNames = ['Вася', 'Петя', 'Оля', 'Надя'];

// const newName = 'Колян';
// arrNames.push(newName);
// console.log(newName);
// console.log(arrNames);

// const stringPans = [`ручки, карандаши, тетрадки`];
// const arrayPans = stringPans.split(', ');
// console.log(arrayPans);
});