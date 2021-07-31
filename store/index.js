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
  todoList: state => id => {
    return state.boards.find(board => board.id === id).data.todo
  },
  inProgressList: state => id => {
    return state.boards.find(board => board.id === id).data.inProgress
  },
  doneList: state => id => {
    return state.boards.find(board => board.id === id).data.done
  },
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
  editTodo(state, {id, payload}) {
    state.boards.find(board => board.id === id).data.todo = [...payload]
  },
  editInProgress(state, {id, payload}) {
    state.boards.find(board => board.id === id).data.inProgress = [...payload]
  },
  editDone(state, {id, payload}) {
    state.boards.find(board => board.id === id).data.done = [...payload]
  }
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
  editTodo({commit, state}, {id, payload}) {
    commit('editTodo', {id, payload});
  },
  editInProgress({commit, state}, {id, payload}) {
    commit('editInProgress', {id, payload});
  },
  editDone({commit, state}, {id, payload}) {
    commit('editDone', {id, payload});
  }
}
