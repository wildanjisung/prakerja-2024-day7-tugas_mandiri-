import { defineStore } from 'pinia';
import axios from 'axios';

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: [],
  }),
  getters: {
    getItemByIndex: (state) => (index) => {
      return state.news[index];
    },
 },
  actions: {
    async syncNews() {
      const res = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=89b298ee65304ab0bc3e6bcf1efffbd4')
      this.news = res.data.articles
      console.log("res: ", res.data);
    },
    editNews(index, newValue) {
      if (index >= 0 && index < this.news.length) {
        this.news[index] = newValue;
      }
    },
    deleteTodo(index) {
      if (index >= 0 && index < this.news.length) {
        this.news.splice(index, 1);
      }
    },
  },
  persist: true,
});
