import { createStore } from "vuex";

export default createStore({
  state: {
    toDoList: []
  },

  mutations: {
    ADD_TODO(state, value) {
      state.toDoList.push(value)
    },

    //Mutation to see if the operation is a check or a delete and affect the proper action
    ACTION_TODO(state, values) {
      for(const [i, toDo] of state.toDoList.entries()) {
        if (toDo.id === values.id) {
          if (values.action === 'check') {
            toDo.check = true
          }
          else if (values.action === 'delete') {
            state.toDoList.splice(i, 1)
          }
        }
      }
    },

  },

  actions: {
    add_toDo({commit}, value) {
      commit('ADD_TODO', value)
    },

    toDoAction({commit}, values) {
      commit('ACTION_TODO', values)
    },
  },

  getters: {
    //Getter to allow the views to get the toDoList array values
    getToDoList: state => state.toDoList
  },
});
