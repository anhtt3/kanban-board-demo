export const state = () => ({
  boards: []
})

export const mutations = {
  increment(state, payload) {
    state.boards.push(payload)
  }
}
