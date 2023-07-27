function loadItems() {
  return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items)
}

function displayItems(items) {
  const container = document.querySelector('.items')
  container.innerHTML = items.map(item => createHtmlString(item)).join('')
}

function createHtmlString(item) {
  return `
      <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
        <span class="item__description">${item.gender}, ${item.size}</span>
      </li>`
}

function onClickLogo(items) {
  displayItems(items)
}

function onClickBtn(dataset, items) {
  const { key, value } = dataset

  if (!key | !value) return
  displayItems(items.filter(item => item[key] === value))
}

function setEventsListeners(items) {
  const logo = document.querySelector('.logo')
  const btns = document.querySelector('.btns')

  logo.addEventListener('click', () => onClickLogo(items))
  btns.addEventListener('click', e => onClickBtn(e.target.dataset, items))
}

loadItems()
  .then(items => {
    displayItems(items)
    setEventsListeners(items)
  })
  .catch(error => {
    throw new Error(error)
  })
