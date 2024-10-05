import { renderPage, createLoader } from './render-page.js'
// creating static elements
// favIcon
const favIconLink = document.createElement('link')
favIconLink.rel = 'shortcut icon'
favIconLink.href = 'img/favicon.png'
document.head.append(favIconLink)

// sections
const header = document.createElement('header')
const headerContainer = document.createElement('div')
header.classList.add('header')
headerContainer.classList.add('header__container', 'container')
header.append(headerContainer)
document.body.append(header)
const main = document.createElement('main')
const mainContainer = document.createElement('div')
main.classList.add('main')
mainContainer.classList.add('main__container', 'container')
main.append(mainContainer)
document.body.append(main)
const footer = document.createElement('footer')
const footerContainer = document.createElement('div')
footer.classList.add('footer')
footerContainer.classList.add('footer__container', 'container')
footer.append(footerContainer)
document.body.append(footer)

// main logo
const mainLogo = document.createElement('img')
mainLogo.src = 'https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png?region=0,0,586,254'
mainLogo.alt = 'Star Wars logo'
mainLogo.classList.add('header__logo')
headerContainer.append(mainLogo)

// app
const appContainer = document.createElement('div')
appContainer.classList.add('relative')
mainContainer.append(appContainer)

// rights
const rights = document.createElement('p')
rights.classList.add('rights')
rights.textContent = 'all rights reserved'
footerContainer.append(rights)

function pageRenderer() {
  const searchParams = new URLSearchParams(location.search)
  const filmNumber = searchParams.get('filmNumber')

  if(filmNumber) {
    renderPage(
      './episode-ditails.js',
      `https://swapi.dev/api/films/${filmNumber}`,
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
      'css/main.css',
      'css/episode.css',
      appContainer,
    )
  } else {
    renderPage(
      './episodes-list.js',
      'https://swapi.dev/api/films/',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
      'css/main.css',
      'css/list.css',
      appContainer,
    )
  }
}

pageRenderer()

window.addEventListener('popstate', () => {
  pageRenderer()
})

