export const state = () => ({
  generatedId: 1,
  boards: []
})

export const getters = {
  boardsInfo: state => {
    return state.boards.map( board => {
     return {
       id: board.id,
       name: board.name,
       description: board.description,
       imgUrl: board.imgUrl,
     }
    })
  },
  boardDetails: state => id => {
    return state.boards.find(board => board.id === id)
  }
}

export const mutations = {
  generateId(state) {
    state.generatedId++
  },
  addBoard(state, payload) {
    state.boards.push(payload)
  },
  editBoard(state, newBoards) {
   state.boards = newBoards
  },
  deleteBoard(state, payload) {
    state.boards = state.boards.filter(board => board.id !== payload)
  }
}

export const actions = {
  addBoard({commit}, board){
    commit('addBoard', board)
  },
  generateId({commit}) {
    commit('generateId')
  },
  deleteBoard({commit}, id) {
    commit('deleteBoard', id)
  },
  editBoard({commit, state}, payload) {
    const newArray = state.boards.map(item => {
      if(item.id === payload.id) {
        return {...item, ...payload}
      } else return item
    })
    commit('editBoard', newArray)
  }
}
