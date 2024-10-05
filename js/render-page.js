// function for downloading all kinds of resources
let cssPromices = []

export function loadResources(src) {
  // js-module
  if(src.endsWith('.js')) {
    return import(src);
  }
  // css styles
  if(src.endsWith('.css')) {
    if(!cssPromices[src]) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = src
      cssPromices[src] = new Promise(resolve => {
        link.addEventListener('load', () => resolve());
      })
      document.head.append(link)
    }
    return cssPromices[src];
  }
  // server data
  return fetch(src).then(res => res.json());
}

// loader
export function createLoader() {
  const loaderWrapper = document.createElement('div')
  const loader = document.createElement('div')
  const loaderInnerOne = document.createElement('div')
  const loaderInnerTwo = document.createElement('div')
  const loaderThree = document.createElement('div')

  loaderWrapper.classList.add('loader-wrapper')
  loader.classList.add('loader')
  loaderInnerOne.classList.add('inner','one')
  loaderInnerTwo.classList.add('inner','two')
  loaderThree.classList.add('inner','three')

  loader.append(loaderInnerOne)
  loader.append(loaderInnerTwo)
  loader.append(loaderThree)
  loaderWrapper.append(loader)

  return loaderWrapper
}

export function renderPage(moduleName, apiUrl, bsCss, mainCss, localCss, container) {
  container.innerHTML = '';
  container.append(createLoader())
  Promise.all([moduleName, apiUrl, bsCss, mainCss, localCss].map(src => loadResources(src)))
    .then(([pageModule, data]) => {
      container.innerHTML = '';
      container.append(pageModule.render(data, container));
  });
}





