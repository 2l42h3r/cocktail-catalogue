import 'whatwg-fetch'

const API_KEY = '1'
const BASE_API_URI = `https://www.thecocktaildb.com/api/json/v1/${API_KEY}`

export const randomCocktail = async () => {
  return fetch(`${BASE_API_URI}/random.php`).then((response) => response.json())
}

export const getCocktailById = async (id) => {
  return fetch(`${BASE_API_URI}/lookup.php?i=${id}`).then((response) =>
    response.json()
  )
}

export const getCategories = async () => {
  return fetch(`${BASE_API_URI}/list.php?c=list`).then((response) =>
    response.json()
  )
}

export const getGlasses = async () => {
  return fetch(`${BASE_API_URI}/list.php?g=list`).then((response) =>
    response.json()
  )
}

export const getAlcoholic = async () => {
  return fetch(`${BASE_API_URI}/list.php?a=list`).then((response) =>
    response.json()
  )
}

export const search = async (searchText) => {
  return fetch(`${BASE_API_URI}/search.php?s=${searchText}`).then((response) =>
    response.json()
  )
}
