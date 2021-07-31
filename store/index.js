import Vue from 'vue';

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
  },
  taskList: state => (id,type) => {
    return state.boards.find(board => board.id === id).data[type]
  }
}

export const mutations = {
  generateId(state) {
    state.generatedId++
  },
  generateTaskId(state, id) {
    state.boards.find(board => board.id === id).data.generatedTaskId++
  },
  addBoard(state, payload) {
    state.boards = [...state.boards, payload];
  },
  editBoard(state, newBoards) {
   state.boards = newBoards
  },
  deleteBoard(state, payload) {
    state.boards = state.boards.filter(board => board.id !== payload)
  },
  addTask(state, {id, payload}) {
    state.boards.find(board => board.id === id).data.todo.push(payload)
  },
  editTask(state, {id, type, payload}) {
    state.boards.find(board => board.id === id).data[type] = [...payload]
  },
  deleteTask(state, {boardId, type, index}) {
    state.boards.find(board => board.id === boardId).data[type].splice(index, 1);
  },

}

export const actions = {
  addBoard({commit}, board){
    Vue.set(board, 'data', {
      generatedTaskId: 1,
      todo: [],
      inProgress: [],
      done: [],
    });
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
  },
  addTask({commit, state}, {id, payload}) {
    const currentBoardData = state.boards.find(board => board.id === id).data;
    if(!currentBoardData.todo.length) {
      payload.id = currentBoardData.generatedTaskId;
    } else {
      commit('generateTaskId', id);
      payload.id = currentBoardData.generatedTaskId;
    }
    commit('addTask', {id, payload});
  },
  editTask({commit, state}, {id, type, payload}) {
    commit('editTask', {id,type, payload});
  },
  deleteTask({commit, state}, {boardId, type, id}) {
    let index = state.boards.find(board => board.id === boardId).data[type].map(item => item.id).indexOf(id);
    commit('deleteTask', {boardId, type, index});
  },
}
