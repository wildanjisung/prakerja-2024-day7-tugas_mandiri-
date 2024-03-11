<script>
import { useTodoStore } from './../stores/todo.js';

export default {
  data() {
    return {
      item: { name: '', deskripsi: ''},
      isErrorInput: false,
      indexEdit: -1,
    }
  },
  computed: {
    list() {
      const todoStore = useTodoStore();
      return todoStore.todos;
    },
    isMoreThanFour: function () {
      return this.list.length >= 4;
    }
  },
  methods: {
    addItem() {
      const todoStore = useTodoStore();

      // validasi
      if(this.item.name == '') {
        this.isErrorInput = true
      } else {
        // fungsi simpan ke array
        const nameTrim = this.item.name.trim()
        todoStore.addTodo({ name: nameTrim , deskripsi: null });
        
        // reset inputbox
        this.item.name = '';

        // remove error message
        this.isErrorInput = false
      }
    },
    updatetoggle(index) {
      this.indexEdit = index;
    },
    updateItem(val, index) {
      const todoStore = useTodoStore();
      todoStore.editTodo(index, val);

      // reset index edit ke default
      this.indexEdit = -1;
    },
    removeItem(index) {
      const todoStore = useTodoStore();
      todoStore.deleteTodo(index, 1);
    }
  },
}
</script>

<template>
  <!-- title -->
  <h1>Todo List</h1>
  
  <!-- list -->
  <ol>
    <div class="container" v-for="(todo, index) in list" :key="index">
      <div class="content-list">
        <li v-if="indexEdit !== index">
          <RouterLink :to="{ name: 'TodoDetail', params: { index: index } }">{{ todo.name }}</RouterLink>
        </li>
        <li v-if="indexEdit === index">
          <input type="text" v-model="list[index].name">
        </li>
      </div>
      <div class="content-ubah-hapus">
        <button v-if="indexEdit !== index" @click="updatetoggle(index)">Ubah</button>
        <button v-if="indexEdit === index" @click="updateItem( list[index], index )">Simpan</button>
        <button @click="removeItem(index)">Hapus</button>
      </div>
    </div>
  </ol>

  <!-- input -->
  <div class="container">
    <div class="content-input">
      <input type="text" v-model="item.name">
      <p v-if="isErrorInput" class="text-error">Inputan tidak boleh kosong</p>
      <p v-if="isMoreThanFour">{{ 'Hebat' }}</p>
    </div>
    <div class="content-button">
      <button @click="addItem">Simpan</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 100%;
}
.content-input {
  flex: 10;
}
input {
 width: 100%; /* This makes the input fill the width of its parent */
 box-sizing: border-box; /* This ensures padding and border are included in the width */
}
.content-button {
  flex: 2;
  display: flex;
  justify-content: center; /* This centers the button horizontally */
  align-items: start; /* This centers the button vertically */
  height: auto; /* Allows the height to adjust based on content */
}
.content-list {
  flex: 10;
}
.content-ubah-hapus {
  display: flex;
  justify-content: space-evenly;
  flex: 2;
}
.text-error {
  background-color: red;
  color: white;
}
</style>
