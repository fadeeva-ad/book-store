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
	const  classList = `books__list`;
	const  classItem = `books__item`;
	const  classTitle = `books__title`;
	const  classPrice = `books__price`;


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
	// удаление
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
	function addItems() {
		const booksListNode = createElement('div', classList);
		const items = books.items;

		for (let i = 0; items.length > i; i++) {
			const booksItemNode = createElement('div', classItem);
			booksItemNode.classList.add(classItem);
			booksItemNode.innerHTML = `
			<strong class="${classTitle}">
			${items[i].title}
			</strong>
			<p class="${classPrice}">
			${items[i].price}</p>`;

		booksListNode.appendChild(booksItemNode);
	}
	return booksListNode;
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


});




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