const rootElem = document.querySelector('#root');
const imgArr = ['first.jpeg', 'second.jpeg', 'third.jpeg', 'fouth.jpeg', 'fifth.jpeg']
const imagesPath = 'images/'
let imgIndex = 0;
const circles = document.createElement('li');

const slider_container = document.createElement('div'); //slider container
const slider_main = document.createElement('div');//slider main ездит затвор вправо dлево
const slider_film = document.createElement('div');//sliderFilm пленка
const slider_trigger = document.createElement('div');

const slider_trigger_left = document.createElement('div');
const slider_trigger_right = document.createElement('div');
slider_trigger_left.innerText = '<'
slider_trigger_right.innerText = '>';

slider_film.classList.add('slider_film')
slider_container.classList.add('slider_container')
slider_main.classList.add('slider_main')
slider_trigger.classList.add('slider_trigger')
circles.classList.add('circles')

slider_trigger.append(slider_trigger_left, slider_trigger_right)


slider_container.append(slider_main, slider_trigger)
slider_main.append(slider_film);
rootElem.append(slider_container)




//....appends clsslistsadd
const imgMass = imgArr.map(imgName => {//сформировать массив картинок
	const divEl = document.createElement('div');
	const sliderWidth = slider_container.offsetWidth + 'px';
	divEl.style.width = sliderWidth
	divEl.style.backgroundImage = `url('${imagesPath + imgName}')`;
	return divEl;
})


function points() {//эту функцию надо было наверх вытащить, чтобы ul добавились вначале
	for (let i = 0; i < imgArr.length; i++) {//а то ошибка вылетала в рендере
		const divO = document.createElement('ul');
		// const divUl = document.createElement('div');
		// divUl.innerText = i + 1
		// divUl.classList.add('divNumber')
		divO.innerText = i + 1
		// divO.append(divUl);
		circles.append(divO)
	}
	slider_container.append(circles)
}

points()

const render = () => {
	const slider_width = slider_container.offsetWidth
	slider_film.style.right = slider_width * imgIndex + 'px'

	const allUllElements = document.querySelectorAll('.circles ul')
	allUllElements.forEach(t => t.classList.remove('divO'))
	allUllElements[imgIndex].classList.add('divO')
}

const changeSize = () => {
	slider_film.style.width = slider_container.offsetWidth * imgArr.length + 'px'
	imgMass.forEach(el => el.style.width = slider_container.offsetWidth + 'px')
	render()
}
window.addEventListener('resize', changeSize)
changeSize()


slider_film.append(...imgMass)//этот массив добавили



slider_trigger_left.addEventListener('click', () => {
	if (imgIndex === 0) {
		imgIndex = imgArr.length - 1
	} else {
		imgIndex = imgIndex - 1
	}
	render(imgIndex)
})

slider_trigger_right.addEventListener('click', () => {
	if (imgIndex === imgArr.length - 1) {
		imgIndex = 0
	} else {
		imgIndex = imgIndex + 1
	}
	render(imgIndex)
})

circles.addEventListener('click', event => {
	const ulWasClicked = event.target
	const liAll = [...ulWasClicked.parentNode.children] //здесь дети
	imgIndex = liAll.indexOf(ulWasClicked)
	render()
})

