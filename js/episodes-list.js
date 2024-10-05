import { renderPage } from "./render-page.js";

// rendering episode list page
export function render(data, appContainer) {
  const episodesWrapper = document.createElement('div')
  const title = document.createElement('h3')
  title.classList.add('h3', 'list-title')
  title.textContent = 'Episodes'
  appContainer.append(title)

  const episodesList = document.createElement('ul')
  episodesList.classList.add('list-unstyled')

  data.results.forEach(episode => {
    const episodesItem = document.createElement('li')
    const episodeLink = document.createElement('a')
    const episodeDateRelease = document.createElement('span')
    episodesItem.classList.add('episode__item')
    episodeLink.classList.add('episode__link')
    episodeDateRelease.classList.add('episode__date-release')
    episodeLink.textContent = episode.title
    const episodeHref = episode.url.slice(-2, -1)
    episodeLink.href = `?filmNumber=${episodeHref}`
    episodeDateRelease.textContent = `(realease date: ${episode.release_date})`
    episodesItem.append(episodeLink)
    episodesItem.append(episodeDateRelease)
    episodesList.append(episodesItem)

    episodeLink.addEventListener('click', (e) => {
      e.preventDefault()
      history.pushState(null, '', e.target.href)

      const searchParams = new URLSearchParams(location.search)
      const episodeNumber = searchParams.get('filmNumber')
      renderPage(
        './episode-ditails.js',
        `https://swapi.dev/api/films/${episodeNumber}`,
        'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
        'css/main.css',
        'css/episode.css',
        appContainer,
      )
    })
  });
  episodesWrapper.append(episodesList)

  return episodesWrapper
}
