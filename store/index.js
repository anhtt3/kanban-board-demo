export const state = () => ({
  boards: []
})

export const mutations = {
  addBoard(state, payload) {
    state.boards.push(payload)
  }
}

export const actions = {
  addBoard({commit}, board){
    commit('addBoard', board)
  }
}
