import { loadResources, renderPage } from "./render-page.js";

// rendering episode ditails page
export function render(data, appContainer) {
  const episodeWrapper = document.createElement('div')
  const ditailsWrapper = document.createElement('div')
  const episodeTitle = document.createElement('h3')
  const episodeDescr = document.createElement('p')
  const returnBtn = document.createElement('a')
  episodeTitle.classList.add('episode__title')
  episodeDescr.classList.add('episode__descr')
  ditailsWrapper.classList.add('episode__ditails')
  returnBtn.classList.add('episode__btn', 'btn', 'btn-secondary')

  function renderListDitails(title, data) {
    Promise.all(data.map(src => loadResources(src)))
      .then((list) => {
        ditailsWrapper.append(filledList(title, list))
    });
  }

  renderListDitails('Characters', data.characters)
  renderListDitails('Species', data.species)
  renderListDitails('Planets', data.planets)
  renderListDitails('Starships', data.starships)
  renderListDitails('Vehicles', data.vehicles)

  returnBtn.href = 'index.html'
  returnBtn.addEventListener('click', (e) => {
    e.preventDefault()
    history.pushState(null, '', e.currentTarget.href)
    renderPage(
      './episodes-list.js',
      'https://swapi.dev/api/films/',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
      'css/main.css',
      'css/list.css',
      appContainer,
    )
  })

  episodeTitle.textContent = data.title
  episodeDescr.textContent = data.opening_crawl
  returnBtn.textContent = 'return to main list'
  episodeWrapper.append(episodeTitle)
  episodeWrapper.append(episodeDescr)
  episodeWrapper.append(ditailsWrapper)
  episodeWrapper.append(returnBtn)

  return episodeWrapper
}

// function to filled episode ditails
function filledList(title, data) {
  const listWrapper = document.createElement('div')
  const Listtitle = document.createElement('h4')
  Listtitle.classList.add('episode__list-title')
  Listtitle.textContent = title
  let list = document.createElement('ul')
  list.classList.add('episode__list')
  for (const item of data) {
    const listItem = document.createElement('li')
    listItem.classList.add('episode__list-item')
    listItem.textContent = item.name
    list.append(listItem)
  }
  listWrapper.append(Listtitle)
  listWrapper.append(list)

  return listWrapper
}
