let defaults = {
  food: 'spicy',
  price: '$10',
  ambiance: 'noisy'
}

let search = {food: 'rich', ...defaults}

console.log(search)