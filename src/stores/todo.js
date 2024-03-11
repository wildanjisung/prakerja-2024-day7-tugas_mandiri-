import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
  }),
  getters: {
    getItemByIndex: (state) => (index) => {
      return state.todos[index];
    },
 },
  actions: {
    addTodo(param) {
      this.todos.push(param);
    },
    editTodo(index, newValue) {
      if (index >= 0 && index < this.todos.length) {
        this.todos[index] = newValue;
      }
    },
    deleteTodo(index) {
      if (index >= 0 && index < this.todos.length) {
        this.todos.splice(index, 1);
      }
    },
  },
  persist: true,
});
