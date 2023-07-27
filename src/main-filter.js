function loadItems() {
  return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items)
}

function createElements(item) {
  const img = document.createElement('img')
  img.setAttribute('src', item.image)
  img.setAttribute('alt', item.type)
  img.setAttribute('class', 'item__thumbnail')

  const span = document.createElement('span')
  span.setAttribute('class', 'item__description')
  span.textContent = `${item.gender}, ${item.size}`

  const li = document.createElement('li')
  li.setAttribute('class', 'item')
  li.setAttribute('data-type', item.type)
  li.setAttribute('data-color', item.color)
  li.append(img, span)
  return li
}

function onClickLogo(items) {
  items.forEach(item => item.classList.remove('blur'))
}

function onClickBtn(event, items, container) {
  const { key, value } = event.target.dataset

  if (!key || !value) return
  updateItems(key, value, items, container)
}

function updateItems(key, value, items, container) {
  items.forEach(item => {
    item.classList.toggle('blur', item.dataset[key] !== value)
  })
  const blurItems = items.filter(item => item.classList.contains('blur'))
  const nonBlurItems = items.filter(item => !item.classList.contains('blur'))
  const sortItems = [...blurItems, ...nonBlurItems].reverse()
  container.append(...sortItems)
}

loadItems()
  .then(items => {
    const elements = items.map(createElements)
    const container = document.querySelector('.items')
    container.append(...elements)

    const logo = document.querySelector('.logo')
    const buttons = document.querySelector('.btns')
    logo.addEventListener('click', () => onClickLogo(elements))
    buttons.addEventListener('click', event =>
      onClickBtn(event, elements, container)
    )
  })
  .catch(console.error)
