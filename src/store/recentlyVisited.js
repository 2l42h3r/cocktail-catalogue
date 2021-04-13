const recentlyVisited = {
  namespaced: true,
  state: () => ({
    visited: JSON.parse(window.localStorage.getItem('lastVisited')) || [],
  }),
  getters: {
    getLastFive: (state) => state.visited.slice(-5),
  },
  actions: {
    addToLast: ({ commit }, drinkObject) => {
      commit('ADD_TO_LAST', drinkObject)
    },
  },
  mutations: {
    ADD_TO_LAST: (state, drinkObject) => {
      const index = state.visited.findIndex((obj) => {
        return obj.id === drinkObject.id
      })
      if (index !== -1) {
        state.visited.splice(index, 1)
      }
      state.visited.push(drinkObject)
      window.localStorage.setItem('lastVisited', JSON.stringify(state.visited))
    },
  },
}
export { recentlyVisited }
